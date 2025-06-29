import { PrismaClient } from "@prisma/client";

export interface IListarProjetosPorUFService {
	executar(esfera?: string): Promise<{ uf: string; valor: number }[]>;
}

export class ListarProjetosPorUFService implements IListarProjetosPorUFService {
	async executar(esfera?: string) {
		const prisma = new PrismaClient();
		try {
			const estados = await prisma.estado.findMany({
				select: { sigla: true },
			});

			const resultado: { uf: string; valor: number }[] = estados.map((e) => ({
				uf: e.sigla,
				valor: 0,
			}));

			const projetos = await prisma.projeto.findMany({
				where: esfera
					? {
							esfera: { nome: { equals: esfera, mode: "insensitive" } }, // ou id, conforme sua modelagem
						}
					: undefined,
				select: {
					id: true,
					autores: {
						select: {
							estado: { select: { sigla: true } },
						},
					},
				},
			});

			const projetosPorUF: Record<string, Set<string>> = {};
			for (const { uf } of resultado) {
				projetosPorUF[uf] = new Set<string>();
			}

			for (const projeto of projetos) {
				const ufsDoProjeto = new Set<string>();
				for (const autor of projeto.autores) {
					const uf = autor.estado?.sigla;
					if (uf) ufsDoProjeto.add(uf);
				}
				for (const uf of ufsDoProjeto) {
					projetosPorUF[uf]?.add(projeto.id);
				}
			}

			for (const r of resultado) {
				r.valor = projetosPorUF[r.uf].size;
			}

			return resultado;
		} finally {
			await prisma.$disconnect();
		}
	}
}
