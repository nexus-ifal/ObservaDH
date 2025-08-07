import { useQuery } from "@tanstack/react-query";

import { listarProjetosDireitosIdeologiasOptions } from "../options/dados";

import { mapApiDataToChartData } from "@/utils/mapApiDataToChartData/mapApiDataToChartData";

export const useProjetosDireitosIdeologias = (pauta?: string) => {
	const {
		data: projetosDireitosIdeologias,
		isLoading: isLoadingProjetosDireitosIdeologias,
		error,
	} = useQuery(listarProjetosDireitosIdeologiasOptions({ pauta }));

	return {
		ideologias_valores: projetosDireitosIdeologias?.ideologias_valores,
		projetos_carrosel: projetosDireitosIdeologias?.projetos,
		direitos_violados_valores: mapApiDataToChartData(
			projetosDireitosIdeologias?.direitos_violados_valores || []
		),
		isLoading: isLoadingProjetosDireitosIdeologias,
		error,
	};
};
