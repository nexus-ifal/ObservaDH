import { useMutation, useQueryClient } from "@tanstack/react-query";

import { AtualizarPartidoOptions } from "@/hooks/options/partido";

export const usePartidoAtualizar = () => {
	const queryClient = useQueryClient();
	const { mutateAsync, isPending, isSuccess, isError } = useMutation({
		...AtualizarPartidoOptions(),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["partido"],
			});
		},
	});
	return {
		atualizarPartido: mutateAsync,
		isUpdatingPartido: isPending,
		hasAtualizarPartidoError: isError,
		hasAtualizarPartidoSucess: isSuccess,
	};
};
