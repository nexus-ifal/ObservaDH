import { NextResponse } from "next/server";

import { ListarProjetosPorAnoController } from "@/core/lib/api/controllers/dados/projetos-por-ano-controller";

export async function GET() {
	try {
		const controller = new ListarProjetosPorAnoController();

		const resposta = await controller.executar();

		return NextResponse.json(resposta, {
			status: resposta.sucesso ? 200 : 404,
		});
	} catch (error) {
		return NextResponse.json(
			{
				sucesso: false,
				mensagem: "Erro ao listar projetos por ano",
				dados: error instanceof Error ? error.message : String(error),
			},
			{ status: 500 }
		);
	}
}
