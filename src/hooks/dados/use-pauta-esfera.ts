import { useQuery } from "@tanstack/react-query";
import { listarPautaPorEsferaOptions } from "../options/dados";

export const usePautaEsfera = (esfera: string) => {
	const {
		data: pautaEsfera,
		isLoading: isLoadingPautaEsfera,
		error: error,
	} = useQuery(listarPautaPorEsferaOptions(esfera));

	return { pautaEsfera, isLoadingPautaEsfera, error };
};
