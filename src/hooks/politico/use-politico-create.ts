import { useMutation, useQueryClient } from "@tanstack/react-query";

import { CreatePoliticoDTO } from "@/core/domain/dtos/politico.dto";
import {
	createPoliticianOptions,
	getPoliticoBaseQueryKey,
} from "@/hooks/options/politico";

/**
 * Hook for creating politicians
 * Handles politician creation with cache invalidation
 */
export function usePoliticianCreate() {
	const queryClient = useQueryClient();
	const mutation = useMutation(createPoliticianOptions());

	const createPolitician = (politicoData: CreatePoliticoDTO) =>
		mutation.mutate(
			{
				payload: { politico: politicoData },
			},
			{
				onSuccess: () => {
					queryClient.invalidateQueries({
						queryKey: [...getPoliticoBaseQueryKey(), "listPoliticians"],
					});
				},
				onError: (error) => {
					console.error("Error creating politician:", error);
				},
			}
		);
	return {
		createPolitician,
		isLoading: mutation.isPending,
		error: mutation.error,
		isSuccess: mutation.isSuccess,
	};
}
