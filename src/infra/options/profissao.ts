import DIContainer from "../dicontainer";
import { queryOptions } from "@tanstack/react-query";

const usecase = DIContainer.getProfissaoUseCase();

export const getProfissaoBaseQueryKey = () => ["profissao"];
export const listarProfissoesOptions = () =>
	queryOptions({
		queryKey: [...getProfissaoBaseQueryKey(), "listarProfissoes"],
		queryFn: () => usecase.listar(),
	});
