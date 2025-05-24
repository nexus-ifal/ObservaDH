import { useQuery } from '@tanstack/react-query';
import { getEstados } from "../api/services/estado/estado.service";

export function useEstado() {
	return useQuery({
		queryKey: ['estados'],
		queryFn: getEstados,
		staleTime: 5 * 60 * 1000,
		retry: (failureCount, error) => {
			const hasResponse = typeof error === 'object' && error !== null && 'response' in error && typeof (error as any).response === 'object';
			const status = hasResponse ? (error as any).response.status : undefined;
			if (status >= 400 && status < 500 && status !== 408) {
				return false;
			}
			return failureCount < 3;
		},
		retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
		gcTime: 5 * 60 * 1000,
		refetchOnWindowFocus: true,
		refetchOnReconnect: true,
	});
}
