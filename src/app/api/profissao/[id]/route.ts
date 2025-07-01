import { NextRequest, NextResponse } from "next/server";

import { AtualizarProfissaoController } from "@/adapters/api/controllers/profissao/atualizar-profissao-controller";
import { BuscarProfissaoController } from "@/adapters/api/controllers/profissao/buscar-profissao-controller";
import { DeletarProfissaoController } from "@/adapters/api/controllers/profissao/deletar-profissao-controller";
import { UpdateProfissaoDTO } from "@/core/domain/dtos/profissao.dto";
import { RespostaApi } from "@/core/domain/models/resposta-api";

function validateId(id?: string): NextResponse | undefined {
	if (!id || id.trim() === "") {
		const respostaIdInvalido = new RespostaApi({
			sucesso: false,
			mensagem: "ID da profissão não fornecido ou inválido",
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

// ! Handler - Atualização de Profissão
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
		} as UpdateProfissaoDTO;

		const controller = new AtualizarProfissaoController();
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
		return handleError(error, "Erro ao atualizar profissão");
	}
}

// ! Handler - Deletar Profissão
export async function DELETE(
	request: NextRequest,
	context: { params: Promise<{ id: string }> }
) {
	try {
		const params = await context.params;
		const idError = validateId(params.id);
		if (idError) return idError;

		const controller = new DeletarProfissaoController();
		const resposta = (await controller.executar({
			id: params.id as string,
		})) as RespostaApi;

		let status = 200;
		if (!resposta.sucesso) {
			if (resposta.mensagem?.includes("não foi encontrada")) {
				status = 404;
			} else if (resposta.mensagem?.includes("políticos relacionados")) {
				status = 409;
			} else {
				status = 400;
			}
		}

		return NextResponse.json(resposta, { status });
	} catch (error) {
		return handleError(error, "Erro ao deletar profissão");
	}
}

// ! Handler - Buscar Profissão por ID
export async function GET(
	request: Request,
	context: { params: Promise<{ id: string }> }
) {
	try {
		const params = await context.params;
		const idError = validateId(params.id);
		if (idError) return idError;

		const { id } = params;
		const controller = new BuscarProfissaoController();
		const resposta = await controller.executar(id);

		return NextResponse.json(resposta, {
			status: resposta.sucesso ? 200 : 404,
		});
	} catch (error) {
		return handleError(error, "Erro ao buscar profissão por ID");
	}
}
