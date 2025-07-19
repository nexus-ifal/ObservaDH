import { PrismaClient } from "@prisma/client";

import { ProjetoDTO } from "@/core/domain/dtos/dados.dto";

export interface IFiltrarProjetosService {
	executar(
		esferaId?: string,
		ano?: string,
		estadoId?: string,
		pautaId?: string
	): Promise<ProjetoDTO[]>;
}

export class FiltrarProjetosService implements IFiltrarProjetosService {
	async executar(
		esferaId?: string,
		ano?: string,
		estadoId?: string,
		pautaId?: string
	) {
		const prisma = new PrismaClient();
		try {
			const projetos = await prisma.projeto.findMany({
				where: {
					...(esferaId && { esferaId }),
					...(ano && { ano }),
					...(pautaId && { pautaId }),
					...(estadoId && {
						autores: {
							some: {
								estadoId,
							},
						},
					}),
				},
				select: {
					id: true,
					ano: true,
					numeroPl: true,
					ementa: true,
					pauta: {
						select: {
							nome: true,
						},
					},
					autores: {
						select: {
							nome: true,
							estado: {
								select: {
									nome: true,
								},
							},
						},
					},
				},
			});

			const resultado: ProjetoDTO[] = projetos.map((projeto) => ({
				id: projeto.id,
				ano: projeto.ano,
				numeroPl: projeto.numeroPl,
				pauta: projeto.pauta.nome,
				estado: Array.from(
					new Set(projeto.autores.map((autor) => autor.estado.nome))
				),
				parlamentar: projeto.autores.map((autor) => autor.nome),
				ementa: projeto.ementa,
			}));

			return resultado;
		} finally {
			await prisma.$disconnect();
		}
	}
}