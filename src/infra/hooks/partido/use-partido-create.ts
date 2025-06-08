import { useMutation, useQueryClient } from "@tanstack/react-query";

import { CreatePartidoDTO } from "@/core/domain/dtos/partido.dto";
import {
	CriarPartidoOptions,
	getPartidoBaseQueryKey,
} from "@/infra/options/partido";

export function usePartidoCreate() {
	const queryClient = useQueryClient();
	const mutation = useMutation(CriarPartidoOptions());

	const createPartido = (partidoData: CreatePartidoDTO) =>
		mutation.mutate(
			{
				payload: { partido: partidoData },
			},
			{
				onSuccess: () => {
					queryClient.invalidateQueries({
						queryKey: [...getPartidoBaseQueryKey(), "listarPartido"],
					});
				},
				onError: () => {},
			}
		);
	return {
		createPartido,
		isLoading: mutation.isPending,
		error: mutation.error,
		isSucess: mutation.isSuccess,
	};
}
