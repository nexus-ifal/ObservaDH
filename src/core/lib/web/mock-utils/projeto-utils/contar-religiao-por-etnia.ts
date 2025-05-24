import { ProjetoLei } from "@/domain/graficos/types/projeto-lei";

import { DadosGraficoBarraEmpilhadaVertical } from "@/domain/graficos/types/barra-empilhada-vertical";

function contarReligiaoPorEtnia(data: ProjetoLei[]) {
	const resultado: DadosGraficoBarraEmpilhadaVertical[] = [];

	const religioes: Record<
		string,
		{
			branco: number;
			preto: number;
			pardo: number;
			amarelo: number;
			indigena: number;
			indefinido: number;
		}
	> = {};

	data.forEach((item) => {
		item.parlamentares.forEach((parlamentar) => {
			const etnia = (parlamentar.raca?.toLowerCase() ||
				"indefinido") as keyof (typeof religioes)[string];
			const religiao = parlamentar.religiao || "Não identificado";

			if (!religioes[religiao]) {
				religioes[religiao] = {
					branco: 0,
					preto: 0,
					pardo: 0,
					amarelo: 0,
					indigena: 0,
					indefinido: 0,
				};
			}

			if (etnia in religioes[religiao]) {
				religioes[religiao][etnia]++;
			} else {
				religioes[religiao].indefinido++;
			}
		});
	});

	for (const [religiao, etnias] of Object.entries(religioes)) {
		resultado.push({
			religiao,
			...etnias,
		});
	}

	resultado.sort((a, b) => {
		if (a.religiao === "Não identificado") return 1;
		if (b.religiao === "Não identificado") return -1;
		return 0;
	});

	return resultado;
}

export default contarReligiaoPorEtnia;
