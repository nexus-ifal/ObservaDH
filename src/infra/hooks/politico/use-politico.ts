import { listarPoliticosOptions } from "@/infra/options/politico";
import { useQuery } from "@tanstack/react-query";

export const usePolitico = () => {
	const { data: politicos,
		isLoading: isLoadingPoliticos,
		error } = useQuery(
			listarPoliticosOptions()
		);

	return { politicos, isLoadingPoliticos, error };
};
