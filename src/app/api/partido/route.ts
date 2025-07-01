import { NextRequest, NextResponse } from "next/server";

import { CriarPartidoController } from "@/adapters/api/controllers/partido/criar-partido-controller";
import { ListarPartidoController } from "@/adapters/api/controllers/partido/listar-partido-controller";
import { CreatePartidoDTO } from "@/core/domain/dtos/partido.dto";
import { RespostaApi } from "@/core/domain/models/resposta-api";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function handleError(error: any, message: string) {
	console.error(message, error);
	const respostaException = new RespostaApi({
		sucesso: false,
		mensagem: `Ocorreu um erro inesperado no servidor: ${
			message.toLowerCase().includes("criar") ? "ao criar" : "ao listar"
		} partido(s)`,
		dados: process.env.NODE_ENV === "development" ? error : undefined,
	});
	return NextResponse.json(respostaException, { status: 500 });
}

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

		const controller = new CriarPartidoController();
		const resposta = await controller.executar(body as CreatePartidoDTO);

		return NextResponse.json(resposta, {
			status: resposta.sucesso ? 201 : 400,
		});
	} catch (error) {
		return handleError(error, "Erro ao criar partido");
	}
}

export async function GET() {
	try {
		const controller = new ListarPartidoController();
		const resposta = await controller.executar();

		return NextResponse.json(resposta, {
			status: resposta.sucesso ? 200 : 404,
		});
	} catch (error) {
		return handleError(error, "Erro ao listar partidos");
	}
}
