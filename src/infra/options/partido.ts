import { queryOptions } from "@tanstack/react-query";
import DIContainer from "../dicontainer";

const usecase = DIContainer.getPartidoUseCase();

export const getPartidoBaseQueryKey = () => ["partido"]

export const listarPartidosOptions = () =>
	queryOptions({
		queryKey: [...getPartidoBaseQueryKey(), "listarPartidos"],
		queryFn: () => usecase.listar()
	})
