import { useQuery } from "@tanstack/react-query";

import { listarReligiaoRacaOptions } from "@/hooks/options/dados";

export const useReligiaoRaca = () => {
	const {
		data: religiaoRaca,
		isLoading: isLoadingReligiaoRaca,
		error: error,
	} = useQuery(listarReligiaoRacaOptions());

	return { religiaoRaca, isLoadingReligiaoRaca, error };
};
