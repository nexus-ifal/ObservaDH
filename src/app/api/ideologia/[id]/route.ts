import { NextRequest, NextResponse } from "next/server";

import { AtualizarIdeologiaController } from "@/adapters/api/controllers/ideologia/atualizar-ideologia-controller";
import { BuscarIdeologiaController } from "@/adapters/api/controllers/ideologia/buscar-ideologia-controller";
import { DeletarIdeologiaController } from "@/adapters/api/controllers/ideologia/deletar-ideologia-controller";
import { userRoleSession } from "@/app/actions/login-actions";
import { UpdateIdeologiaDTO } from "@/core/domain/dtos/ideologia.dto";
import { RespostaApi } from "@/core/domain/models/resposta-api";

function validateId(id?: string): NextResponse | undefined {
	if (!id || id.trim() === "") {
		const respostaIdInvalido = new RespostaApi({
			sucesso: false,
			mensagem: "ID da ideologia não fornecido ou inválido",
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
		const userRole = await userRoleSession();
		if (idError) return idError;

		const body = await request.json().catch(() => ({}));
		const updateData = {
			id: params.id as string,
			...body,
		} as UpdateIdeologiaDTO;

		if (!userRole || userRole == null) {
			const respostaNoBody = new RespostaApi({
				sucesso: false,
				mensagem: "Usuário não autenticado",
			});
			return NextResponse.json(respostaNoBody, { status: 400 });
		}

		if (userRole !== "ADMIN" && userRole !== "EDITOR") {
			const respostaNoBody = new RespostaApi({
				sucesso: false,
				mensagem: "Usuário não autorizado",
			});
			return NextResponse.json(respostaNoBody, { status: 400 });
		}

		const controller = new AtualizarIdeologiaController();
		const resposta = (await controller.executar(updateData)) as RespostaApi;

		let status = 200;
		if (!resposta.sucesso) {
			if (resposta.mensagem?.includes("não foi encontrada")) {
				status = 404;
			} else {
				status = 400;
			}
		}

		return NextResponse.json(resposta, { status });
	} catch (error) {
		return handleError(error, "Erro ao atualizar ideologia");
	}
}

export async function DELETE(
	request: NextRequest,
	context: { params: Promise<{ id: string }> }
) {
	try {
		const params = await context.params;
		const idError = validateId(params.id);
		const userRole = await userRoleSession();
		if (idError) return idError;

		if (!userRole || userRole == null) {
			const respostaNoBody = new RespostaApi({
				sucesso: false,
				mensagem: "Usuário não autenticado",
			});
			return NextResponse.json(respostaNoBody, { status: 400 });
		}

		if (userRole !== "ADMIN" && userRole !== "EDITOR") {
			const respostaNoBody = new RespostaApi({
				sucesso: false,
				mensagem: "Usuário não autorizado",
			});
			return NextResponse.json(respostaNoBody, { status: 400 });
		}

		const controller = new DeletarIdeologiaController();
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
		return handleError(error, "Erro ao deletar ideologia");
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
		const controller = new BuscarIdeologiaController();
		const resposta = await controller.executar(id);

		return NextResponse.json(resposta, {
			status: resposta.sucesso ? 200 : 404,
		});
	} catch (error) {
		return handleError(error, "Erro ao buscar ideologia por ID");
	}
}
