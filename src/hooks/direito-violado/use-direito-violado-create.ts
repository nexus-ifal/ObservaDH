import { useMutation, useQueryClient } from "@tanstack/react-query";

import { CreateDireitoVioladoDTO } from "@/core/domain/dtos/direito-violado.dto";
import {
	CriarDireitoVioladoOptions,
	getDireitoVioladoBaseQueryKey,
} from "@/hooks/options/direito-violado";

export function useDireitoVioladoCreate() {
	const queryClient = useQueryClient();
	const mutation = useMutation(CriarDireitoVioladoOptions());

	const createDireitoViolado = (direitoVioladoData: CreateDireitoVioladoDTO) =>
		mutation.mutate(
			{
				payload: { direitoViolado: direitoVioladoData },
			},
			{
				onSuccess: () => {
					queryClient.invalidateQueries({
						queryKey: [
							...getDireitoVioladoBaseQueryKey(),
							"listarDireitoViolado",
						],
					});
				},
				onError: () => {},
			}
		);
	return {
		createDireitoViolado,
		isLoading: mutation.isPending,
		error: mutation.error,
		isSucess: mutation.isSuccess,
	};
}
