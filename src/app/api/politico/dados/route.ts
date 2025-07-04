import { NextRequest, NextResponse } from "next/server";

import { ListarPoliticoFiltradoController } from "@/adapters/api/controllers/politico/listar-politico-filtrado-controller";

const controller = new ListarPoliticoFiltradoController();

export async function GET(request: NextRequest) {
	try {
		return controller.executar(request);
	} catch (error) {
		return NextResponse.json(
			{
				sucesso: false,
				mensagem: "Erro ao processar a requisição",
				dados: (error as Error).message,
			},
			{ status: 500 }
		);
	}
}
