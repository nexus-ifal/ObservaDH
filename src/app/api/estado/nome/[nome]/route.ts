import { NextResponse } from "next/server";

import { RespostaApi } from "@/domain/models/resposta-api";
import { BuscarEstadoController } from "@/lib/api/controllers/estado/buscar-estado-controller";

export async function GET(
	request: Request,
	context: { params: Promise<{ nome: string }> }
) {
	try {
		const params = await context.params;
		const { nome } = params;
		const controller = new BuscarEstadoController();
		const resposta = await controller.buscarPorNome(nome);

		return NextResponse.json(resposta, {
			status: resposta.sucesso ? 200 : 404,
		});
	} catch (error) {
		console.error("Erro ao buscar estado pelo nome:", error);

		const respostaException = new RespostaApi({
			sucesso: false,
			mensagem: "Ocorreu um erro inesperado no servidor",
			dados: process.env.NODE_ENV === "development" ? error : undefined,
		});
		return NextResponse.json(respostaException, { status: 500 });
	}
}
