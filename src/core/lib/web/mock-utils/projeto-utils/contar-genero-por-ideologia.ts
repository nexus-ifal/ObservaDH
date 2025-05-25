import { DadosGraficoBarrasMultiplas } from "@/core/domain/graficos/types/barras-multiplas";
import { ProjetoLei } from "@/core/domain/graficos/types/projeto-lei";

function contarGeneroPorIdeologia(data: ProjetoLei[]) {
	const resultado: DadosGraficoBarrasMultiplas[] = [];

	const ideologiasFixas = [
		"Extrema Direita",
		"Direita",
		"Centro Direita",
		"Centro",
		"Centro Esquerda",
		"Esquerda",
		"Esquerda Radical",
	];

	const generoPorIdeologia: Record<
		string,
		{ homens: number; mulheres: number }
	> = ideologiasFixas.reduce(
		(acc, ideologia) => {
			acc[ideologia] = { homens: 0, mulheres: 0 };
			return acc;
		},
		{} as Record<string, { homens: number; mulheres: number }>
	);

	data.forEach((item) => {
		item.parlamentares.forEach((parlamentar) => {
			const ideologia = parlamentar.ideologia || "Desconhecida";
			const genero = parlamentar.genero || "Desconhecido";

			const ideologiaFinal = ideologiasFixas.includes(ideologia)
				? ideologia
				: "Desconhecida";

			if (genero === "Masculino") {
				generoPorIdeologia[ideologiaFinal].homens++;
			} else if (genero === "Feminino") {
				generoPorIdeologia[ideologiaFinal].mulheres++;
			}
		});
	});

	for (const [ideologia, { homens, mulheres }] of Object.entries(
		generoPorIdeologia
	)) {
		resultado.push({ ideologia, homens, mulheres });
	}

	return resultado;
}

export default contarGeneroPorIdeologia;
