import { useQuery } from "@tanstack/react-query";

import { FiltrarPoliticosOptions } from "../options/politico";

import { DadosParaPesquisaParlamenta } from "@/core/domain/dtos/dados.dto";

function limparFiltros(filtros: DadosParaPesquisaParlamenta) {
	return Object.fromEntries(
		Object.entries(filtros).filter(([value]) => value && value !== "geral")
	) as DadosParaPesquisaParlamenta;
}

export const usePoliticoFiltrados = (filtros: DadosParaPesquisaParlamenta) => {
	const filtrosLimpos = limparFiltros(filtros);
	const {
		data: politicosFiltrados,
		isLoading: isLoadingPoliticosFiltrados,
		error,
	} = useQuery(FiltrarPoliticosOptions(filtrosLimpos));

	return { politicosFiltrados, isLoadingPoliticosFiltrados, error };
};
