import { queryOptions } from "@tanstack/react-query";

import DIContainer from "../dicontainer";

const usecase = DIContainer.getPoliticoUseCase();

export const getPoliticoBaseKey = () => ["politico"];

export const listarPoliticosOptions = () =>
	queryOptions({
		queryKey: [...getPoliticoBaseKey(), "listarPoliticos"],
		queryFn: () => usecase.listar(),
	});
