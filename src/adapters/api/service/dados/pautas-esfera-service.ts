import { PrismaClient } from "@prisma/client";

import { DadosPautaEsfera } from "@/core/domain/dtos/dados.dto";

export interface IListarPautasPorEsferaService {
	executar(esfera?: string): Promise<DadosPautaEsfera[]>;
}

export class ListarPautasPorEsferaService
	implements IListarPautasPorEsferaService
{
	async executar(esfera?: string) {
		const prisma = new PrismaClient();
		try {
			const pautas = await prisma.pauta.findMany({
				select: { id: true, nome: true },
			});

			const resultado: DadosPautaEsfera[] = pautas.map((p) => ({
				pauta: p.nome,
				valor: 0,
			}));

			const projetos = await prisma.projeto.findMany({
				where: esfera
					? {
							esfera: { nome: { equals: esfera, mode: "insensitive" } },
						}
					: undefined,
				select: {
					id: true,
					pauta: { select: { nome: true } },
				},
			});

			const contagem: Record<string, number> = {};
			for (const projeto of projetos) {
				const pautaNome = projeto.pauta?.nome;
				if (pautaNome) {
					contagem[pautaNome] = (contagem[pautaNome] ?? 0) + 1;
				}
			}

			for (const r of resultado) {
				r.valor = contagem[r.pauta] ?? 0;
			}

			return resultado;
		} finally {
			await prisma.$disconnect();
		}
	}
}
