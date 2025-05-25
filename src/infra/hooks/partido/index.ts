import { useQuery } from "@tanstack/react-query";

import { listarPartidosOptions } from "@/infra/options/partido";

export const usePartido = () => {
	const {
		data: partidos,
		isLoading: isLoadingPartido,
		error: error,
	} = useQuery(listarPartidosOptions());
	return { partidos, isLoadingPartido, error };
};
