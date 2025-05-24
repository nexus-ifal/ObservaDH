import { ProjetoLei } from "@/core/domain/graficos/types/projeto-lei";

function obterIdeologiasUnica({
	projetos,
}: {
	projetos: ProjetoLei[];
}): { titulo: string; value: string }[] {
	const ideologias = projetos.flatMap((projeto) =>
		projeto.parlamentares.map((parlamentar) => parlamentar.ideologia)
	);
	const ideologiasUnicas = Array.from(new Set(ideologias));
	return ideologiasUnicas.map((ideologia) => ({
		titulo: ideologia,
		value: ideologia.toLowerCase(),
	}));
}

export default obterIdeologiasUnica;
