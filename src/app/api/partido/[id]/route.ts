import { NextRequest, NextResponse } from "next/server";

import { AtualizarPartidoController } from "@/adapters/api/controllers/partido/atualizar-partido-controller";
import { BuscarPartidoController } from "@/adapters/api/controllers/partido/buscar-partido-controller";
import { DeletarPartidoController } from "@/adapters/api/controllers/partido/deletar-partido-controller";
import { userRoleSession } from "@/app/actions/login-actions";
import { UpdatePartidoDTO } from "@/core/domain/dtos/partido.dto";
import { RespostaApi } from "@/core/domain/models/resposta-api";

function validateId(id?: string): NextResponse | undefined {
	if (!id || id.trim() === "") {
		const respostaIdInvalido = new RespostaApi({
			sucesso: false,
			mensagem: "ID do partido não fornecido ou inválido",
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
		const { nome, sigla, imagem } = body as UpdatePartidoDTO;

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

		const controller = new AtualizarPartidoController();
		const resposta = (await controller.executar({
			id: params.id as string,
			nome: nome,
			sigla: sigla,
			imagem: imagem,
		})) as RespostaApi;

		return NextResponse.json(resposta, {
			status: resposta.sucesso
				? 200
				: resposta.mensagem?.includes("não encontrado")
					? 404
					: 400,
		});
	} catch (error) {
		return handleError(error, "Erro ao atualizar partido");
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

		const controller = new DeletarPartidoController();
		const resposta = (await controller.executar({
			id: params.id as string,
		})) as RespostaApi;

		return NextResponse.json(resposta, {
			status: resposta.sucesso
				? 200
				: resposta.mensagem?.includes("não encontrado")
					? 404
					: resposta.mensagem?.includes("registros relacionados")
						? 409
						: 400,
		});
	} catch (error) {
		return handleError(error, "Erro ao deletar partido");
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

		if (!id) {
			const respostaApi = new RespostaApi({
				sucesso: false,
				mensagem: "faltam informações para buscar o partido",
			});

			return NextResponse.json(respostaApi, { status: 400 });
		}

		const controller = new BuscarPartidoController();

		const resposta = await controller.executar(id);

		return NextResponse.json(resposta, {
			status: resposta.sucesso ? 200 : 404,
		});
	} catch (error) {
		return handleError(error, "Erro ao buscar partido por ID");
	}
}
