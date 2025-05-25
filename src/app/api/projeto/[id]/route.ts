import { NextRequest, NextResponse } from "next/server";

import { UpdateProjetoDTO } from "@/core/domain/dtos/projeto.dto";
import { RespostaApi } from "@/core/domain/models/resposta-api";
import { AtualizarProjetoController } from "@/core/lib/api/controllers/projeto/atualizar-projeto-controller";
import { BuscarProjetoController } from "@/core/lib/api/controllers/projeto/buscar-projeto-controller";
import { DeletarProjetoController } from "@/core/lib/api/controllers/projeto/deletar-projeto-controller";

function validateId(id?: string): NextResponse | undefined {
	if (!id || id.trim() === "") {
		const respostaIdInvalido = new RespostaApi({
			sucesso: false,
			mensagem: "ID do projeto não fornecido ou inválido",
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
		const updateData = { id: params.id as string, ...body } as UpdateProjetoDTO;

		const controller = new AtualizarProjetoController();
		const resposta = (await controller.executar(updateData)) as RespostaApi;

		let status = 200;
		if (!resposta.sucesso) {
			if (resposta.mensagem?.includes("não foi encontrado")) {
				status = 404;
			} else if (
				resposta.mensagem?.includes("Já existe outro projeto com o número PL")
			) {
				status = 409;
			} else if (resposta.mensagem?.includes("ID relacionado inválido")) {
				status = 400;
			} else {
				status = 400;
			}
		}

		return NextResponse.json(resposta, { status });
	} catch (error) {
		return handleError(error, "Erro ao atualizar projeto");
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

		const controller = new DeletarProjetoController();
		const resposta = (await controller.executar({
			id: params.id as string,
		})) as RespostaApi;

		let status = 200;
		if (!resposta.sucesso) {
			if (resposta.mensagem?.includes("não foi encontrado")) {
				status = 404;
			} else if (resposta.mensagem?.includes("registros relacionados")) {
				status = 409;
			} else {
				status = 400;
			}
		}

		return NextResponse.json(resposta, { status });
	} catch (error) {
		return handleError(error, "Erro ao deletar projeto");
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
		const controller = new BuscarProjetoController();
		const resposta = await controller.executar(id);

		return NextResponse.json(resposta, {
			status: resposta.sucesso ? 200 : 404,
		});
	} catch (error) {
		return handleError(error, "Erro ao buscar projeto por ID");
	}
}
