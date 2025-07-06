import { NextRequest, NextResponse } from "next/server";

import { AtualizarDireitoVioladoController } from "@/adapters/api/controllers/direito-violado/atualizar-direito_violado-controller";
import { BuscarDireitoVioladoController } from "@/adapters/api/controllers/direito-violado/buscar-direito_violado-controller";
import { DeletarDireitoVioladoController } from "@/adapters/api/controllers/direito-violado/deletar-direito_violado-controller";
import { UpdateDireitoVioladoDTO } from "@/core/domain/dtos/direito-violado.dto";
import { RespostaApi } from "@/core/domain/models/resposta-api";

function validateId(id?: string): NextResponse | undefined {
	if (!id || id.trim() === "") {
		const respostaIdInvalido = new RespostaApi({
			sucesso: false,
			mensagem: "ID do Direito Violado não fornecido ou inválido",
		});
		return NextResponse.json(respostaIdInvalido, { status: 400 });
	}
	return undefined;
}

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

// ! Handler - Atualização de Direito Violado
export async function PATCH(
	request: NextRequest,
	context: { params: Promise<{ id: string }> }
) {
	try {
		const params = await context.params;
		const idError = validateId(params.id);
		if (idError) return idError;

		const body = await request.json().catch(() => ({}));
		const updateData = {
			id: params.id,
			...body,
		} as UpdateDireitoVioladoDTO;

		const controller = new AtualizarDireitoVioladoController();
		const resposta = (await controller.executar(updateData)) as RespostaApi;

		let status = 200;
		if (!resposta.sucesso) {
			if (resposta.mensagem?.includes("não foi encontrado")) {
				status = 404;
			} else if (resposta.mensagem?.includes("Já existe outro")) {
				status = 409;
			} else {
				status = 400;
			}
		}

		return NextResponse.json(resposta, { status });
	} catch (error) {
		return handleError(error, "Erro ao atualizar Direito Violado");
	}
}

// ! Handler - Deletar Direito Violado
export async function DELETE(
	request: NextRequest,
	context: { params: Promise<{ id: string }> }
) {
	try {
		const params = await context.params;
		const idError = validateId(params.id);
		if (idError) return idError;

		const controller = new DeletarDireitoVioladoController();
		const resposta = (await controller.executar({
			id: params.id,
		})) as RespostaApi;

		let status = 200;
		if (!resposta.sucesso) {
			if (resposta.mensagem?.includes("não foi encontrado")) {
				status = 404;
			} else if (resposta.mensagem?.includes("projetos relacionados")) {
				status = 409;
			} else {
				status = 400;
			}
		}

		return NextResponse.json(resposta, { status });
	} catch (error) {
		return handleError(error, "Erro ao deletar Direito Violado");
	}
}

// ! Handler - Buscar Direito Violado por ID
export async function GET(
	request: NextRequest,
	context: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
	try {
		const params = await context.params;
		const idError = validateId(params.id);
		if (idError) return idError;

		const controller = new BuscarDireitoVioladoController();
		const resposta = await controller.executar(params.id);

		return NextResponse.json(resposta, {
			status: resposta.sucesso ? 200 : 404,
		});
	} catch (error) {
		return handleError(error, "Erro ao buscar Direito Violado por ID");
	}
}
