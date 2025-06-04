import { useMutation, useQueryClient } from "@tanstack/react-query";

import { AtualizarPautaOptions } from "@/infra/options/pauta";

export const usePautaAtualizar = () => {
	const queryClient = useQueryClient();
	const { mutateAsync, isPending, isSuccess, isError } = useMutation({
		...AtualizarPautaOptions(),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["pauta"],
			});
		},
	});
	return {
		atualizarPauta: mutateAsync,
		isUpdatingPauta: isPending,
		hasAtualizarPautaError: isError,
		hasAtualizarPautaSucess: isSuccess,
	};
};
