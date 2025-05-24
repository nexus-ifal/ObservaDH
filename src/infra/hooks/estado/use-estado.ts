import { listarEstadoOptions } from "@/infra/options/estado"
import { useQuery } from "@tanstack/react-query"

export const useEstado = () => {
	const { data: estados, isLoading: isLoadingEstado, error: error } = useQuery(listarEstadoOptions())
	return { estados, isLoadingEstado, error }
}
