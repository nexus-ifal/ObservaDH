import { useQuery } from "@tanstack/react-query";

import { listarProjetosDireitosIdeologiasOptions } from "../options/dados";

export const useProjetosDireitosIdeologias = (pauta?: string) => {
	const {
		data: projetosDireitosIdeologias,
		isLoading: isLoadingProjetosDireitosIdeologias,
		error,
	} = useQuery(listarProjetosDireitosIdeologiasOptions({ pauta }));
	return {
		projetosDireitosIdeologias,
		isLoadingProjetosDireitosIdeologias,
		error,
	};
};
