import { useMutation, useQueryClient } from "@tanstack/react-query";

import { CreateProjetoDTO } from "@/core/domain/dtos/projeto.dto";
import {
	createProjectOptions,
	getProjetoBaseQueryKey,
} from "@/hooks/options/projeto";

/**
 * Hook for creating legislative projects
 * Handles project creation with cache invalidation
 */
export function useProjectCreate() {
	const queryClient = useQueryClient();
	const mutation = useMutation(createProjectOptions());

	const createProject = (projetoData: CreateProjetoDTO) =>
		mutation.mutate(
			{
				payload: { projeto: projetoData },
			},
			{
				onSuccess: () => {
					queryClient.invalidateQueries({
						queryKey: [...getProjetoBaseQueryKey(), "listProjects"],
					});
				},
				onError: () => {},
			}
		);
	return {
		createProject,
		isLoading: mutation.isPending,
		error: mutation.error,
		isSuccess: mutation.isSuccess,
	};
}
