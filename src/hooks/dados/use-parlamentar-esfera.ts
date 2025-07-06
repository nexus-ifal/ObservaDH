import { useQuery } from "@tanstack/react-query";
import { listarParlamentarEsferaOptions } from "../options/dados";

export const useParlamentarEsfera = (esfera: string) => {
	const {
		data: parlamentarEsfera,
		isLoading: isLoadingParlamentarEsfera,
		error: error,
	} = useQuery(listarParlamentarEsferaOptions(esfera));

	return { parlamentarEsfera, isLoadingParlamentarEsfera, error };
};
