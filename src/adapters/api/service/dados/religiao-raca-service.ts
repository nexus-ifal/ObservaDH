import { PrismaClient } from "@prisma/client";

function normalizarRaca(raca: string): string {
	return raca
		?.normalize("NFD")
		.replace(/[\u0300-\u036f]/g, "")
		.trim()
		.toLowerCase();
}

export interface IListarReligiaoRacaService {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	executar(): Promise<{ dados: any[]; total: number }>;
}

export class ListarReligiaoRacaService implements IListarReligiaoRacaService {
	async executar() {
		const prisma = new PrismaClient();
		try {
			const politicos = await prisma.politico.findMany({
				select: {
					religiao: true,
					raca: true,
				},
			});

			const racasFixas = ["pardo", "preto", "branco", "amarelo", "indigena"];
			const mapaRacas: Record<string, string> = {};
			for (const raca of racasFixas) {
				mapaRacas[normalizarRaca(raca)] = raca;
			}

			type RacaKey =
				| "pardo"
				| "preto"
				| "branco"
				| "amarelo"
				| "indigena"
				| "indefinido";
			const agrupamento: Record<
				string,
				{
					religiao: string;
					pardo: number;
					preto: number;
					branco: number;
					amarelo: number;
					indigena: number;
					indefinido: number;
				}
			> = {};

			for (const politico of politicos) {
				const religiao = politico.religiao || "Desconhecida";
				const racaBruta = politico.raca || "indefinido";
				const racaNormalizada = normalizarRaca(racaBruta);

				if (!agrupamento[religiao]) {
					agrupamento[religiao] = {
						religiao,
						pardo: 0,
						preto: 0,
						branco: 0,
						amarelo: 0,
						indigena: 0,
						indefinido: 0,
					};
				}
				const chaveRaca = (mapaRacas[racaNormalizada] ||
					"indefinido") as RacaKey;
				agrupamento[religiao][chaveRaca] += 1;
			}

			const dados = Object.values(agrupamento);
			const total = dados.length;

			return { dados, total };
		} finally {
			await prisma.$disconnect();
		}
	}
}
