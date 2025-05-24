import { NextResponse } from "next/server";

import { RespostaApi } from "@/domain/models/resposta-api";
import { BuscarPartidoController } from "@/core/lib/api/controllers/partido/buscar-partido-controller";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function handleError(error: any, message: string) {
	console.error(message, error);
	const respostaException = new RespostaApi({
		sucesso: false,
		mensagem: `Ocorreu um erro inesperado no servidor: ${message}`,
		dados: process.env.NODE_ENV === "development" ? error : undefined,
	});
	return NextResponse.json(respostaException, { status: 500 });
}

export async function GET(
	request: Request,
	context: { params: Promise<{ nome: string }> }
) {
	try {
		const params = await context.params;
		const { nome } = params;
		if (!nome || nome.trim() === "") {
			const respostaNomeInvalido = new RespostaApi({
				sucesso: false,
				mensagem: "Nome do partido não fornecido ou inválido",
			});
			return NextResponse.json(respostaNomeInvalido, { status: 400 });
		}

		const controller = new BuscarPartidoController();
		const resposta = await controller.buscarPorNome(nome);

		return NextResponse.json(resposta, {
			status: resposta.sucesso ? 200 : 404,
		});
	} catch (error) {
		return handleError(error, "Erro ao buscar partido por nome");
	}
}
