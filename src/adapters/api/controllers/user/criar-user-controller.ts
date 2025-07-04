import { Role } from "@prisma/client";

import { CriarUserService } from "../../service/user/criar-user-service";

import { RespostaApi } from "@/core/domain/models/resposta-api";
import { User } from "@/core/domain/models/user";

export class CriarUserController {
	async executar({
		name,
		email,
		passwordHash,
		role,
	}: {
		name: string;
		email: string;
		passwordHash: string;
		role: string;
	}) {
		if (!name || !email || !passwordHash || !role) {
			return new RespostaApi({
				sucesso: false,
				mensagem: "Falta informação para a criação do usuário",
			});
		}
		const user = new User({
			name: name,
			email: email,
			passwordHash: passwordHash,
			role: role as Role,
		});

		const service = new CriarUserService();

		try {
			const resposta = await service.executar({ user: user });
			return new RespostaApi({
				sucesso: true,
				mensagem: "Usuário criado com sucesso e e-mail de verificação enviado.",
				dados: resposta,
				emailVerificationSent: true,
			});
		} catch (error) {
			console.error("Erro no controller de criação de usuário:", error);
			return new RespostaApi({
				sucesso: false,
				mensagem: "Houve algum problema na criação do usuário",
			});
		}
	}
}
