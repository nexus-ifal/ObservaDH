import { queryOptions } from "@tanstack/react-query";

import DIContainer from "../dicontainer";
import { mutationOptions } from "../services/utils/utils";

import { MutationVariables } from "./../services/utils/utils";

import {
	CreatePartidoDTO,
	UpdatePartidoDTO,
} from "@/core/domain/dtos/partido.dto";

const usecase = DIContainer.getPartidoUseCase();

export const getPartidoBaseQueryKey = () => ["partido"];

export const listarPartidoOptions = () =>
	queryOptions({
		queryKey: [...getPartidoBaseQueryKey(), "listarPartido"],
		queryFn: () => usecase.listar(),
	});

export interface APICreatePartidoPayload {
	partido: CreatePartidoDTO;
}

export const CriarPartidoOptions = () =>
	mutationOptions({
		mutationKey: [...getPartidoBaseQueryKey(), "criarPartido"],
		mutationFn: ({
			payload,
		}: MutationVariables<void, APICreatePartidoPayload>) =>
			usecase.criar(payload.partido),
	});

export interface APIAtualizarPartidoPayload {
	id: string;
	data: UpdatePartidoDTO;
}

export const AtualizarPartidoOptions = () =>
	mutationOptions({
		mutationKey: [...getPartidoBaseQueryKey(), "atualizarPartido"],
		mutationFn: ({
			payload,
		}: MutationVariables<void, APIAtualizarPartidoPayload>) =>
			usecase.atualizar(payload.id, payload.data),
	});

export interface APIExcluirPartidoPayload {
	id: string;
}
export const ExcluirPartidoOptions = () =>
	mutationOptions({
		mutationKey: [...getPartidoBaseQueryKey(), "excluirPartido"],
		mutationFn: ({
			payload,
		}: MutationVariables<void, APIExcluirPartidoPayload>) =>
			usecase.excluir(payload.id),
	});
