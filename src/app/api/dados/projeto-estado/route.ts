import { NextResponse } from "next/server";

import { ListarProjetosPorUFController } from "@/core/lib/api/controllers/dados/projeto-estado-service";

export async function GET() {
	try {
		const controller = new ListarProjetosPorUFController();

		const resposta = await controller.executar();

		return NextResponse.json(resposta, {
			status: resposta.sucesso ? 200 : 404,
		});
	} catch (error) {
		return NextResponse.json(
			{
				sucesso: false,
				mensagem: "Erro ao listar projetos por estado",
				dados: error instanceof Error ? error.message : String(error),
			},
			{ status: 500 }
		);
	}
}
