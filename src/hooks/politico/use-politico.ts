import { useQuery } from "@tanstack/react-query";

import { listPoliticiansOptions } from "@/hooks/options/politico";

/**
 * Hook for fetching all politicians
 * Returns politicians list with loading and error states
 */
export const usePolitician = () => {
	const {
		data: politicians,
		isLoading: isLoadingPoliticians,
		error,
	} = useQuery(listPoliticiansOptions());

	return { politicians, isLoadingPoliticians, error };
};
