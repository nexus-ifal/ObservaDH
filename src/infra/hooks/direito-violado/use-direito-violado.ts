import { useQuery } from "@tanstack/react-query"
import { listarDireitoVioladoOptions } from "../../options/direito-violado"

export const useDireitoViolado = () => {
	const { data: direitosViolados, isLoading: isLoadindDireitosViolados, error: error } = useQuery(listarDireitoVioladoOptions())
	return { direitosViolados, isLoadindDireitosViolados, error }
}
