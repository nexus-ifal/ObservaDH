import { useMutation, useQueryClient } from "@tanstack/react-query";

import { ExcluirIdeologiaOptions } from "@/infra/options/ideologia";

export const useIdeologiaExcluir = () => {
	const queryClient = useQueryClient();

	const { mutateAsync, isPending, isError, isSuccess } = useMutation({
		...ExcluirIdeologiaOptions(),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["ideologia"] });
		},
	});

	return {
		excluirIdeologia: mutateAsync,
		isDeletingIdeologia: isPending,
		hasExcluirIdeologiaError: isError,
		hasExcluirIdeologiaSuccess: isSuccess,
	};
};
