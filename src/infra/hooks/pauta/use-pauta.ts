import { useQuery } from "@tanstack/react-query";

import { listarPautasOptions } from "@/infra/options/pauta";

export const usePauta = () => {
	const {
		data: pautas,
		isLoading: isLoadingPautas,
		error,
	} = useQuery(listarPautasOptions());
	return { pautas, isLoadingPautas, error };
};
