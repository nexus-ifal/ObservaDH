import { queryOptions } from "@tanstack/react-query";

import DIContainer from "../dicontainer";

const usecase = DIContainer.getProfissaoUseCase();

export const getProfissaoBaseQueryKey = () => ["profissao"];
export const listarProfissoesOptions = () =>
	queryOptions({
		queryKey: [...getProfissaoBaseQueryKey(), "listarProfissoes"],
		queryFn: () => usecase.listar(),
	});
