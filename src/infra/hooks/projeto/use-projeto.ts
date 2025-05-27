import { useQuery } from "@tanstack/react-query";

import { listarProjetosOptions } from './../../options/projeto';

export const useProjeto = () => {
	const {
		data: projetos,
		isLoading: isLoadingProjeto,
		error,
	} = useQuery(listarProjetosOptions());
	return { projetos, isLoadingProjeto, error };
}
