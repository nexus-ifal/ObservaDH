import { queryOptions } from "@tanstack/react-query";

import DIContainer from "../dicontainer";

const usecase = DIContainer.getPautaUseCase();

export const getPautaBaseKey = () => ["pauta"];

export const listarPautasOptions = () =>
	queryOptions({
		queryKey: [...getPautaBaseKey(), "listarPautas"],
		queryFn: () => usecase.listar(),
	});
