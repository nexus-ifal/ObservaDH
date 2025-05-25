import { queryOptions } from "@tanstack/react-query";

import DIContainer from "../dicontainer";

const usecase = DIContainer.getDireitoVioladoUseCase();

export const getDireitoVioladoBaseQueryKey = () => ["direito-violado"];

export const listarDireitoVioladoOptions = () =>
	queryOptions({
		queryKey: [...getDireitoVioladoBaseQueryKey(), "listarDireitosViolados"],
		queryFn: () => usecase.listar(),
	});
