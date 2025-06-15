import { useMutation, useQueryClient } from "@tanstack/react-query";

import { ExcluirPoliticoOptions } from "@/infra/options/politico";

export const usePoliticoExcluir = () => {
	const queryClient = useQueryClient();

	const { mutateAsync, isPending, isError, isSuccess } = useMutation({
		...ExcluirPoliticoOptions(),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["politico"] });
		},
	});

	return {
		excluirPolitico: mutateAsync,
		isDeletingPolitico: isPending,
		hasExcluirPoliticoError: isError,
		hasExcluirPoliticoSuccess: isSuccess,
	};
};
