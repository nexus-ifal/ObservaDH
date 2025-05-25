import { NextRequest, NextResponse } from "next/server";

import { CreateEstadoDTO } from "@/core/domain/dtos/estado.dto";
import { RespostaApi } from "@/core/domain/models/resposta-api";
import { CriarEstadoController } from "@/core/lib/api/controllers/estado/criar-estado-controller";
import { ListarEstadoController } from "@/core/lib/api/controllers/estado/listar-estado-controller";

//! Handler - Criação de estados
export async function POST(request: NextRequest) {
	try {
		const body = await request.json().catch(() => null);

		if (!body) {
			const respostaNoBody = new RespostaApi({
				sucesso: false,
				mensagem: "Estão faltando informações para a criação do estado",
			});
			return NextResponse.json({ respostaNoBody }, { status: 400 });
		}

		const controller = new CriarEstadoController();
		const resposta = await controller.executar(body as CreateEstadoDTO);

		return NextResponse.json(
			{ resposta },
			{ status: resposta.sucesso ? 201 : 400 }
		);
	} catch (error) {
		console.error("Erro ao criar estado:", error);

		const respostaException = new RespostaApi({
			sucesso: false,
			mensagem: "Ocorreu um erro inesperado no servidor",
			dados: process.env.NODE_ENV === "development" ? error : undefined,
		});
		return NextResponse.json({ respostaException }, { status: 500 });
	}
}

//! Handler - Listar estados
export async function GET() {
	try {
		const controller = new ListarEstadoController();
		const resposta = await controller.executar();

		return NextResponse.json(
			{ resposta },
			{ status: resposta.sucesso ? 200 : 404 }
		);
	} catch (error) {
		console.error("Erro ao listar estados:", error);

		const respostaException = new RespostaApi({
			sucesso: false,
			mensagem: "Ocorreu um erro inesperado no servidor",
			dados: process.env.NODE_ENV === "development" ? error : undefined,
		});
		return NextResponse.json({ respostaException }, { status: 500 });
	}
}
