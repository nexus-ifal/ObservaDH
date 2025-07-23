import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deletePoliticianOptions } from "@/hooks/options/politico";

/**
 * Hook for deleting politicians
 * Handles politician deletion with cache invalidation
 */
export const usePoliticianDelete = () => {
	const queryClient = useQueryClient();

	const { mutateAsync, isPending, isError, isSuccess } = useMutation({
		...deletePoliticianOptions(),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["politico"] });
		},
	});

	return {
		deletePolitician: mutateAsync,
		isDeletingPolitician: isPending,
		hasDeletePoliticianError: isError,
		hasDeletePoliticianSuccess: isSuccess,
	};
};
