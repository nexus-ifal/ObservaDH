import { useQuery } from "@tanstack/react-query";

import { listarDireitoVioladoOptions } from "../../options/direito-violado";

export const useDireitoViolado = () => {
	const {
		data: direitosViolados,
		isLoading: isLoadingDireitosViolados,
		error: error,
	} = useQuery(listarDireitoVioladoOptions());
	return { direitosViolados, isLoadingDireitosViolados, error };
};
