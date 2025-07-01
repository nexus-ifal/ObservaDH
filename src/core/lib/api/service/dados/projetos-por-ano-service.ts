import { PrismaClient } from "@prisma/client";

import { DadosPlPorAno } from "@/core/domain/dtos/dados.dto";

export interface IListarProjetoPorAnoService {
	executar(): Promise<DadosPlPorAno[]>;
}

export class ListarProjetoPorAnoService implements IListarProjetoPorAnoService {
	async executar() {
		const prisma = new PrismaClient();
		try {
			const projetosPorAno = await prisma.projeto.groupBy({
				by: ["ano"],
				_count: {
					id: true,
				},
				orderBy: {
					ano: "asc",
				},
			});
			return projetosPorAno.map(
				(item: { ano: string; _count: { id: number } }) => ({
					ano: item.ano,
					projetos: item._count.id,
				})
			);
		} finally {
			await prisma.$disconnect();
		}
	}
}
