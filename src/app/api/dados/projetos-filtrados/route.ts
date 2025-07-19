import { NextResponse } from "next/server";

import { FiltrarProjetosController } from "@/adapters/api/controllers/dados/filtrar-projetos-controller";

export async function GET(request: Request) {
	try {
		const url = new URL(request.url);
		const esferaId = url.searchParams.get("esferaId");
		const ano = url.searchParams.get("ano");
		const estadoId = url.searchParams.get("estadoId");
		const pautaId = url.searchParams.get("pautaId");

		const controller = new FiltrarProjetosController();
		const resposta = await controller.executar(
			esferaId || undefined,
			ano || undefined,
			estadoId || undefined,
			pautaId || undefined
		);
		
		return NextResponse.json(resposta, {
			status: resposta.sucesso ? 200 : 404,
		});
	} catch (error) {
		return NextResponse.json(
			{
				sucesso: false,
				mensagem: "Erro ao filtrar projetos",
				dados: error instanceof Error ? error.message : String(error),
			},
			{ status: 500 }
		);
	}
}