import { NextResponse } from "next/server";

import { ListarParlamentaresPorEsferaController } from "@/adapters/api/controllers/dados/numero-politico-esfera-controller";

export async function GET(request: Request) {
	try {
		const url = new URL(request.url);
		const esfera = url.searchParams.get("esfera") ?? undefined;
		const controller = new ListarParlamentaresPorEsferaController();
		const resposta = await controller.executar(esfera);
		return NextResponse.json(resposta, {
			status: resposta.sucesso ? 200 : 404,
		});
	} catch (error) {
		return NextResponse.json(
			{
				sucesso: false,
				mensagem: "Erro ao listar parlamentares por esfera",
				dados: error instanceof Error ? error.message : String(error),
			},
			{ status: 500 }
		);
	}
}
