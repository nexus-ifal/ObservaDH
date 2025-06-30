import { useQuery } from "@tanstack/react-query";

import { listarIdeologiaGeneroOptions } from "@/infra/options/dados";

export const useIdeologiaGenero = () => {
	const {
		data: ideologiaGenero,
		isLoading: isLoadingIdeologiaGenero,
		error,
	} = useQuery(listarIdeologiaGeneroOptions());

	return { ideologiaGenero, isLoadingIdeologiaGenero, error };
};
