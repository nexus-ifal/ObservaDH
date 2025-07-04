import { useMutation, useQueryClient } from "@tanstack/react-query";

import { AtualizarDireitoVioladoOptions } from "@/hooks/options/direito-violado";

export const useDireitoVioladoAtualizar = () => {
	const queryClient = useQueryClient();
	const { mutateAsync, isPending, isSuccess, isError } = useMutation({
		...AtualizarDireitoVioladoOptions(),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["direito-violado"],
			});
		},
	});
	return {
		atualizarDireitoViolado: mutateAsync,
		isUpdatingDireitoViolado: isPending,
		hasAtualizarDireitoVioladoError: isError,
		hasAtualizarDireitoVioladoSucess: isSuccess,
	};
};
