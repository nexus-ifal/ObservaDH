import { queryOptions } from "@tanstack/react-query";

import DIContainer from "../dicontainer";
import { mutationOptions } from "../services/utils/utils";

import { MutationVariables } from "./../services/utils/utils";

import { CreateEstadoDTO } from "@/core/domain/dtos/estado.dto";

const usecase = DIContainer.getEstadoUseCase();

export const getEstadoBaseQueryKey = () => ["estado"];

export const listarEstadoOptions = () =>
	queryOptions({
		queryKey: [...getEstadoBaseQueryKey(), "listarEstados"],
		queryFn: () => usecase.listar(),
	});

export interface ApiCreateEstadoPayload {
	estado: CreateEstadoDTO;
}

export const createEstadoOptions = () =>
	mutationOptions({
		mutationKey: [...getEstadoBaseQueryKey(), "createEstado"],
		mutationFn: ({
			payload,
		}: MutationVariables<void, ApiCreateEstadoPayload>) =>
			usecase.criar(payload.estado),
	});
