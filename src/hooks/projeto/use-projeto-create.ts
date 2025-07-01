import { useMutation, useQueryClient } from "@tanstack/react-query";

import { CreateProjetoDTO } from "@/core/domain/dtos/projeto.dto";
import {
	CriarProjetoOptions,
	getProjetoBaseQueryKey,
} from "@/hooks/options/projeto";

export function useProjetoCreate() {
	const queryClient = useQueryClient();
	const mutation = useMutation(CriarProjetoOptions());

	const createProjeto = (projetoData: CreateProjetoDTO) =>
		mutation.mutate(
			{
				payload: { projeto: projetoData },
			},
			{
				onSuccess: () => {
					queryClient.invalidateQueries({
						queryKey: [...getProjetoBaseQueryKey(), "listarProjetos"],
					});
				},
				onError: () => {},
			}
		);
	return {
		createProjeto,
		isLoading: mutation.isPending,
		error: mutation.error,
		isSucess: mutation.isSuccess,
	};
}
