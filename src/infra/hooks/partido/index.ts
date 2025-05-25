import { listarPartidosOptions } from "@/infra/options/partido"
import { useQuery } from "@tanstack/react-query"

export const usePartido = () => {
	const { data: partidos, isLoading: isLoadingPartido, error: error } = useQuery(listarPartidosOptions())
	return { partidos, isLoadingPartido, error }
}
