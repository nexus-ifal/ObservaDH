import { useMutation, useQueryClient } from "@tanstack/react-query";

import { AtualizarProjetoOptions } from "@/hooks/options/projeto";

export const useProjetoAtualizar = () => {
	const queryClient = useQueryClient();
	const { mutateAsync, isPending, isSuccess, isError } = useMutation({
		...AtualizarProjetoOptions(),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["projeto"],
			});
		},
	});
	return {
		atualizarProjeto: mutateAsync,
		isUpdatingProjeto: isPending,
		hasAtualizarProjetoError: isError,
		hasAtualizarProjetoSucess: isSuccess,
	};
};
