"use server";

import axios from "axios";
import { redirect } from "next/navigation";

import { auth } from "../../../../auth";

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

	if (!session || !session.user) {
		return "Usuário não autenticado";
	}

	const name = formData.get("name");
	const password = formData.get("password");
	const redirecione = (formData.get("redirectTo") as string) || "/";

	const dados = {
		name,
		password,
	};
	try {
		const userApi = `${process.env.PUBLIC_BASE_URL}/api/user`;
		const dadosParaApi = {
			...dados,
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
		if (axios.isAxiosError(error) && error.response) {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			console.error("Erro da API:", (error as any).response.data);
			return (
				error.response.data.mensagem || "Ocorreu um erro ao deletar o usuário"
			);
		}

		console.error("Erro inesperado:", error);
		return "Ocorreu um erro inesperado ao deletar o usuário";
	}
}
