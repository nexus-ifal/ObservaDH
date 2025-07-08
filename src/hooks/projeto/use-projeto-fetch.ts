import { useQuery } from "@tanstack/react-query";

import { BuscarProjetoOptions } from "../options/projeto";

export const useProjetoFetch = (id: string) => {
	const {
		data: projeto,
		isLoading: isLoadingProjeto,
		error,
	} = useQuery(BuscarProjetoOptions(id));

	return { projeto, isLoadingProjeto, error };
};
