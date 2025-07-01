import { useQuery } from "@tanstack/react-query";

import { listarIdeologiaOptions } from "@/hooks/options/ideologia";

export const useIdeologia = () => {
	const {
		data: ideologias,
		isLoading: isLoadingIdeologias,
		error: error,
	} = useQuery(listarIdeologiaOptions());
	return { ideologias, isLoadingIdeologias, error };
};
