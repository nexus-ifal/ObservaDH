import { useQuery } from "@tanstack/react-query";

import { listarParlamentarEsferaOptions } from "../options/dados";

export const useParlamentarProjeto = (esfera?: string) => {
	const {
		data: parlamentarProjetoEsfera,
		isLoading: isLoadingParlamentarProjetoEsfera,
		error: error,
	} = useQuery(listarParlamentarEsferaOptions(esfera));

	return { parlamentarProjetoEsfera, isLoadingParlamentarProjetoEsfera, error };
};
