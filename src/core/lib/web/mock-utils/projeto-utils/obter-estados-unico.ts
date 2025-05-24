import { ProjetoLei } from "@/domain/graficos/types/projeto-lei";

function obterEstadosUnicos({
	projetos,
}: {
	projetos: ProjetoLei[];
}): { titulo: string; value: string }[] {
	const estados = projetos.map((projeto) => projeto.parlamentares[0].estado);
	const estadosUnicos = Array.from(new Set(estados));
	return estadosUnicos.map((estado) => ({
		titulo: estado,
		value: estado.toLowerCase(),
	}));
}

export default obterEstadosUnicos;
