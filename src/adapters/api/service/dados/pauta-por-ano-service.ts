import { PrismaClient } from "@prisma/client";

import { DadosPautaPorAno } from "@/core/domain/dtos/dados.dto";

export interface IListarPautasPorAnoService {
	executar(): Promise<DadosPautaPorAno[]>;
}

export class ListarPautasPorAnoService implements IListarPautasPorAnoService {
	async executar() {
		const prisma = new PrismaClient();
		try {
			const resultados = await prisma.projeto.groupBy({
				by: ["ano", "pautaId"],
				_count: { id: true },
			});

			const pautas = await prisma.pauta.findMany({
				select: { id: true, nome: true },
			});

			const pautaMap = Object.fromEntries(pautas.map((p) => [p.id, p.nome]));

			const TITULOS = [
				"Atletas Trans",
				"Propaganda LGBT",
				"Linguagem Neutra",
				"Banheiros Multigênero",
			];

			const dados: DadosPautaPorAno[] = [];

			const agrupado = resultados.reduce(
				(acc, { ano, pautaId, _count }) => {
					const titulo = pautaMap[pautaId];
					if (!TITULOS.includes(titulo)) return acc;
					if (!acc[ano]) acc[ano] = {};
					acc[ano][titulo] = _count.id;
					return acc;
				},
				{} as Record<string, Record<string, number>>
			);

			for (const ano of Object.keys(agrupado)) {
				dados.push({
					ano,
					atletasTrans: agrupado[ano]["Atletas Trans"] || 0,
					propagandaLGBT: agrupado[ano]["Propaganda LGBT"] || 0,
					linguagensNeutra: agrupado[ano]["Linguagem Neutra"] || 0,
					banheirosMultigenero: agrupado[ano]["Banheiros Multigênero"] || 0,
				});
			}

			return dados;
		} finally {
			await prisma.$disconnect();
		}
	}
}
