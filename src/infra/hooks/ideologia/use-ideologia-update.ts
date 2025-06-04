import { useMutation, useQueryClient } from "@tanstack/react-query";

import { AtualizarIdeologiaOptions } from "@/infra/options/ideologia";

export const useIdeologiaAtualizar = () => {
	const queryClient = useQueryClient();
	const { mutateAsync, isPending, isSuccess, isError } = useMutation({
		...AtualizarIdeologiaOptions(),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["ideologia"] });
		},
	});

	return {
		atualizarIdeologia: mutateAsync,
		isUpdatingIdeologia: isPending,
		hasAtualizarIdeologiaError: isError,
		hasAtualizarIdeologiaSuccess: isSuccess,
	};
};
