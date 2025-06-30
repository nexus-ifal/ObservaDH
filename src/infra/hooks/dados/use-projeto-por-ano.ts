import { listarProjetosPorAnoOptions } from "@/infra/options/dados";
import { useQuery } from "@tanstack/react-query";

export const useProjetoPorAno = () => {
	const {
		data: projetosPorAno,
		isLoading: isLoadingProjetosPorAno,
		error,
	} = useQuery(listarProjetosPorAnoOptions());

	return { projetosPorAno, isLoadingProjetosPorAno, error };
};
