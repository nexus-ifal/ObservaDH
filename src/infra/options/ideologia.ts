import { queryOptions } from "@tanstack/react-query";
import DIContainer from "../dicontainer";

const usecase = DIContainer.getIdeologiaUseCase();

export const getIdeologiaBaseKey = () => ["ideologia"]

export const listarIdeologiasOptions = () =>
	queryOptions({
		queryKey: [...getIdeologiaBaseKey(), "listarIdeologias"],
		queryFn: () => usecase.listar(),
	})
