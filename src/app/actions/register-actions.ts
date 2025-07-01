"use server";

import axios from "axios";
import { redirect } from "next/navigation";
import { z } from "zod";

import { auth } from "../../../auth";

import { criarUserSchema } from "@/schemas/user-zod-schema";

interface ApiResponse {
	sucesso: boolean;
	mensagem: string;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	dados?: any;
}

export async function registerUser(
	prevState: string | undefined,
	formData: FormData
): Promise<string | undefined> {
	const session = await auth();

	if (!session || !session.user) {
		return "Usuário não autenticado";
	}

	const name = formData.get("name");
	const email = formData.get("email");
	const password = formData.get("password");
	const role = formData.get("role");
	const redirecione = (formData.get("redirectTo") as string) || "/";

	const camposValidados = criarUserSchema.parse({
		name,
		email,
		password,
		role,
	});
	try {
		const userApi = `${process.env.PUBLIC_BASE_URL}/api/user`;
		const dadosParaApi = {
			...camposValidados,
			roleUserDaSession: session.user.role,
		};

		const resposta = await axios.post<ApiResponse>(userApi, dadosParaApi, {
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
			if (fieldErrors.role) return fieldErrors.role[0];
			if (fieldErrors.email) return fieldErrors.email[0];
			if (fieldErrors.password) return fieldErrors.password[0];
			if (fieldErrors.name) return fieldErrors.name[0];
			return "Os dados não foram validados corretamente";
		}

		if (axios.isAxiosError(error) && error.response) {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			console.error("Erro da API:", (error as any).response.data);
			return (
				error.response.data.mensagem || "Ocorreu um erro ao criar o usuário"
			);
		}

		console.error("Erro inesperado:", error);
		return "Ocorreu um erro inesperado ao criar o usuário";
	}
}
