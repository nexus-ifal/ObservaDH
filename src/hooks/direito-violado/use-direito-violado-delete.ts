import { useMutation, useQueryClient } from "@tanstack/react-query";

import { ExcluirDireitoVioladoOptions } from "@/hooks/options/direito-violado";

export const useDireitoVioladoExcluir = () => {
	const queryClient = useQueryClient();

	const { mutateAsync, isPending, isError, isSuccess } = useMutation({
		...ExcluirDireitoVioladoOptions(),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["direito-violado"] });
		},
	});

	return {
		excluirDireitoViolado: mutateAsync,
		isDeletingDireitoViolado: isPending,
		hasExcluirDireitoVioladoError: isError,
		hasExcluirDireitoVioladoSuccess: isSuccess,
	};
};
