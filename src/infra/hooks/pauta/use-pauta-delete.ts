import { useMutation, useQueryClient } from "@tanstack/react-query";

import { ExcluirPautaOptions } from "@/infra/options/pauta";

export const usePautaExcluir = () => {
	const queryClient = useQueryClient();

	const { mutateAsync, isPending, isError, isSuccess } = useMutation({
		...ExcluirPautaOptions(),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["pauta"] });
		},
	});

	return {
		excluirPauta: mutateAsync,
		isDeletingPauta: isPending,
		hasExcluirPautaError: isError,
		hasExcluirPautaSuccess: isSuccess,
	};
};
