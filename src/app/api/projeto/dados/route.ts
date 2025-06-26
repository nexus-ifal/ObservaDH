import { NextRequest, NextResponse } from "next/server";

import { ListarProjetosController } from "@/core/lib/api/controllers/projeto/listar-projetos-filtrados-controller";

const controller = new ListarProjetosController();

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
