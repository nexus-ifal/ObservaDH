import { ProjetoLei } from "@/domain/graficos/types/projeto-lei";

function obterPartidosUnicos({
	projetos,
}: {
	projetos: ProjetoLei[];
}): { titulo: string; value: string }[] {
	const partidos = projetos.flatMap((projeto) =>
		projeto.parlamentares.map((parlamentar) => parlamentar.partido)
	);
	const partidosUnicos = Array.from(new Set(partidos));
	return partidosUnicos.map((partido) => ({
		titulo: partido,
		value: partido.toLowerCase(),
	}));
}

export default obterPartidosUnicos;
