import { NextRequest, NextResponse } from "next/server";

import { BuscarUserController } from "@/adapters/api/controllers/user/buscar-user-controller";
import { RespostaApi } from "@/core/domain/models/resposta-api";

export async function GET(
	request: NextRequest,
	context: { params: Promise<{ name: string }> }
) {
	const params = await context.params;
	const { name } = params;

	if (!name) {
		const resposta = new RespostaApi({
			sucesso: false,
			mensagem: "O nome do usuário não foi informado",
		});

		return NextResponse.json(resposta, { status: 400 });
	}

	try {
		const controller = new BuscarUserController();
		const resposta = await controller.buscarPorNome({ name: name });

		return NextResponse.json(resposta, {
			status: resposta.sucesso ? 200 : 400,
		});
	} catch (error) {
		const resposta = new RespostaApi({
			sucesso: false,
			mensagem: "Erro interno",
			dados: error,
		});

		return NextResponse.json(resposta, { status: 500 });
	}
}
