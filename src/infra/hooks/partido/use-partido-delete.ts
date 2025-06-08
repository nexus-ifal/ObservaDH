import { useMutation, useQueryClient } from "@tanstack/react-query";

import { ExcluirPartidoOptions } from "@/infra/options/partido";

export const usePartidoExcluir = () => {
	const queryClient = useQueryClient();

	const { mutateAsync, isPending, isError, isSuccess } = useMutation({
		...ExcluirPartidoOptions(),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["partido"] });
		},
	});

	return {
		excluirPartido: mutateAsync,
		isDeletingPartido: isPending,
		hasExcluirPartidoError: isError,
		hasExcluirPartidoSuccess: isSuccess,
	};
};
