import { NextResponse } from "next/server";

import { RespostaApi } from "@/core/domain/models/resposta-api";
import { CriarUserController } from "@/core/lib/api/controllers/user/criar-user-controller";
import { ListarUsersController } from "@/core/lib/api/controllers/user/listar-user-controller";

export async function POST(request: Request) {
	try {
		const { name, email, passwordHash } = await request.json();

		if (!name || !email || !passwordHash) {
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
				passwordHash: passwordHash,
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
