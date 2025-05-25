import { prismaClient } from "@/services/prisma/prisma";

export class BuscarUserService {
	async buscarPorID({ id }: { id: string }) {
		const prisma = prismaClient;

		const resposta = await prisma.user.findUnique({
			where: {
				id: id,
			},
		});
		return resposta;
	}

	async buscarPorNome({ name }: { name: string }) {
		const prisma = prismaClient;

		const resposta = await prisma.user.findUnique({
			where: {
				name: name,
			},
		});
		return resposta;
	}
}
