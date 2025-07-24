/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";

import { CriarPautaController } from "@/adapters/api/controllers/pauta/criar-pauta-controller";
import { ListarPautaController } from "@/adapters/api/controllers/pauta/listar-pauta-controller";
import { userRoleSession } from "@/app/actions/login-actions";
import { CreatePautaDTO } from "@/core/domain/dtos/pauta.dto";
import { RespostaApi } from "@/core/domain/models/resposta-api";

function handleError(error: any, message: string) {
	console.error(message, error);
	const respostaException = new RespostaApi({
		sucesso: false,
		mensagem: `Ocorreu um erro inesperado no servidor: ${
			message.toLowerCase().includes("criar") ? "ao criar" : "ao listar"
		} pauta(s)`,
		dados: process.env.NODE_ENV === "development" ? error : undefined,
	});
	return NextResponse.json(respostaException, { status: 500 });
}

// ! Handler - Criação de Pauta
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

		const controller = new CriarPautaController();
		const resposta = await controller.executar(body as CreatePautaDTO);

		let status = 201;
		if (!resposta.sucesso) {
			if (resposta.mensagem?.includes("já existe")) {
				status = 409;
			} else if (resposta.mensagem?.includes("obrigatório")) {
				status = 400;
			} else {
				status = 400;
			}
		}

		return NextResponse.json(resposta, { status });
	} catch (error) {
		return handleError(error, "Erro ao criar pauta");
	}
}

// ! Handler - Listar Pautas
export async function GET() {
	try {
		const controller = new ListarPautaController();
		const resposta = await controller.executar();

		return NextResponse.json(resposta, {
			status: resposta.sucesso ? 200 : 404,
		});
	} catch (error) {
		return handleError(error, "Erro ao listar pautas");
	}
}
