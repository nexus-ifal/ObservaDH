import { NextRequest, NextResponse } from "next/server";

import { UpdatePoliticoDTO } from "@/domain/dtos/politico.dto";
import { RespostaApi } from "@/domain/models/resposta-api";
import { AtualizarPoliticoController } from "@/core/lib/api/controllers/politico/atualizar-politico-controller";
import { BuscarPoliticoController } from "@/core/lib/api/controllers/politico/buscar-politico-controller";
import { DeletarPoliticoController } from "@/core/lib/api/controllers/politico/deletar-politico-controller";

function validateId(id?: string): NextResponse | undefined {
	if (!id || id.trim() === "") {
		const respostaIdInvalido = new RespostaApi({
			sucesso: false,
			mensagem: "ID do político não fornecido ou inválido",
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
			id: params.id as string,
			...body,
		} as UpdatePoliticoDTO;

		const controller = new AtualizarPoliticoController();
		const resposta = (await controller.executar(updateData)) as RespostaApi;

		let status = 200;
		if (!resposta.sucesso) {
			if (resposta.mensagem?.includes("não foi encontrado")) {
				status = 404;
			} else if (resposta.mensagem?.includes("ID relacionado inválido")) {
				status = 400;
			} else {
				status = 400;
			}
		}

		return NextResponse.json(resposta, { status });
	} catch (error) {
		return handleError(error, "Erro ao atualizar político");
	}
}

export async function DELETE(
	request: NextRequest,
	context: { params: Promise<{ id: string }> }
) {
	try {
		const params = await context.params;
const idError = validateId(params.id);
		if (idError) return idError;

		const controller = new DeletarPoliticoController();
		const resposta = (await controller.executar({
			id: params.id as string,
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
		return handleError(error, "Erro ao deletar político");
	}
}

export async function GET(
	request: Request,
	context: { params: Promise<{ id: string }> }
) {
	try {
		const params = await context.params;
const idError = validateId(params.id);
		if (idError) return idError;

		const { id } = params;
		const controller = new BuscarPoliticoController();
		const resposta = await controller.executar(id);

		return NextResponse.json(resposta, {
			status: resposta.sucesso ? 200 : 404,
		});
	} catch (error) {
		return handleError(error, "Erro ao buscar político por ID");
	}
}
