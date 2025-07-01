import { Role } from "@prisma/client";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

import { CriarUserController } from "@/adapters/api/controllers/user/criar-user-controller";
import { ListarUsersController } from "@/adapters/api/controllers/user/listar-user-controller";
import { prismaClient } from "@/adapters/db/prisma";
import { RespostaApi } from "@/core/domain/models/resposta-api";

const NUM_MAX_ADMIN_USERS = parseInt(
	process.env.NUM_MAX_ADMIN_USERS || "3",
	10
);

export async function POST(request: NextRequest) {
	try {
		const body = await request.json();
		const { name, email, password, role, roleUserDaSession } = body;

		if (roleUserDaSession !== Role.ADMIN) {
			const respostaApi = new RespostaApi({
				sucesso: false,
				mensagem: "Apenas administradores podem criar usuários",
			});
			return NextResponse.json(respostaApi, { status: 403 });
		}

		if (role === Role.ADMIN) {
			const contarAdmins = await prismaClient.user.count({
				where: {
					role: Role.ADMIN,
				},
			});

			if (contarAdmins >= NUM_MAX_ADMIN_USERS) {
				const respostaApi = new RespostaApi({
					sucesso: false,
					mensagem: "Limite máximo de administradores atingido",
				});
				return NextResponse.json(respostaApi, { status: 400 });
			}
		}

		if (!name || !email || !password || !role) {
			const respostaApi = new RespostaApi({
				sucesso: false,
				mensagem: "Estão faltando informações para a criação do usuário",
			});
			return NextResponse.json(respostaApi, { status: 400 });
		} else {
			const controller = new CriarUserController();
			const resposta = await controller.executar({
				name: name,
				email: email,
				passwordHash: password,
				role: role,
			});

			return NextResponse.json(resposta, {
				status: resposta.sucesso ? 200 : 400,
			});
		}
	} catch (error) {
		const respostaApi = new RespostaApi({
			sucesso: false,
			mensagem: "Ocorreu um erro inesperado",
			dados: error,
		});
		return NextResponse.json(respostaApi, { status: 500 });
	}
}

export async function GET() {
	try {
		const controller = new ListarUsersController();
		const resposta = await controller.executar();

		if (!resposta.sucesso) {
			return NextResponse.json({
				resposta,
				status: 400,
			});
		}
		return NextResponse.json(resposta, { status: 200 });
	} catch (error) {
		const respostaApi = new RespostaApi({
			sucesso: false,
			mensagem: "Ocorreu um erro inesperado",
			dados: error,
		});
		return NextResponse.json(respostaApi, { status: 500 });
	}
}
