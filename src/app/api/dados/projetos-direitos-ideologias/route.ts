import { NextResponse } from "next/server";

import { ListarProjetoDireitosController } from "@/adapters/api/controllers/dados/projetos-direitos-ideologia-controller";
export async function GET(request: Request) {
	try {
		const { searchParams } = new URL(request.url);
		const pautaId = searchParams.get("pautaId") ?? undefined;

		const controller = new ListarProjetoDireitosController();
		const resposta = await controller.executar(pautaId);

		return NextResponse.json(
			{ resposta },
			{ status: resposta.sucesso ? 200 : 404 }
		);
	} catch (error) {
		console.error("Erro ao listar projetos/direitos:", error);

		const respostaException = {
			sucesso: false,
			mensagem: "Ocorreu um erro inesperado no servidor",
			dados: process.env.NODE_ENV === "development" ? error : undefined,
		};
		return NextResponse.json({ respostaException }, { status: 500 });
	}
}
