import { ProjetoLei } from "@/core/domain/graficos/types/projeto-lei";

function obterEsferasUnicas({
	projetos,
}: {
	projetos: ProjetoLei[];
}): { titulo: string; value: string }[] {
	const esferas = projetos.map((projeto) => projeto.parlamentares[0].esfera);
	const esferasUnicas = Array.from(new Set(esferas));
	return esferasUnicas.map((esfera) => ({
		titulo: esfera,
		value: esfera.toLowerCase(),
	}));
}

export default obterEsferasUnicas;
