import { NextRequest, NextResponse } from "next/server";

import { AtualizarEstadoController } from "@/core/lib/api/controllers/estado/atualizar-estado-controller";
import { BuscarEstadoController } from "@/core/lib/api/controllers/estado/buscar-estado-controller";
import { DeletarEstadoController } from "@/core/lib/api/controllers/estado/deletar-estado-controller";
import { UpdateEstadoDTO } from "@/core/domain/dtos/estado.dto";
import { RespostaApi } from "@/core/domain/models/resposta-api";

function validateId(id?: string): NextResponse | undefined {
	if (!id) {
		const respostaIdInvalido = new RespostaApi({
			sucesso: false,
			mensagem: "ID do estado não fornecido ou inválido",
		});
		return NextResponse.json(respostaIdInvalido, { status: 400 });
	}
	return undefined;
}

//! Handler - Atualização de estado
export async function PATCH(
	request: NextRequest,
	context: { params: Promise<{ id: string }> }
) {
	try {
		const params = await context.params;
		const idError = validateId(params.id);
		if (idError) return idError;

		const body = await request.json().catch(() => ({}));
		const { nome, sigla } = body as UpdateEstadoDTO;

		const controller = new AtualizarEstadoController();
		const resposta = (await controller.executar({
			id: params.id as string,
			nome: nome,
			sigla: sigla,
		} as UpdateEstadoDTO)) as RespostaApi;

		return NextResponse.json(resposta, {
			status: resposta.sucesso
				? 200
				: resposta.mensagem?.includes("não encontrado")
					? 404
					: 400,
		});
	} catch (error) {
		console.error("Erro ao atualizar estado:", error);

		const respostaException = new RespostaApi({
			sucesso: false,
			mensagem: "Ocorreu um erro inesperado no servidor",
			dados: process.env.NODE_ENV === "development" ? error : undefined,
		});
		return NextResponse.json(respostaException, { status: 500 });
	}
}

//! Handler - Deletar estado
export async function DELETE(
	request: NextRequest,
	context: { params: Promise<{ id: string }> }
) {
	try {
		const params = await context.params;
		const idError = validateId(params.id);
		if (idError) return idError;

		const controller = new DeletarEstadoController();
		const resposta = (await controller.executar({
			id: params.id as string,
		})) as RespostaApi;

		return NextResponse.json(resposta, {
			status: resposta.sucesso
				? 200
				: resposta.mensagem?.includes("não encontrado")
					? 404
					: 400,
		});
	} catch (error) {
		console.error("Erro ao deletar estado:", error);

		const respostaException = new RespostaApi({
			sucesso: false,
			mensagem: "Ocorreu um erro inesperado no servidor",
			dados: process.env.NODE_ENV === "development" ? error : undefined,
		});
		return NextResponse.json(respostaException, { status: 500 });
	}
}

//! Handler - Buscar estado
export async function GET(
	request: Request,
	context: { params: Promise<{ id: string }> }
) {
	try {
		const params = await context.params;
		const { id } = params;
		const controller = new BuscarEstadoController();
		const resposta = await controller.executar(id);

		return NextResponse.json(resposta, {
			status: resposta.sucesso ? 200 : 404,
		});
	} catch (error) {
		console.error("Erro ao buscar estado:", error);

		const respostaException = new RespostaApi({
			sucesso: false,
			mensagem: "Ocorreu um erro inesperado no servidor",
			dados: process.env.NODE_ENV === "development" ? error : undefined,
		});
		return NextResponse.json(respostaException, { status: 500 });
	}
}
