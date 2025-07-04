import { useQuery } from "@tanstack/react-query";

import { listarPautaOptions } from "@/hooks/options/pauta";

export const usePauta = () => {
	const {
		data: pautas,
		isLoading: isLoadingPautas,
		error,
	} = useQuery(listarPautaOptions());
	return { pautas, isLoadingPautas, error };
};
