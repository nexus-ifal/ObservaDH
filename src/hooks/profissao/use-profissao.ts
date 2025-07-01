import { useQuery } from "@tanstack/react-query";

import { listarProfissoesOptions } from "@/hooks/options/profissao";

export const useProfissao = () => {
	const {
		data: profissoes,
		isLoading: isLoadingProfissoes,
		error,
	} = useQuery(listarProfissoesOptions());
	return { profissoes, isLoadingProfissoes, error };
};
