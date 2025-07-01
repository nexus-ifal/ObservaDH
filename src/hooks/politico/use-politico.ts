import { useQuery } from "@tanstack/react-query";

import { listarPoliticosOptions } from "@/hooks/options/politico";

export const usePolitico = () => {
	const {
		data: politicos,
		isLoading: isLoadingPoliticos,
		error,
	} = useQuery(listarPoliticosOptions());

	return { politicos, isLoadingPoliticos, error };
};
