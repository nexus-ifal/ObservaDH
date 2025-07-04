import { Role } from "@prisma/client";
import bcrypt from "bcryptjs";

import { prismaClient } from "@/adapters/db/prisma";
import { User } from "@/core/domain/models/user";
import { EnviarEmailService } from "@/services/email/enviar-email-service";
import { TokenDeVerificacaoService } from "@/services/email/token-verificacao-service";

export class CriarUserService {
	async executar({ user }: { user: User }) {
		const prisma = prismaClient;

		if (!user.email || !user.passwordHash || !user.name || !user.role) {
			throw new Error("Dados incompletos para a criação do usuário");
		}

		const passwordHash = await bcrypt.hash(user.passwordHash, 10);

		try {
			const resposta = await prisma.user.create({
				data: {
					name: user.name,
					email: user.email,
					passwordHash: passwordHash,
					role: user.role as Role,
					emailVerified: null,
				},
			});

			const tokenDeVerificacaoService = new TokenDeVerificacaoService();
			const token = await tokenDeVerificacaoService.gerarTokenDeVerificacao(
				resposta.id
			);

			const enviarEmailService = new EnviarEmailService();
			const verificationLink = `${process.env.PUBLIC_BASE_URL}/api/auth/verificar-email?token=${token.token}`;
			const emailHtml = `
                <p>Olá ${resposta.name},</p>
                <p>Por favor, verifique seu e-mail clicando no link abaixo:</p>
                <p><a href="${verificationLink}">Verificar meu e-mail</a></p>
                <p>Este link é válido por 1 hora.</p>
                <p>Se você não solicitou isso, pode ignorar este e-mail.</p>
            `;
			await enviarEmailService.enviarEmailDeVerificacao({
				to: resposta.email,
				subject: "Verifique seu e-mail",
				html: emailHtml,
			});

			return resposta;
		} catch (error) {
			console.error("Erro ao criar usuário no Prisma:", error);
			throw error;
		}
	}
}
