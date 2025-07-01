import { NextRequest, NextResponse } from "next/server";

import { AtualizarPautaController } from "@/adapters/api/controllers/pauta/atualizar-pauta-controller";
import { BuscarPautaController } from "@/adapters/api/controllers/pauta/buscar-pauta-controller";
import { DeletarPautaController } from "@/adapters/api/controllers/pauta/deletar-pauta-controller";
import { UpdatePautaDTO } from "@/core/domain/dtos/pauta.dto";
import { RespostaApi } from "@/core/domain/models/resposta-api";

function validateId(id?: string): NextResponse | undefined {
	if (!id || id.trim() === "") {
		const respostaIdInvalido = new RespostaApi({
			sucesso: false,
			mensagem: "ID da pauta não fornecido ou inválido",
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

// ! Handler - Atualização de Pauta
export async function PATCH(
	request: NextRequest,
	context: { params: Promise<{ id: string }> }
) {
	try {
		const params = await context.params;
		const idError = validateId(params.id);
		if (idError) return idError;

		const body = await request.json().catch(() => ({}));
		const updateData = { id: params.id as string, ...body } as UpdatePautaDTO;

		const controller = new AtualizarPautaController();
		const resposta = (await controller.executar(updateData)) as RespostaApi;

		let status = 200;
		if (!resposta.sucesso) {
			if (resposta.mensagem?.includes("não foi encontrada")) {
				status = 404;
			} else if (resposta.mensagem?.includes("já existe outra")) {
				status = 409;
			} else {
				status = 400;
			}
		}

		return NextResponse.json(resposta, { status });
	} catch (error) {
		return handleError(error, "Erro ao atualizar pauta");
	}
}

// ! Handler - Deletar Pauta
export async function DELETE(
	request: NextRequest,
	context: { params: Promise<{ id: string }> }
) {
	try {
		const params = await context.params;
		const idError = validateId(params.id);
		if (idError) return idError;

		const controller = new DeletarPautaController();
		const resposta = (await controller.executar({
			id: params.id as string,
		})) as RespostaApi;

		let status = 200;
		if (!resposta.sucesso) {
			if (resposta.mensagem?.includes("não foi encontrada")) {
				status = 404;
			} else if (resposta.mensagem?.includes("projetos relacionados")) {
				status = 409;
			} else {
				status = 400;
			}
		}

		return NextResponse.json(resposta, { status });
	} catch (error) {
		return handleError(error, "Erro ao deletar pauta");
	}
}

// ! Handler - Buscar Pauta por ID
export async function GET(
	request: Request,
	context: { params: Promise<{ id: string }> }
) {
	try {
		const params = await context.params;
		const idError = validateId(params.id);
		if (idError) return idError;

		const { id } = params;
		const controller = new BuscarPautaController();
		const resposta = await controller.executar(id);

		return NextResponse.json(resposta, {
			status: resposta.sucesso ? 200 : 404,
		});
	} catch (error) {
		return handleError(error, "Erro ao buscar pauta por ID");
	}
}
