import { useQuery } from "@tanstack/react-query";

import { listarProfissoesOptions } from "@/infra/options/profissao";

export const useProfissao = () => {
	const {
		data: profissoes,
		isLoading: isLoadingProfissao,
		error,
	} = useQuery(listarProfissoesOptions());
	return { profissoes, isLoadingProfissao, error };
};
