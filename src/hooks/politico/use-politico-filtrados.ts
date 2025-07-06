import { useQuery } from "@tanstack/react-query";

import { FiltrarPoliticosOptions } from "../options/politico";

import { DadosParaPesquisaParlamenta } from "@/core/domain/dtos/dados.dto";

export const usePoliticoFiltrados = (filtros: DadosParaPesquisaParlamenta) => {
	const {
		data: politicosFiltrados,
		isLoading: isLoadingPoliticosFiltrados,
		error,
	} = useQuery(FiltrarPoliticosOptions(filtros));

	return { politicosFiltrados, isLoadingPoliticosFiltrados, error };
};
