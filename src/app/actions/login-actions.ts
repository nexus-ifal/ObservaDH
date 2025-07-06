"use server";

import { redirect } from "next/navigation";
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
	const redirectTo =
		(formData.get("redirectTo") as string) || "/user-routes/home";

	try {
		await signIn("credentials", {
			email,
			password,
			redirect: false,
		});

		redirect(redirectTo);
	} catch (error) {
		if (error instanceof Error && error.message.includes("NEXT_REDIRECT")) {
			throw error;
		}

		if (error instanceof AuthError) {
			switch (error.type) {
				case "CredentialsSignin":
					console.error("Erro de credenciais inválidas:", error);
					return "Credenciais inválidas ou e-mail não verificado.";
				case "CallbackRouteError":
					if (
						error.cause?.err?.message.includes(
							"e-mail ainda não foi verificado"
						)
					) {
						return "Seu e-mail ainda não foi verificado. Por favor, verifique sua caixa de entrada.";
					}
					console.error("Erro no callback do Auth.js:", error);
					return "Ocorreu um erro desconhecido durante o login. Tente novamente.";
				default:
					console.error("Ocorreu um erro de autenticação desconhecido:", error);
					return "Ocorreu um erro desconhecido durante o login.";
			}
		}
		if (error instanceof ZodError) {
			const mensagensDeErro = Object.values(error.flatten().fieldErrors).flat();
			return mensagensDeErro.join(", ");
		}
		console.error("Erro no login: ", error);
		return "Falha ao fazer login. Tente novamente mais tarde";
	}
}
