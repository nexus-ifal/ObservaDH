import { useQuery } from "@tanstack/react-query";

import { listarAnosOptions } from "../options/dados";

export const useAnos = () => {
	const {
		data: anos,
		isLoading,
		error,
	} = useQuery<{ ano: string }[]>(listarAnosOptions());

	return { anos, isLoading, error };
};
