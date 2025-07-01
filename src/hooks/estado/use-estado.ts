import { useQuery } from "@tanstack/react-query";

import { listarEstadoOptions } from "@/hooks/options/estado";

export const useEstado = () => {
	const {
		data: estados,
		isLoading: isLoadingEstados,
		error: error,
	} = useQuery(listarEstadoOptions());
	return { estados, isLoadingEstados, error };
};
