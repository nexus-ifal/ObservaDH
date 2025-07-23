import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deletePartyOptions } from "@/hooks/options/partido";

/**
 * Hook for deleting political parties
 * Handles party deletion with cache invalidation
 */
export const usePartyDelete = () => {
	const queryClient = useQueryClient();

	const { mutateAsync, isPending, isError, isSuccess } = useMutation({
		...deletePartyOptions(),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["partido"] });
		},
	});

	return {
		deleteParty: mutateAsync,
		isDeletingParty: isPending,
		hasDeletePartyError: isError,
		hasDeletePartySuccess: isSuccess,
	};
};
