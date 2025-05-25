import { useQuery } from "@tanstack/react-query";

import { listarEstadoOptions } from "@/infra/options/estado";

export const useEstado = () => {
	const {
		data: estados,
		isLoading: isLoadingEstado,
		error: error,
	} = useQuery(listarEstadoOptions());
	return { estados, isLoadingEstado, error };
};
