import { useMutation, useQueryClient } from "@tanstack/react-query";

import { AtualizarEstadoOptions } from "@/hooks/options/estado";

export const useEstadoAtualizar = () => {
	const queryClient = useQueryClient();
	const { mutateAsync, isPending, isSuccess, isError } = useMutation({
		...AtualizarEstadoOptions(),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["estado"],
			});
		},
	});
	return {
		atualizarEstado: mutateAsync,
		isUpdatingEstado: isPending,
		hasAtualizarEstadoError: isError,
		hasAtualizarEstadoSucess: isSuccess,
	};
};
