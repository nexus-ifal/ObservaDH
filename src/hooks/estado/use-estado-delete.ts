import { useMutation, useQueryClient } from "@tanstack/react-query";

import { ExcluirEstadoOptions } from "@/hooks/options/estado";

export const useEstadoExcluir = () => {
	const queryClient = useQueryClient();

	const { mutateAsync, isPending, isError, isSuccess } = useMutation({
		...ExcluirEstadoOptions(),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["estado"] });
		},
	});

	return {
		excluirEstado: mutateAsync,
		isDeletingEstado: isPending,
		hasExcluirEstadoError: isError,
		hasExcluirEstadoSuccess: isSuccess,
	};
};
