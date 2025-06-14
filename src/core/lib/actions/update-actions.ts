import axios from "axios";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { z } from "zod";

import { auth } from "../../../../auth";

import { atualizarUserSchema } from "@/schemas/user-zod-schema";
import { prismaClient } from "@/services/prisma/prisma";

interface ApiResponse {
	sucesso: boolean;
	mensagem: string;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	dados?: any;
}

export async function updateUser(
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

	const idUserUpdate = formData.get("idUserUpdate") as string;
	const senhaAdmin = formData.get("senha") as string;
	const redirecione = (formData.get("redirectTo") as string) || "/";

	const name = formData.get("name") || undefined;
	const email = formData.get("email") || undefined;
	const password = formData.get("password") || undefined;
	const role = formData.get("role") || undefined;

	if (!idUserUpdate || !senhaAdmin) {
		return "Informações faltando para completar a atualização";
	}

	try {
		const camposValidados = atualizarUserSchema.parse({
			name: name,
			email: email,
			password: password,
			role: role,
		});

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

		const userApi = `${process.env.PUBLIC_BASE_URL}/api/user/${idUserUpdate}`;
		const dadosParaApi: {
			name?: string;
			email?: string;
			passwordHash?: string;
			role?: string;
			roleUserDaSession: string;
		} = {
			roleUserDaSession: session.user.role,
		};

		if (camposValidados.name !== undefined) {
			dadosParaApi.name = camposValidados.name;
		}
		if (camposValidados.email !== undefined) {
			dadosParaApi.email = camposValidados.email;
		}
		if (camposValidados.password !== undefined) {
			dadosParaApi.passwordHash = camposValidados.password;
		}
		if (camposValidados.role !== undefined) {
			dadosParaApi.role = camposValidados.role;
		}

		const resposta = await axios.patch<ApiResponse>(userApi, dadosParaApi, {
			withCredentials: true,
		});

		if (resposta.data.sucesso) {
			redirect(redirecione);
		} else {
			return resposta.data.mensagem;
		}
	} catch (error) {
		if (error instanceof z.ZodError) {
			const fieldErrors = error.flatten().fieldErrors;
			if (fieldErrors.role?.length) return fieldErrors.role[0];
			if (fieldErrors.email?.length) return fieldErrors.email[0];
			if (fieldErrors.password?.length) return fieldErrors.password[0];
			if (fieldErrors.name?.length) return fieldErrors.name[0];
			if (fieldErrors._?.length) return fieldErrors._[0];
			return "Os dados não foram validados corretamente";
		}

		if (axios.isAxiosError(error) && error.response) {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			console.error("Erro da API:", (error as any).response.data);
			return (
				error.response.data.mensagem || "Ocorreu um erro ao atualizar o usuário"
			);
		}

		console.error("Erro inesperado:", error);
		return "Ocorreu um erro inesperado ao atualizar o usuário";
	}
}
