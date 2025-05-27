import { listarProfissoesOptions } from "@/infra/options/profissao";
import { useQuery } from "@tanstack/react-query";

export const useProfissao = () => {
	const { data: profissoes, isLoading: isLoadingProfissao, error } = useQuery(
		listarProfissoesOptions()
	);
	return { profissoes, isLoadingProfissao, error };
};
