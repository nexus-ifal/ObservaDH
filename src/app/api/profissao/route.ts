import { NextRequest, NextResponse } from "next/server";

import { CreateProfissaoDTO } from "@/core/domain/dtos/profissao.dto";
import { RespostaApi } from "@/core/domain/models/resposta-api";
import { CriarProfissaoController } from "@/core/lib/api/controllers/profissao/criar-profissao-controller";
import { ListarProfissaoController } from "@/core/lib/api/controllers/profissao/listar-profissao-controller";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function handleError(error: any, message: string) {
	console.error(message, error);
	const respostaException = new RespostaApi({
		sucesso: false,
		mensagem: `Ocorreu um erro inesperado no servidor: ${
			message.toLowerCase().includes("criar") ? "ao criar" : "ao listar"
		} profissão(ões)`,
		dados: process.env.NODE_ENV === "development" ? error : undefined,
	});
	return NextResponse.json(respostaException, { status: 500 });
}

// ! Handler - Criação de Profissão
export async function POST(request: NextRequest) {
	try {
		const body = await request.json().catch(() => null);

		if (!body) {
			const respostaNoBody = new RespostaApi({
				sucesso: false,
				mensagem: "Corpo da requisição inválido ou vazio",
			});
			return NextResponse.json(respostaNoBody, { status: 400 });
		}

		const controller = new CriarProfissaoController();
		const resposta = await controller.executar(body as CreateProfissaoDTO);

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
		return handleError(error, "Erro ao criar profissão");
	}
}

// ! Handler - Listar Profissões
export async function GET() {
	try {
		const controller = new ListarProfissaoController();
		const resposta = await controller.executar();

		return NextResponse.json(resposta, {
			status: resposta.sucesso ? 200 : 404,
		});
	} catch (error) {
		return handleError(error, "Erro ao listar profissões");
	}
}
