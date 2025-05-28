import { AtualizarEstadoOptions } from "@/infra/options/estado";
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useEstadoAtualizar = () => {
	const queryClient = useQueryClient();
	const { mutateAsync, isPending, isSuccess, isError } = useMutation({
		...AtualizarEstadoOptions(),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["estado"]
			});
		}
	});
	return {
		atualizarEstado: mutateAsync,
		isUpdatingEstado: isPending,
		hasAtualizarEstadoError: isError,
		hasAtualizarEstadoSucess: isSuccess
	}
}
