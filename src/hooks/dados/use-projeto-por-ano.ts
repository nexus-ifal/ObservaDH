import { useQuery } from "@tanstack/react-query";

import { listarProjetosPorAnoOptions } from "@/hooks/options/dados";

export const useProjetoPorAno = () => {
	const {
		data: projetosPorAno,
		isLoading: isLoadingProjetosPorAno,
		error,
	} = useQuery(listarProjetosPorAnoOptions());

	return { projetosPorAno, isLoadingProjetosPorAno, error };
};
