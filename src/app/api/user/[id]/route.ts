import { Role } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

import { AtualizarUserController } from "@/adapters/api/controllers/user/atualizar-user-controller";
import { BuscarUserController } from "@/adapters/api/controllers/user/buscar-user-controller";
import { DeletarUserController } from "@/adapters/api/controllers/user/deletar-user-contoller";
import { RespostaApi } from "@/core/domain/models/resposta-api";

export async function DELETE(
	request: NextRequest,
	context: { params: Promise<{ id: string }> }
) {
	try {
		const params = await context.params;
		const { id } = params;
		const body = await request.json();
		const { roleUserDaSession } = body;

		if (roleUserDaSession !== Role.ADMIN) {
			const respostaApi = new RespostaApi({
				sucesso: false,
				mensagem: "Apenas administradores podem deletar usuários",
			});
			return NextResponse.json(respostaApi, { status: 403 });
		}

		if (!id) {
			const respostaApi = new RespostaApi({
				sucesso: false,
				mensagem: "Estão faltando informações para deletar o usuário",
			});
			return NextResponse.json(respostaApi, {
				status: 400,
			});
		}

		const controller = new DeletarUserController();
		const resposta = await controller.executar({ id: id });

		if (!resposta.sucesso) {
			return NextResponse.json(resposta, { status: 400 });
		}

		return NextResponse.json(resposta, {
			status: resposta.sucesso ? 200 : 400,
		});
	} catch (error) {
		const respostaApi = new RespostaApi({
			sucesso: false,
			mensagem: "Ocorreu um erro inesperado",
			dados: error,
		});

		return NextResponse.json(respostaApi, { status: 500 });
	}
}

export async function GET(
	request: NextRequest,
	context: { params: Promise<{ id: string }> }
) {
	const params = await context.params;
	const { id } = params;

	if (!id) {
		const resposta = new RespostaApi({
			sucesso: false,
			mensagem: "O id do usuário não foi informado",
		});

		return NextResponse.json(resposta, { status: 400 });
	}

	try {
		const controller = new BuscarUserController();
		const resposta = await controller.buscarPorId({ id: id });

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

export async function PATCH(
	request: NextRequest,
	context: { params: Promise<{ id: string }> }
) {
	const params = await context.params;
	const { id } = params;
	const body = await request.json();
	const { name, email, password, role, roleUserDaSession } = body;

	if (roleUserDaSession !== Role.ADMIN) {
		const respostaApi = new RespostaApi({
			sucesso: false,
			mensagem: "Apenas administradores podem atualizar usuários",
		});
		return NextResponse.json(respostaApi, { status: 403 });
	}

	if (!id) {
		const respostaApi = new RespostaApi({
			sucesso: false,
			mensagem: "O id do usuário não foi informado",
		});
		return NextResponse.json({
			respostaApi,
			status: 400,
		});
	}

	try {
		const controller = new AtualizarUserController();
		const resposta = await controller.executar({
			id: id,
			name: name,
			email: email,
			passwordHash: password,
			role: role,
		});

		return NextResponse.json(resposta, {
			status: resposta.sucesso ? 200 : 400,
		});
	} catch (error) {
		const respostaApi = new RespostaApi({
			sucesso: false,
			mensagem: "Erro interno",
			dados: error,
		});

		return NextResponse.json(respostaApi, { status: 500 });
	}
}
