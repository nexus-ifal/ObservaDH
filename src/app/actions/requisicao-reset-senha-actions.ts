"use server";

import { v4 as uuidv4 } from "uuid";
import { z } from "zod";

import { prismaClient } from "@/adapters/db/prisma";
import { requisicaoResetSenhaSchema } from "@/schemas/user-zod-schema";
import { EnviarEmailService } from "@/services/email/enviar-email-service";

export async function RequisicaoDeRedefinicaoDeSenha(
	prevState: string | undefined,
	formData: FormData
) {
	const camposValidados = requisicaoResetSenhaSchema.safeParse({
		email: formData.get("email"),
	});

	if (!camposValidados.success) {
		const mensagensDeErro = Object.values(
			camposValidados.error.flatten().fieldErrors
		).flat();
		return mensagensDeErro.join(", ");
	}

	const { email } = camposValidados.data;

	try {
		const user = await prismaClient.user.findUnique({
			where: { email },
		});

		if (!user) {
			return "Se o e-mail estiver registrado, um link de redefinição será enviado.";
		}

		const token = uuidv4();
		const expires = new Date(Date.now() + 3600 * 1000);

		await prismaClient.resetSenhaToken.deleteMany({
			where: { email },
		});

		await prismaClient.resetSenhaToken.create({
			data: {
				email,
				token,
				expires,
			},
		});

		const enviarEmailService = new EnviarEmailService();
		const resetLink = `${process.env.PUBLIC_BASE_URL}/email-routes/redefinir-senha?token=${token}`;
		const emailHtml = `
            <p>Olá ${user.name},</p>
            <p>Você solicitou uma redefinição de senha.</p>
            <p>Por favor, clique no link abaixo para redefinir sua senha:</p>
            <p><a href="${resetLink}">Redefinir minha senha</a></p>
            <p>Este link é válido por 1 hora.</p>
            <p>Se você não solicitou isso, pode ignorar este e-mail.</p>
        `;

		await enviarEmailService.enviarEmailDeVerificacao({
			to: email,
			subject: "Redefinição de Senha",
			html: emailHtml,
		});

		return "Se o e-mail estiver registrado, um link de redefinição será enviado.";
	} catch (error) {
		if (error instanceof z.ZodError) {
			const mensagensDeErro = Object.values(error.flatten().fieldErrors).flat();
			return mensagensDeErro.join(", ");
		}
		console.error("Erro ao solicitar redefinição de senha:", error);
		return "Ocorreu um erro ao solicitar a redefinição de senha. Tente novamente mais tarde.";
	}
}
