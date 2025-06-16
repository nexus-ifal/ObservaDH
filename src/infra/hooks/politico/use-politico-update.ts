import { useMutation, useQueryClient } from "@tanstack/react-query";

import { AtualizarPoliticoOptions } from "@/infra/options/politico";

export const usePoliticoAtualizar = () => {
	const queryClient = useQueryClient();
	const { mutateAsync, isPending, isSuccess, isError } = useMutation({
		...AtualizarPoliticoOptions(),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["politico"],
			});
		},
	});
	return {
		atualizarPolitico: mutateAsync,
		isUpdatingPolitico: isPending,
		hasAtualizarPoliticoError: isError,
		hasAtualizarPoliticoSucess: isSuccess,
	};
};
