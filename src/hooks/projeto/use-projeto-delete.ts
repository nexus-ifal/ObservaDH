import { useMutation, useQueryClient } from "@tanstack/react-query";

import { ExcluirProjetoOptions } from "@/hooks/options/projeto";

export const useProjetoExcluir = () => {
	const queryClient = useQueryClient();

	const { mutateAsync, isPending, isError, isSuccess } = useMutation({
		...ExcluirProjetoOptions(),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["projeto"] });
		},
	});

	return {
		excluirProjeto: mutateAsync,
		isDeletingProjeto: isPending,
		hasExcluirProjetoError: isError,
		hasExcluirProjetoSuccess: isSuccess,
	};
};
