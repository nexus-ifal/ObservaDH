import { prismaClient } from "@/services/prisma/prisma";

export class DeletarUserService {
	async executar({ id }: { id: string }) {
		const prisma = prismaClient;

		const resposta = prisma.user.delete({
			where: {
				id: id,
			},
		});

		return resposta;
	}
}
