import { Role } from "@prisma/client";
import bcrypt from "bcryptjs";

import { User } from "@/core/domain/models/user";
import { EnviarEmailService } from "@/services/email/enviar-email-service";
import { TokenDeVerificacaoService } from "@/services/email/token-verificacao-service";
import { prismaClient } from "@/services/prisma/prisma";

export class AtualizarUserService {
	async executar({ user }: { user: User }) {
		const prisma = prismaClient;

		const dataToUpdate: {
			name?: string;
			email?: string;
			passwordHash?: string;
			role?: Role;
			emailVerified?: Date | null;
		} = {};

		const usuarioExistente = await prisma.user.findUnique({
			where: { id: user.id },
		});

		if (!usuarioExistente) {
			throw new Error("Usuário não encontrado para atualização.");
		}

		let emailMudou = false;

		if (
			user.name !== undefined &&
			user.name !== null &&
			user.name.trim() !== ""
		) {
			dataToUpdate.name = user.name;
		}

		if (
			user.email !== undefined &&
			user.email !== null &&
			user.email.trim() !== "" &&
			user.email !== usuarioExistente.email
		) {
			dataToUpdate.email = user.email;
			dataToUpdate.emailVerified = null;
			emailMudou = true;
		}

		if (
			user.passwordHash !== undefined &&
			user.passwordHash !== null &&
			user.passwordHash.trim() !== ""
		) {
			dataToUpdate.passwordHash = await bcrypt.hash(user.passwordHash, 10);
		}

		if (user.role !== undefined && user.role !== null) {
			dataToUpdate.role = user.role;
		}

		if (Object.keys(dataToUpdate).length === 0) {
			return usuarioExistente;
		}

		try {
			const updatedUser = await prisma.user.update({
				data: dataToUpdate,
				where: {
					id: user.id,
				},
			});

			if (emailMudou && updatedUser.email) {
				const tokenDeVerificacaoService = new TokenDeVerificacaoService();
				const token = await tokenDeVerificacaoService.gerarTokenDeVerificacao(
					updatedUser.id
				);

				const enviarEmailService = new EnviarEmailService();
				const verificationLink = `${process.env.PUBLIC_BASE_URL}/api/auth/verificar-email?token=${token.token}`;
				const emailHtml = `
                    <p>Olá ${updatedUser.name},</p>
                    <p>Seu endereço de e-mail foi alterado. Por favor, verifique seu novo e-mail clicando no link abaixo:</p>
                    <p><a href="${verificationLink}">Verificar meu novo e-mail</a></p>
                    <p>Este link é válido por 1 hora.</p>
                    <p>Se você não solicitou esta alteração, pode ignorar este e-mail.</p>
                `;
				await enviarEmailService.enviarEmailDeVerificacao({
					to: updatedUser.email,
					subject: "Verifique seu novo e-mail",
					html: emailHtml,
				});
			}

			return updatedUser;
		} catch (error) {
			console.error("Erro ao atualizar usuário no Prisma:", error);
			throw error;
		}
	}
}
