import { PrismaClient } from "@prisma/client";

import { AnoDTO } from "@/core/domain/dtos/dados.dto";

export interface IListarAnosService {
	executar(): Promise<AnoDTO[]>;
}

export class ListarAnosService implements IListarAnosService {
	async executar() {
		const prisma = new PrismaClient();
		try {
			const anos = await prisma.projeto.findMany({
				select: {
					ano: true,
				},
				distinct: ["ano"],
				orderBy: {
					ano: "desc",
				},
			});

			return anos.map((projeto) => ({
				ano: projeto.ano,
			}));
		} finally {
			await prisma.$disconnect();
		}
	}
}
