import { useMutation, useQueryClient } from "@tanstack/react-query";

import { CreatePartidoDTO } from "@/core/domain/dtos/partido.dto";
import {
	createPartyOptions,
	getPartidoBaseQueryKey,
} from "@/hooks/options/partido";

/**
 * Hook for creating political parties
 * Handles party creation with cache invalidation
 */
export function usePartyCreate() {
	const queryClient = useQueryClient();
	const mutation = useMutation(createPartyOptions());

	const createParty = (partidoData: CreatePartidoDTO) =>
		mutation.mutate(
			{
				payload: { partido: partidoData },
			},
			{
				onSuccess: () => {
					queryClient.invalidateQueries({
						queryKey: [...getPartidoBaseQueryKey(), "listParties"],
					});
				},
				onError: () => {},
			}
		);
	return {
		createParty,
		isLoading: mutation.isPending,
		error: mutation.error,
		isSuccess: mutation.isSuccess,
	};
}
