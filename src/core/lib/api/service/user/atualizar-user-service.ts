import bcrypt from "bcryptjs";

import { User } from "@/core/domain/models/user";
import { prismaClient } from "@/services/prisma/prisma";

export class AtualizarUserService {
	async executar({ user }: { user: User }) {
		const prisma = prismaClient;
		const passwordHash = await bcrypt.hash(user.passwordHash, 10);
		const resposta = prisma.user.update({
			data: {
				name: user.name,
				email: user.email,
				passwordHash: passwordHash,
			},
			where: {
				id: user.id,
			},
		});

		return resposta;
	}
}
