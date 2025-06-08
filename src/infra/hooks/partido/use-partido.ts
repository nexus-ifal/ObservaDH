import { useQuery } from "@tanstack/react-query";

import { listarPartidoOptions } from "@/infra/options/partido";

export const usePartido = () => {
	const {
		data: partidos,
		isLoading: isLoadingPartidos,
		error: error,
	} = useQuery(listarPartidoOptions());
	return { partidos, isLoadingPartidos, error };
};
