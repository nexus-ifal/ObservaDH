import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updatePoliticianOptions } from "@/hooks/options/politico";

/**
 * Hook for updating politicians
 * Handles politician updates with cache invalidation
 */
export const usePoliticianUpdate = () => {
	const queryClient = useQueryClient();
	const { mutateAsync, isPending, isSuccess, isError } = useMutation({
		...updatePoliticianOptions(),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["politico"],
			});
		},
	});
	return {
		updatePolitician: mutateAsync,
		isUpdatingPolitician: isPending,
		hasUpdatePoliticianError: isError,
		hasUpdatePoliticianSuccess: isSuccess,
	};
};
