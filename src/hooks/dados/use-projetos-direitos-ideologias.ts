import { useQuery } from "@tanstack/react-query";

import { listarProjetosDireitosIdeologiasOptions } from "../options/dados";

import { mapApiDataToChartData } from "@/utils/mapApiDataToChartData/mapApiDataToChartData";

export const useProjetosDireitosIdeologias = (pauta?: string) => {
	const {
		data: projetosDireitosIdeologias,
		isLoading: isLoadingProjetosDireitosIdeologias,
		error,
	} = useQuery(listarProjetosDireitosIdeologiasOptions({ pauta }));

	const ideologias_valores =
		projetosDireitosIdeologias?.ideologias_valores || [];
	const projetos_carrosel = projetosDireitosIdeologias?.projetos || [];
	const direitos_violados_valores = mapApiDataToChartData(
		projetosDireitosIdeologias?.direitos_violados_valores || []
	);

	return {
		ideologias_valores,
		projetos_carrosel,
		direitos_violados_valores,
		isLoading: isLoadingProjetosDireitosIdeologias,
		error,
	};
};
