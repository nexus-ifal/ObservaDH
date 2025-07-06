import { prismaClient } from "@/adapters/db/prisma";

export interface DadosParlamentarEsfera {
	esfera: string;
	valor: number;
}

export interface IListarParlamentaresPorEsferaService {
	executar(esfera?: string): Promise<DadosParlamentarEsfera>;
}

export class ListarParlamentaresPorEsferaService
	implements IListarParlamentaresPorEsferaService
{
	async executar(esfera?: string) {
		const prisma = prismaClient;
		try {
			if (esfera) {
				const count = await prisma.politico.count({
					where: {
						esfera: {
							nome: { equals: esfera, mode: "insensitive" },
						},
					},
				});
				return { esfera, valor: count };
			} else {
				const count = await prisma.politico.count();
				return { esfera: "nacional", valor: count };
			}
		} catch (error) {
			throw new Error(
				`Erro ao listar parlamentares por esfera: ${error instanceof Error ? error.message : String(error)}`
			);
		}
	}
}
