import { NextResponse } from "next/server";

import { ListarAnosController } from "@/adapters/api/controllers/dados/listar-anos-controller";

export async function GET() {
	try {
		const controller = new ListarAnosController();
		const resposta = await controller.executar();
		
		return NextResponse.json(resposta, {
			status: resposta.sucesso ? 200 : 404,
		});
	} catch (error) {
		return NextResponse.json(
			{
				sucesso: false,
				mensagem: "Erro ao listar anos",
				dados: error instanceof Error ? error.message : String(error),
			},
			{ status: 500 }
		);
	}
}