import { NextRequest, NextResponse } from "next/server";

import { CriarProjetoController } from "@/adapters/api/controllers/projeto/criar-projeto-controller";
import { ListarProjetoController } from "@/adapters/api/controllers/projeto/listar-projeto-controller";
import { userRoleSession } from "@/app/actions/login-actions";
import { CreateProjetoDTO } from "@/core/domain/dtos/projeto.dto";
import { RespostaApi } from "@/core/domain/models/resposta-api";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function handleError(error: any, message: string) {
	console.error(message, error);
	const respostaException = new RespostaApi({
		sucesso: false,
		mensagem: `Ocorreu um erro inesperado no servidor: ${message}`,
		dados: process.env.NODE_ENV === "development" ? error : undefined,
	});
	return NextResponse.json(respostaException, { status: 500 });
}

export async function POST(request: NextRequest) {
	try {
		const body = await request.json().catch(() => null);
		const userRole = await userRoleSession();

		if (!userRole || userRole == null) {
			const respostaNoBody = new RespostaApi({
				sucesso: false,
				mensagem: "Usuário não autenticado",
			});
			return NextResponse.json(respostaNoBody, { status: 400 });
		}

		if (userRole !== "ADMIN" && userRole !== "EDITOR") {
			const respostaNoBody = new RespostaApi({
				sucesso: false,
				mensagem: "Usuário não autorizado",
			});
			return NextResponse.json(respostaNoBody, { status: 400 });
		}

		if (!body) {
			const respostaNoBody = new RespostaApi({
				sucesso: false,
				mensagem: "Corpo da requisição inválido ou vazio",
			});
			return NextResponse.json(respostaNoBody, { status: 400 });
		}

		const controller = new CriarProjetoController();
		const resposta = await controller.executar(body as CreateProjetoDTO);

		let status = 201;
		if (!resposta.sucesso) {
			if (resposta.mensagem?.includes("Já existe um projeto com o número PL")) {
				status = 409;
			} else if (
				resposta.mensagem?.includes("Faltam informações obrigatórias")
			) {
				status = 400;
			} else if (resposta.mensagem?.includes("ID relacionado inválido")) {
				status = 400;
			} else {
				status = 400;
			}
		}

		return NextResponse.json(resposta, { status });
	} catch (error) {
		return handleError(error, "Erro ao criar projeto");
	}
}

export async function GET() {
	try {
		const controller = new ListarProjetoController();
		const resposta = await controller.executar();

		return NextResponse.json(resposta, {
			status: resposta.sucesso ? 200 : 404,
		});
	} catch (error) {
		return handleError(error, "Erro ao listar projetos");
	}
}
