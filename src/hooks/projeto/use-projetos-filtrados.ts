import { useQuery } from "@tanstack/react-query";

import { filterProjectsOptions } from "../options/projeto";

import { FiltrosProjetos } from "@/core/domain/dtos/dados.dto";

/**
 * Hook for fetching filtered legislative projects
 * Applies filters and returns matching projects with loading states
 */
export const useFilteredProjects = (filters?: FiltrosProjetos) => {
	const {
		data: projects,
		isLoading: isLoadingProjects,
		error,
	} = useQuery(filterProjectsOptions(filters));

	return { projects, isLoadingProjects, error };
};
