import { useMutation, useQueryClient } from "@tanstack/react-query";

import { ExcluirProfissaoOptions } from "@/hooks/options/profissao";

export const useProfissaoExcluir = () => {
	const queryClient = useQueryClient();
	const { mutateAsync, isPending, isError, isSuccess } = useMutation({
		...ExcluirProfissaoOptions(),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["profissao"] });
		},
	});

	return {
		excluirProfissao: mutateAsync,
		isDeletingProfissao: isPending,
		hasExcluirProfissaoError: isError,
		hasExcluirProfissaoSuccess: isSuccess,
	};
};
