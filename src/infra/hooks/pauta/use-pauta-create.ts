import { useMutation, useQueryClient } from "@tanstack/react-query";

import { CreatePautaDTO } from "@/core/domain/dtos/pauta.dto";
import { CriarPautaOptions, getPautaBaseQueryKey } from "@/infra/options/pauta";

export function usePautaCreate() {
	const queryClient = useQueryClient();
	const mutation = useMutation(CriarPautaOptions());

	const createPauta = (pautaData: CreatePautaDTO) =>
		mutation.mutate(
			{
				payload: { pauta: pautaData },
			},
			{
				onSuccess: () => {
					queryClient.invalidateQueries({
						queryKey: [...getPautaBaseQueryKey(), "listarPauta"],
					});
				},
				onError: () => {},
			}
		);
	return {
		createPauta,
		isLoading: mutation.isPending,
		error: mutation.error,
		isSucess: mutation.isSuccess,
	};
}
