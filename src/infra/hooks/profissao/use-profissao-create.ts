import { useMutation, useQueryClient } from "@tanstack/react-query";

import { CreateProfissaoDTO } from "@/core/domain/dtos/profissao.dto";
import {
	CriarProfissaoOptions,
	getProfissaoBaseQueryKey,
} from "@/infra/options/profissao";

export function useProfissaoCreate() {
	const queryClient = useQueryClient();
	const mutation = useMutation(CriarProfissaoOptions());

	const createProfissao = (data: CreateProfissaoDTO) =>
		mutation.mutate(
			{ payload: { profissao: data } },
			{
				onSuccess: () => {
					queryClient.invalidateQueries({
						queryKey: [...getProfissaoBaseQueryKey(), "listarProfissaos"],
					});
				},
				onError: () => {},
			}
		);

	return {
		createProfissao,
		isLoading: mutation.isPending,
		error: mutation.error,
		isSuccess: mutation.isSuccess,
	};
}
