import { listarIdeologiasOptions } from "@/infra/options/ideologia"
import { useQuery } from "@tanstack/react-query"

export const useIdeologia = () => {
	const {
		data: ideologias,
		isLoading: isLoadingIdeologias,
		error: error
	} = useQuery(listarIdeologiasOptions())
	return { ideologias, isLoadingIdeologias, error }
}
