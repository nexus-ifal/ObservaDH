import { useQuery } from "@tanstack/react-query";

import { listarIdeologiasOptions } from "@/infra/options/ideologia";

export const useIdeologia = () => {
	const {
		data: ideologias,
		isLoading: isLoadingIdeologias,
		error: error,
	} = useQuery(listarIdeologiasOptions());
	return { ideologias, isLoadingIdeologias, error };
};
