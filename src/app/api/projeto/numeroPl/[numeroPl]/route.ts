import { NextResponse } from "next/server";

import { RespostaApi } from "@/core/domain/models/resposta-api";
import { BuscarProjetoController } from "@/core/lib/api/controllers/projeto/buscar-projeto-controller";

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
	context: { params: Promise<{ numeroPl: string }> }
) {
	try {
		const params = await context.params;
		const { numeroPl } = params;
		if (!numeroPl || numeroPl.trim() === "") {
			const respostaNumPlInvalido = new RespostaApi({
				sucesso: false,
				mensagem: "Número PL do projeto não fornecido ou inválido",
			});
			return NextResponse.json(respostaNumPlInvalido, { status: 400 });
		}

		const controller = new BuscarProjetoController();
		const resposta = await controller.buscarPorNumeroPl(numeroPl);

		return NextResponse.json(resposta, {
			status: resposta.sucesso ? 200 : 404,
		});
	} catch (error) {
		return handleError(error, "Erro ao buscar projeto por número PL");
	}
}
