import { FiltrosProjetosDTO } from "@/core/domain/dtos/projeto.dto";
import { prismaClient } from "@/services/prisma/prisma";

export interface IListarProjetosService {
	executar(
		filtros: FiltrosProjetosDTO
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	): Promise<{ dados: any[]; total: number }>;
}

export class ListarProjetosService implements IListarProjetosService {
	async executar({ esfera, ano, estado, pauta }: FiltrosProjetosDTO) {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const where: any = {};

		if (ano) where.ano = ano;
		if (pauta)
			where.pauta = { is: { nome: { equals: pauta, mode: "insensitive" } } };
		if (esfera)
			where.esfera = { is: { nome: { equals: esfera, mode: "insensitive" } } };
		if (estado)
			where.autores = {
				some: { estado: { sigla: { equals: estado, mode: "insensitive" } } },
			};

		const [dados, total] = await Promise.all([
			prismaClient.projeto.findMany({
				where,
				include: {
					esfera: true,
					partidos: true,
					autores: { include: { estado: true } },
					pauta: true,
				},
			}),
			prismaClient.projeto.count({ where }),
		]);

		return { dados, total };
	}
}
