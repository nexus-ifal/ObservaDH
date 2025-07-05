import { Role } from "@prisma/client";

import { AtualizarUserService } from "../../service/user/atualizar-user-service";

import { prismaClient } from "@/adapters/db/prisma";
import { RespostaApi } from "@/core/domain/models/resposta-api";
import { User } from "@/core/domain/models/user";

export class AtualizarUserController {
	async executar({
		id,
		name,
		email,
		passwordHash,
		role,
	}: {
		id: string;
		name?: string;
		email?: string;
		passwordHash?: string;
		role?: string;
	}) {
		if (!id || (!name && !email && !passwordHash && !role)) {
			const respostaApi = new RespostaApi({
				sucesso: false,
				mensagem: "Pelo menos um campo deve ser fornecido para atualização",
			});

			return respostaApi;
		}

		const service = new AtualizarUserService();

		const user = new User({
			id: id,
			name: name,
			email: email,
			passwordHash: passwordHash,
			role: role ? (role as Role) : undefined,
		});

		try {
			const resposta = await service.executar({ user: user });
			let emailVerificationSent = false;
			if (email && resposta && resposta.email === email) {
				const existingUser = await prismaClient.user.findUnique({
					where: { id: user.id },
				});
				if (existingUser && existingUser.email !== email) {
					emailVerificationSent = true;
				}
			}

			return new RespostaApi({
				sucesso: true,
				mensagem: "Usuário atualizado com sucesso",
				dados: resposta,
				emailVerificationSent: emailVerificationSent,
			});
		} catch (error) {
			console.error("Erro no controller de atualização de usuário:", error);
			return new RespostaApi({
				sucesso: false,
				mensagem: "Houve algum problema na atualização do usuário",
			});
		}
	}
}
