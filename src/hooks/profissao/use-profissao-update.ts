import { useMutation, useQueryClient } from "@tanstack/react-query";

import { AtualizarProfissaoOptions } from "@/hooks/options/profissao";

export const useProfissaoAtualizar = () => {
	const queryClient = useQueryClient();
	const { mutateAsync, isPending, isSuccess, isError } = useMutation({
		...AtualizarProfissaoOptions(),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["profissao"] });
		},
	});

	return {
		atualizarProfissao: mutateAsync,
		isUpdatingProfissao: isPending,
		hasAtualizarProfissaoError: isError,
		hasAtualizarProfissaoSuccess: isSuccess,
	};
};
