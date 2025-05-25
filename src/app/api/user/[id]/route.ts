import { RespostaApi } from "@/core/domain/models/resposta-api";
import { AtualizarUserController } from "@/core/lib/api/controllers/user/atualizar-user-controller";
import { BuscarUserController } from "@/core/lib/api/controllers/user/buscar-user-controller";
import { DeletarUserController } from "@/core/lib/api/controllers/user/deletar-user-contoller";
import { NextRequest, NextResponse } from "next/server";


export async function DELETE(
	request: NextRequest,
	_request: Request,
	context: { params: Promise<{ id: string }> }
) {
	const params = await context.params;
	const { id } = params;

	if (!id) {
		const respostaApi = new RespostaApi({
			sucesso: false,
			mensagem: "Estão faltando informações para deletar o usuário",
		});
		return NextResponse.json({
			respostaApi,
			status: 400,
		});
	}

	try {
		const controller = new DeletarUserController();
		const resposta = await controller.executar({ id: id });

		if (!resposta.sucesso) {
			return NextResponse.json({ resposta }, { status: 400 });
		}

		return NextResponse.json(
			{ resposta },
			{
				status: resposta.sucesso ? 200 : 400,
			}
		);
	} catch (error) {
		const respostaApi = new RespostaApi({
			sucesso: false,
			mensagem: "Ocorreu um erro inesperado",
			dados: error,
		});

		return NextResponse.json({ respostaApi }, { status: 500 });
	}
}

export async function GET(
	request: NextRequest,
	context: { params: Promise<{ name: string }> }
) {
	const params = await context.params;
	const { name } = params;

	if (!name) {
		const resposta = new RespostaApi({
			sucesso: false,
			mensagem: "O nome do usuário não foi informado",
		});

		return NextResponse.json({ resposta }, { status: 400 });
	}

	try {
		const controller = new BuscarUserController();
		const resposta = await controller.executar({ name: name });

		return NextResponse.json(
			{ resposta },
			{
				status: resposta.sucesso ? 200 : 400,
			}
		);
	} catch (error) {
		const resposta = new RespostaApi({
			sucesso: false,
			mensagem: "Erro interno",
			dados: error,
		});

		return NextResponse.json({ resposta }, { status: 500 });
	}
}

export async function PATCH(
	request: NextRequest,
	context: { params: Promise<{ id: string }> }
) {
	const params = await context.params;
	const { id } = params;
	const { name, email, passwordHash, role } = await request.json();

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
			passwordHash: passwordHash,
			role: role,
		});

		return NextResponse.json(
			{ resposta },
			{
				status: resposta.sucesso ? 200 : 400,
			}
		);
	} catch (error) {
		const respostaApi = new RespostaApi({
			sucesso: false,
			mensagem: "Erro interno",
			dados: error,
		});

		return NextResponse.json({ respostaApi }, { status: 500 });
	}
}
