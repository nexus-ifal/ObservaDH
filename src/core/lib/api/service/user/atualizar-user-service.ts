import { Role } from "@prisma/client";
import bcrypt from "bcryptjs";

import { User } from "@/core/domain/models/user";
import { prismaClient } from "@/services/prisma/prisma";

export class AtualizarUserService {
	async executar({ user }: { user: User }) {
		const prisma = prismaClient;
		const passwordHash = await bcrypt.hash(user.passwordHash, 10);
		const Upperrole = user.role.toUpperCase();
		const resposta = prisma.user.update({
			data: {
				name: user.name,
				email: user.email,
				passwordHash: passwordHash,
				role: Upperrole as Role,
			},
			where: {
				id: user.id,
			},
		});

		return resposta;
	}
}
