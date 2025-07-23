import { NextResponse } from "next/server";

import { RankingPartidosController } from "@/adapters/api/controllers/dados/ranking-partidos-controller";

export async function GET() {
	try {
		const controller = new RankingPartidosController();
		const resposta = await controller.executar();

		return NextResponse.json(resposta, {
			status: resposta.sucesso ? 200 : 404,
		});
	} catch (error) {
		return NextResponse.json(
			{
				sucesso: false,
				mensagem: "Erro ao obter ranking de partidos",
				dados: error instanceof Error ? error.message : String(error),
			},
			{ status: 500 }
		);
	}
}
