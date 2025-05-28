import { useMutation, useQueryClient } from "@tanstack/react-query";

import { CreateEstadoDTO } from "@/core/domain/dtos/estado.dto";

import {
	createEstadoOptions,
	getEstadoBaseQueryKey,
} from "@/infra/options/estado";

export function useEstadoCreate() {
	const queryClient = useQueryClient();
	const mutation = useMutation(createEstadoOptions());

	const createEstado = (estadoData: CreateEstadoDTO) =>
		mutation.mutate(
			{
				payload: { estado: estadoData },
			},
			{
				onSuccess: () => {
					queryClient.invalidateQueries({
						queryKey: [...getEstadoBaseQueryKey(), "listarEstados"],
					});

				},
				onError: () => {
				},
			}
		);
	return {
		createEstado,
		isLoading: mutation.isPending,
		error: mutation.error,
		isSucess: mutation.isSuccess,
	}
}
