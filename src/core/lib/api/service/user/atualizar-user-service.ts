import { Role } from "@prisma/client";
import bcrypt from "bcryptjs";

import { User } from "@/core/domain/models/user";
import { prismaClient } from "@/services/prisma/prisma";

export class AtualizarUserService {
	async executar({ user }: { user: User }) {
		const prisma = prismaClient;

		const dataToUpdate: {
			name?: string;
			email?: string;
			passwordHash?: string;
			role?: Role;
		} = {};

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
			user.email.trim() !== ""
		) {
			dataToUpdate.email = user.email;
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
			const existingUser = await prisma.user.findUnique({
				where: { id: user.id },
			});
			return existingUser;
		}

		try {
			const resposta = await prisma.user.update({
				data: dataToUpdate,
				where: {
					id: user.id,
				},
			});
			return resposta;
		} catch (error) {
			console.error("Erro ao atualizar usuário no Prisma:", error);
			throw error;
		}
	}
}
