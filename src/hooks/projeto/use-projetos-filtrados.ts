import { useQuery } from "@tanstack/react-query";

import { FiltrarProjetosOptions } from "../options/projeto";

import { FiltrosProjetos } from "@/core/domain/dtos/dados.dto";

export const useProjetosFiltrados = (filtros?: FiltrosProjetos) => {
	const {
		data: projetos,
		isLoading: isLoadingProjetos,
		error,
	} = useQuery(FiltrarProjetosOptions(filtros));

	return { projetos, isLoadingProjetos, error };
};
