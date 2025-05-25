import { prismaClient } from "@/services/prisma/prisma";

export class ListarUsersService {
	async executar() {
		const prisma = prismaClient;

		const resposta = await prisma.user.findMany();

		return resposta;
	}
}
