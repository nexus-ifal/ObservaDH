import { useQuery } from "@tanstack/react-query";

import { listarProjetosDireitosIdeologiasOptions } from "../options/dados";

// Importe AMBAS as funções de mapeamento
import {
	mapApiDataToChartData,
	mapIdeologiasToChartData,
} from "@/utils/mapApiDataToChartData/mapApiDataToChartData";

export const useProjetosDireitosIdeologias = (pauta?: string) => {
	const {
		data: projetosDireitosIdeologias,
		isLoading: isLoadingProjetosDireitosIdeologias,
		error,
	} = useQuery(listarProjetosDireitosIdeologiasOptions({ pauta }));

	// Mapeie os dados de ideologias aqui
	const ideologias_valores = mapIdeologiasToChartData(
		projetosDireitosIdeologias?.ideologias_valores || []
	);

	// Mapeie os dados de direitos violados (como já estava)
	const direitos_violados_valores = mapApiDataToChartData(
		projetosDireitosIdeologias?.direitos_violados_valores || []
	);

	// Dados do carrossel não precisam de mapeamento
	const projetos_carrosel = projetosDireitosIdeologias?.projetos || [];

	return {
		ideologias_valores, // Retorna os dados já mapeados
		projetos_carrosel,
		direitos_violados_valores, // Retorna os dados já mapeados
		isLoading: isLoadingProjetosDireitosIdeologias,
		error,
	};
};