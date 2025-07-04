import { PrismaClient } from "@prisma/client";

function normalizarIdeologia(string: string): string {
	return string
		.normalize("NFD")
		.replace(/[\u0300-\u036f]/g, "")
		.trim()
		.toLowerCase();
}

export interface IListarIdeologiaGeneroService {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	executar(): Promise<{ dados: any[]; total: number }>;
}

export class ListarIdeologiaGeneroService
	implements IListarIdeologiaGeneroService
{
	async executar() {
		const prisma = new PrismaClient();
		try {
			const politicos = await prisma.politico.findMany({
				select: {
					ideologia: true,
					genero: true,
				},
			});

			const ideologiasFixas = [
				"Extrema-Direita",
				"Direita",
				"Centro-Direita",
				"Centro",
				"Centro-Esquerda",
				"Esquerda",
				"Esquerda-Radical",
			];

			const mapaIdeologias: Record<string, string> = {};
			for (const ideologia of ideologiasFixas) {
				mapaIdeologias[normalizarIdeologia(ideologia)] = ideologia;
			}

			const agrupamento: Record<
				string,
				{ homens: number; mulheres: number; ideologia: string }
			> = {};
			for (const ideologia of ideologiasFixas) {
				agrupamento[ideologia] = { homens: 0, mulheres: 0, ideologia };
			}
			agrupamento["Desconhecida"] = {
				homens: 0,
				mulheres: 0,
				ideologia: "Desconhecida",
			};

			for (const politico of politicos) {
				const ideologiaBruta = politico.ideologia || "Desconhecida";
				const ideologiaNormalizada = normalizarIdeologia(ideologiaBruta);

				const ideologiaFinal =
					mapaIdeologias[ideologiaNormalizada] || "Desconhecida";
				const genero = politico.genero || "Desconhecido";

				if (genero === "Masculino") {
					agrupamento[ideologiaFinal].homens += 1;
				} else if (genero === "Feminino") {
					agrupamento[ideologiaFinal].mulheres += 1;
				}
			}
			const dados = Object.values(agrupamento).map((item) => ({
				...item,
				ideologia: item.ideologia.replace(/-/g, " "),
			}));
			const total = dados.length;

			return { dados, total };
		} finally {
			await prisma.$disconnect();
		}
	}
}
