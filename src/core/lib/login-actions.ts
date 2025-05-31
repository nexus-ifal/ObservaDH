"use server";

import { AuthError } from "next-auth";
import { ZodError } from "zod";

import { signIn } from "../../../auth";

import { userLoginSchema } from "@/schemas/user-zod-schema";

export async function authenticate(
	prevState: string | undefined,
	formData: FormData
) {
	const camposValidados = userLoginSchema.safeParse({
		email: formData.get("email"),
		password: formData.get("password"),
	});

	if (!camposValidados.success) {
		const mensagensDeErro = Object.values(
			camposValidados.error.flatten().fieldErrors
		).flat();
		return mensagensDeErro.join(", ");
	}

	const { email, password } = camposValidados.data;
	const redirectTo = (formData.get("redirectTo") as string) || "/"; //TODO: adicionar rota certa

	try {
		await signIn("credentials", {
			email,
			password,
			redirectTo,
		});
	} catch (error) {
		if (error instanceof Error && error.message.includes("NEXT_REDIRECT")) {
			throw error;
		}

		if (error instanceof AuthError) {
			switch (error.type) {
				case "CredentialsSignin":
					return "Credenciais inválidas";
				default:
					return "Ocorreu um erro desconhecido durante o login";
			}
		}
		if (error instanceof ZodError) {
			const mensagensDeErro = Object.values(error.flatten().fieldErrors).flat();
			return mensagensDeErro.join(", ");
		}
		console.error("Erro no login: ", error);
		return "Falha ao fazer login. Tente novamente mais tarde.";
	}
}
