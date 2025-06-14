"use server";

import axios from "axios";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";

import { auth } from "../../../../auth";

import { prismaClient } from "@/services/prisma/prisma";

interface ApiResponse {
	sucesso: boolean;
	mensagem: string;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	dados?: any;
}

export async function deleteUser(
	prevState: string | undefined,
	formData: FormData
): Promise<string | undefined> {
	const session = await auth();

	if (!session?.user?.id) {
		return "Sessão de usuário inválida ou não autenticada";
	}
	if (session.user.role !== "ADMIN") {
		return "Você não tem permissão para realizar esta ação";
	}

	const idUserDelete = formData.get("idUserDelete") as string;
	const senhaAdmin = formData.get("senha") as string;
	const redirecione = (formData.get("redirectTo") as string) || "/";

	if (!idUserDelete || !senhaAdmin) {
		return "Informações faltando para completar a exclusão";
	}

	try {
		const userAdmin = await prismaClient.user.findUnique({
			where: { id: session.user.id },
		});

		if (!userAdmin || !userAdmin.passwordHash) {
			return "Não foi possível verificar a identidade do administrador";
		}

		const isSenhaCorreta = await bcrypt.compare(
			senhaAdmin,
			userAdmin.passwordHash
		);

		if (!isSenhaCorreta) {
			return "Senha de administrador incorreta.";
		}

		const userApi = `${process.env.PUBLIC_BASE_URL}/api/user/${idUserDelete}`;

		const resposta = await axios.delete<ApiResponse>(userApi, {
			data: { roleUserDaSession: session.user.role },
			withCredentials: true,
		});

		if (resposta.data.sucesso) {
			redirect(redirecione);
		} else {
			return resposta.data.mensagem;
		}
	} catch (error) {
		if (axios.isAxiosError(error) && error.response) {
			console.error("Erro da API:", error.response.data);
			return (
				error.response.data.mensagem || "Ocorreu um erro ao deletar o usuário"
			);
		}

		console.error("Erro inesperado na Server Action:", error);
		return "Ocorreu um erro inesperado ao processar sua solicitação";
	}
}
