import { useQuery } from "@tanstack/react-query";

import { filterPoliticiansOptions } from "../options/politico";

import { DadosParaPesquisaParlamenta } from "@/core/domain/dtos/dados.dto";

/**
 * Utility function to clean filter object by removing empty values
 * Filters out null, undefined, empty strings, and "geral" values
 */
function cleanFilters(filters: DadosParaPesquisaParlamenta) {
	return Object.fromEntries(
		Object.entries(filters).filter(([value]) => value && value !== "geral")
	) as DadosParaPesquisaParlamenta;
}

/**
 * Hook for fetching filtered politicians
 * Applies filters and returns matching politicians with loading states
 */
export const useFilteredPoliticians = (filters: DadosParaPesquisaParlamenta) => {
	const cleanedFilters = cleanFilters(filters);
	const {
		data: filteredPoliticians,
		isLoading: isLoadingFilteredPoliticians,
		error,
	} = useQuery(filterPoliticiansOptions(cleanedFilters));

	return { filteredPoliticians, isLoadingFilteredPoliticians, error };
};
