import { prismaClient } from "@/adapters/db/prisma";

export interface DadosParlamentarProjetosEsfera {
	esfera: string;
	parlamentares: number;
	projetosLei: number;
}

export interface IListarParlamentaresPorEsferaService {
	executar(esfera?: string): Promise<DadosParlamentarProjetosEsfera>;
}

export class ListarParlamentaresPorEsferaService
	implements IListarParlamentaresPorEsferaService
{
	async executar(esfera?: string) {
		const prisma = prismaClient;
		try {
			if (esfera) {
				const [parlamentaresCount, projetosLeiCount] = await Promise.all([
					prisma.politico.count({
						where: {
							esfera: {
								nome: { equals: esfera, mode: "insensitive" },
							},
						},
					}),
					prisma.projeto.count({
						where: {
							esfera: {
								nome: { equals: esfera, mode: "insensitive" },
							},
						},
					}),
				]);
				return {
					esfera,
					parlamentares: parlamentaresCount,
					projetosLei: projetosLeiCount,
				};
			} else {
				const [parlamentaresCount, projetosLeiCount] = await Promise.all([
					prisma.politico.count(),
					prisma.projeto.count(),
				]);
				return {
					esfera: "nacional",
					parlamentares: parlamentaresCount,
					projetosLei: projetosLeiCount,
				};
			}
		} catch (error) {
			throw new Error(
				`Erro ao listar parlamentares por esfera: ${error instanceof Error ? error.message : String(error)}`
			);
		}
	}
}
