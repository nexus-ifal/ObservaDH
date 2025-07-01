import { useMutation, useQueryClient } from "@tanstack/react-query";

import { CreatePoliticoDTO } from "@/core/domain/dtos/politico.dto";
import {
	CriarPoliticoOptions,
	getPoliticoBaseQueryKey,
} from "@/infra/options/politico";

export function usePoliticoCreate() {
	const queryClient = useQueryClient();
	const mutation = useMutation(CriarPoliticoOptions());

	const createPolitico = (politicoData: CreatePoliticoDTO) =>
		mutation.mutate(
			{
				payload: { politico: politicoData },
			},
			{
				onSuccess: () => {
					queryClient.invalidateQueries({
						queryKey: [...getPoliticoBaseQueryKey(), "listarPoliticos"],
					});
				},
				onError: (error) => {
					console.error("Error creating politico:", error);
				},
			}
		);
	return {
		createPolitico,
		isLoading: mutation.isPending,
		error: mutation.error,
		isSucess: mutation.isSuccess,
	};
}
