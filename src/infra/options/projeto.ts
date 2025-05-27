import { queryOptions } from "@tanstack/react-query";

import DIContainer from "../dicontainer";

const usecase = DIContainer.getProjetoUseCase();

export const getProjetoBaseQueryKey = () => ["projeto"];

export const listarProjetosOptions = () =>
	queryOptions({
		queryKey: [...getProjetoBaseQueryKey(), "listarProjetos"],
		queryFn: () => usecase.listar(),
	});
