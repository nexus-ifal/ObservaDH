import { Role } from "@prisma/client";
import { NextResponse } from "next/server";

import { auth } from "../../../../auth";

import { RespostaApi } from "@/core/domain/models/resposta-api";
import { CriarUserController } from "@/core/lib/api/controllers/user/criar-user-controller";
import { ListarUsersController } from "@/core/lib/api/controllers/user/listar-user-controller";
import { criarUserSchema } from "@/schemas/user-zod-schema";
import { prismaClient } from "@/services/prisma/prisma";

const NUM_MAX_ADIMIN_USERS = parseInt(
	process.env.NUM_MAX_ADIMIN_USERS || "3",
	10
);

export async function POST(request: Request) {
	const session = await auth();

	if (!session) {
		const respostaApi = new RespostaApi({
			sucesso: false,
			mensagem: "Usuário não autenticado",
		});
		return NextResponse.json(respostaApi, { status: 401 });
	}

	if (!session.user || session.user.role !== Role.ADMIN) {
		const respostaApi = new RespostaApi({
			sucesso: false,
			mensagem: "Apenas administradores podem criar usuários",
		});
		return NextResponse.json(respostaApi, { status: 403 });
	}

	try {
		const dadosEntrada = await request.json();
		const dadosValidados = criarUserSchema.parse(dadosEntrada);
		const { name, email, password, role } = dadosValidados;

		if (role === Role.ADMIN) {
			const contarAdimins = await prismaClient.user.count({
				where: {
					role: Role.ADMIN,
				},
			});

			if (contarAdimins >= NUM_MAX_ADIMIN_USERS) {
				const respostaApi = new RespostaApi({
					sucesso: false,
					mensagem: `Limite de ${NUM_MAX_ADIMIN_USERS} máximmo de administradores atingido`,
				});
				return NextResponse.json(respostaApi, { status: 400 });
			}
		}

		if (!name || !email || !password || !role) {
			const respostaApi = new RespostaApi({
				sucesso: false,
				mensagem: "Estão faltando infomações para a criação do usuário",
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
