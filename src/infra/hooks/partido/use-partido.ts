import { useQuery } from "@tanstack/react-query";

import { listarPartidosOptions } from "@/infra/options/partido";

export const usePartido = () => {
	const {
		data: partidos,
		isLoading: isLoadingPartidos,
		error: error,
	} = useQuery(listarPartidosOptions());
	return { partidos, isLoadingPartidos, error };
};
