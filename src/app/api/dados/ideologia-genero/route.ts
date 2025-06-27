import { NextResponse } from "next/server";

import { ListarIdeologiaGeneroController } from "@/core/lib/api/controllers/dados/ideologia-genero-controller";

export async function GET() {
	try {
		const controller = new ListarIdeologiaGeneroController();

		const resposta = await controller.executar();

		return NextResponse.json(resposta, {
			status: resposta.sucesso ? 200 : 404,
		});
	} catch (error) {
		NextResponse.json(
			{
				sucesso: false,
				mensagem: "Erro ao listar ideologia e gênero",
				dados: error instanceof Error ? error.message : String(error),
			},
			{ status: 500 }
		);
	}
}
