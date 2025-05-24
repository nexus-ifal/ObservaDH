import { queryOptions } from "@tanstack/react-query";
import DIContainer from "../dicontainer";

const usecase = DIContainer.getEstadoUseCase()

export const getEstadoBaseQueryKey = () => ["estado"]

export const listarEstadoOptions = () =>
	queryOptions({
		queryKey: [...getEstadoBaseQueryKey(), "listarEstados"],
		queryFn: () => usecase.listar()
	})
