import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updatePartyOptions } from "@/hooks/options/partido";

/**
 * Hook for updating political parties
 * Handles party updates with cache invalidation
 */
export const usePartyUpdate = () => {
	const queryClient = useQueryClient();
	const { mutateAsync, isPending, isSuccess, isError } = useMutation({
		...updatePartyOptions(),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["partido"],
			});
		},
	});
	return {
		updateParty: mutateAsync,
		isUpdatingParty: isPending,
		hasUpdatePartyError: isError,
		hasUpdatePartySuccess: isSuccess,
	};
};
