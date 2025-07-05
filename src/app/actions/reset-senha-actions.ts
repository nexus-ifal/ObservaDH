"use server";

import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { z } from "zod";

import { prismaClient } from "@/adapters/db/prisma";
import { resetSenhaSchema } from "@/schemas/user-zod-schema";

export async function ResetSenha(
	prevState: string | undefined,
	formData: FormData
) {
	const camposValidados = resetSenhaSchema.safeParse({
		token: formData.get("token"),
		password: formData.get("password"),
	});

	if (!camposValidados.success) {
		const mensagensDeErro = Object.values(
			camposValidados.error.flatten().fieldErrors
		).flat();
		return mensagensDeErro.join(", ");
	}

	const { token, password } = camposValidados.data;

	try {
		const resetToken = await prismaClient.resetSenhaToken.findUnique({
			where: { token },
		});

		if (!resetToken) {
			return "Token inválido ou expirado.";
		}

		if (resetToken.expires < new Date()) {
			await prismaClient.resetSenhaToken.delete({
				where: { id: resetToken.id },
			});
			return "Token expirado. Por favor, solicite um novo link de redefinição.";
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		await prismaClient.user.update({
			where: { email: resetToken.email },
			data: { passwordHash: hashedPassword },
		});

		await prismaClient.resetSenhaToken.delete({
			where: { id: resetToken.id },
		});

		redirect("/login");
	} catch (error) {
		if (error instanceof z.ZodError) {
			const mensagensDeErro = Object.values(error.flatten().fieldErrors).flat();
			return mensagensDeErro.join(", ");
		}
		if (error instanceof Error && error.message.includes("NEXT_REDIRECT")) {
			throw error;
		}
		console.error("Erro ao redefinir senha:", error);
		return "Ocorreu um erro ao redefinir a senha. Tente novamente mais tarde.";
	}
}
