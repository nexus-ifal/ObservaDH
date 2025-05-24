import { ProjetoLei } from "@/core/domain/graficos/types/projeto-lei";

function contarPautasPorAno(data: ProjetoLei[]) {
	const pautasPorAno: Record<string, Record<string, number>> = {};

	data.forEach((item) => {
		if (!pautasPorAno[item.ano]) {
			pautasPorAno[item.ano] = {};
		}
		if (!pautasPorAno[item.ano][item.pauta]) {
			pautasPorAno[item.ano][item.pauta] = 0;
		}
		pautasPorAno[item.ano][item.pauta]++;
	});

	return Object.entries(pautasPorAno).map(([ano, pautas]) => ({
		ano: ano,
		linguagensNeutra: pautas["Linguagem Neutra"] || 0,
		atletasTrans: pautas["Atletas Trans"] || 0,
		banheirosMultigenero: pautas["Banheiros Multigênero"] || 0,
		propagandaLGBT: pautas["Propaganda LGBT"] || 0,
	}));
}

export default contarPautasPorAno;
