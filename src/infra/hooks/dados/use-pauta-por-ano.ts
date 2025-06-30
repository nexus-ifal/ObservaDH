import { useQuery } from "@tanstack/react-query";
import { listarPautaPorAnoOptions } from "@/infra/options/dados";

export const usePautaPorAno = () => {
	const {
		data: pautaPorAno,
		isLoading: isLoadingPautaPorAno,
		error: error,
	} = useQuery(listarPautaPorAnoOptions());

	return { pautaPorAno, isLoadingPautaPorAno, error };
};
