import { useQuery } from "@tanstack/react-query";

import { listarProjetosPorUFOptions } from "@/infra/options/dados";

export const useProjetoEstado = (esfera?: string) => {
	const {
		data: projetosPorUF,
		isLoading: isLoadingProjetosPorUF,
		error: error,
	} = useQuery(listarProjetosPorUFOptions(esfera));

	return { projetosPorUF, isLoadingProjetosPorUF, error };
};
