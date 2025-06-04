import { useMutation, useQueryClient } from "@tanstack/react-query";

import { CreateIdeologiaDTO } from "@/core/domain/dtos/ideologia.dto";
import {
	CriarIdeologiaOptions,
	getIdeologiaBaseQueryKey,
} from "@/infra/options/ideologia";

export function useIdeologiaCreate() {
	const queryClient = useQueryClient();
	const mutation = useMutation(CriarIdeologiaOptions());

	const createIdeologia = (ideologiaData: CreateIdeologiaDTO) =>
		mutation.mutate(
			{ payload: { ideologia: ideologiaData } },
			{
				onSuccess: () => {
					queryClient.invalidateQueries({
						queryKey: [...getIdeologiaBaseQueryKey(), "listarIdeologias"],
					});
				},
				onError: () => {},
			}
		);

	return {
		createIdeologia,
		isLoading: mutation.isPending,
		error: mutation.error,
		isSuccess: mutation.isSuccess,
	};
}
