import { useQuery } from "@tanstack/react-query";

import { listarRankingPartidosOptions } from "../options/dados";

import { PartidoRankingDTO } from "@/core/domain/dtos/dados.dto";

export const useRankingPartidos = () => {
	const {
		data: partidos,
		isLoading,
		error,
	} = useQuery<PartidoRankingDTO[]>(listarRankingPartidosOptions());

	return { partidos, isLoading, error };
};
