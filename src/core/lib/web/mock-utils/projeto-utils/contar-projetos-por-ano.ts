import { ProjetoLei } from "@/domain/graficos/types/projeto-lei";

function contarProjetosPorAno({ data }: { data: ProjetoLei[] }) {
	const anosContagem: Record<string, number> = {};

	data.forEach((item) => {
		anosContagem[item.ano] = (anosContagem[item.ano] || 0) + 1;
	});

	return Object.entries(anosContagem).map(([ano, projetos]) => ({
		ano,
		projetos,
	}));
}

export default contarProjetosPorAno;
