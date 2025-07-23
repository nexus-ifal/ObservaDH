import { useQuery } from "@tanstack/react-query";

import { listPartiesOptions } from "@/hooks/options/partido";

/**
 * Hook for fetching all political parties
 * Returns parties list with loading and error states
 */
export const useParty = () => {
	const {
		data: parties,
		isLoading: isLoadingParties,
		error: error,
	} = useQuery(listPartiesOptions());
	return { parties, isLoadingParties, error };
};
