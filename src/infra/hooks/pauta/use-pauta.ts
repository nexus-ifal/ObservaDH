import { listarPautasOptions } from "@/infra/options/pauta";
import { useQuery } from "@tanstack/react-query";

export const usePauta = () => {
	const { data: pautas, isLoading: isLoadingPautas, error } = useQuery(listarPautasOptions());
	return { pautas, isLoadingPautas, error };
}
