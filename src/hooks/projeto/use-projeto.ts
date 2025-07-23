import { useQuery } from "@tanstack/react-query";

import { listProjectsOptions } from "./../options/projeto";

/**
 * Hook for fetching all legislative projects
 * Returns projects list with loading and error states
 */
export const useProject = () => {
	const {
		data: projects,
		isLoading: isLoadingProjects,
		error,
	} = useQuery(listProjectsOptions());
	return { projects, isLoadingProjects, error };
};
