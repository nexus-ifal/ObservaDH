import { queryOptions } from "@tanstack/react-query";

import DIContainer from "../dicontainer";
import { mutationOptions } from "../services/utils/utils";

import { MutationVariables } from "./../services/utils/utils";

import {
	CreateEstadoDTO,
	UpdateEstadoDTO,
} from "@/core/domain/dtos/estado.dto";

const usecase = DIContainer.getEstadoUseCase();

export const getEstadoBaseQueryKey = () => ["estado"];

export const listarEstadoOptions = () =>
	queryOptions({
		queryKey: [...getEstadoBaseQueryKey(), "listarEstados"],
		queryFn: () => usecase.listar(),
	});

export interface APICreateEstadoPayload {
	estado: CreateEstadoDTO;
}

export const CriarEstadoOptions = () =>
	mutationOptions({
		mutationKey: [...getEstadoBaseQueryKey(), "criarEstado"],
		mutationFn: ({
			payload,
		}: MutationVariables<void, APICreateEstadoPayload>) =>
			usecase.criar(payload.estado),
	});

export interface APIAtualizarEstadoPayload {
	id: string;
	data: UpdateEstadoDTO;
}

export const AtualizarEstadoOptions = () =>
	mutationOptions({
		mutationKey: [...getEstadoBaseQueryKey(), "atualizarEstado"],
		mutationFn: ({
			payload,
		}: MutationVariables<void, APIAtualizarEstadoPayload>) =>
			usecase.atualizar(payload.id, payload.data),
	});
