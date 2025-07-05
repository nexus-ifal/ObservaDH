import { v4 as uuidv4 } from "uuid";

import { prismaClient } from "@/adapters/db/prisma";

export class TokenDeVerificacaoService {
	async gerarTokenDeVerificacao(userId: string) {
		const token = uuidv4();
		const expires = new Date(Date.now() + 3600 * 1000);

		await prismaClient.verificationToken.deleteMany({
			where: { userId },
		});

		const verificationToken = await prismaClient.verificationToken.create({
			data: {
				userId,
				token,
				expires,
			},
		});
		return verificationToken;
	}

	async verificarEmail(token: string) {
		const verificationToken = await prismaClient.verificationToken.findUnique({
			where: { token },
			include: { user: true },
		});

		if (!verificationToken) {
			return { sucesso: false, mensagem: "Token inválido ou expirado." };
		}

		if (verificationToken.expires < new Date()) {
			await prismaClient.verificationToken.delete({
				where: { id: verificationToken.id },
			});
			return {
				sucesso: false,
				mensagem:
					"Token expirado. Por favor, solicite um novo e-mail de verificação.",
			};
		}

		await prismaClient.user.update({
			where: { id: verificationToken.userId },
			data: { emailVerified: new Date() },
		});

		await prismaClient.verificationToken.delete({
			where: { id: verificationToken.id },
		});

		return { sucesso: true, mensagem: "Email verificado com sucesso!" };
	}
}
