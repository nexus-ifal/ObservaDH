"use server";

import axios from "axios";
import { z } from "zod";

import { auth } from "../../../../auth";

import { criarUserSchema } from "@/schemas/user-zod-schema";

interface ApiResponse {
	sucesso: boolean;
	mensagem: string;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	dados?: any;
	emailSent?: boolean;
}

interface RegisterUserResponse {
	message?: string;
	emailSent?: boolean;
}

export async function registerUser(
	prevState: RegisterUserResponse | undefined,
	formData: FormData
): Promise<RegisterUserResponse> {
	const session = await auth();

	if (!session || !session.user) {
		return { message: "Usuário não autenticado" };
	}

	const name = formData.get("name");
	const email = formData.get("email");
	const password = formData.get("password");
	const role = formData.get("role");

	try {
		const camposValidados = criarUserSchema.parse({
			name,
			email,
			password,
			role,
		});

		const userApi = `${process.env.PUBLIC_BASE_URL}/api/user`;
		const dadosParaApi = {
			...camposValidados,
			roleUserDaSession: session.user.role,
		};

		const resposta = await axios.post<ApiResponse>(userApi, dadosParaApi, {
			withCredentials: true,
		});

		if (resposta.data.sucesso) {
			return { message: "Usuário criado com sucesso.", emailSent: true };
		} else {
			return { message: resposta.data.mensagem };
		}
	} catch (error) {
		if (error instanceof Error && error.message.includes("NEXT_REDIRECT")) {
			throw error;
		}

		if (error instanceof z.ZodError) {
			const fieldErrors = error.flatten().fieldErrors;
			if (fieldErrors.role) return { message: fieldErrors.role[0] };
			if (fieldErrors.email) return { message: fieldErrors.email[0] };
			if (fieldErrors.password) return { message: fieldErrors.password[0] };
			if (fieldErrors.name) return { message: fieldErrors.name[0] };
			return { message: "Os dados não foram validados corretamente" };
		}

		if (axios.isAxiosError(error) && error.response) {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			console.error("Erro da API:", (error as any).response.data);
			return {
				message:
					error.response.data.mensagem || "Ocorreu um erro ao criar o usuário",
			};
		}

		console.error("Erro inesperado:", error);
		return { message: "Ocorreu um erro inesperado ao criar o usuário" };
	}
}
