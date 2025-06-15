import { queryOptions } from "@tanstack/react-query";

import DIContainer from "../dicontainer";
import { mutationOptions } from "../services/utils/utils";

import { MutationVariables } from "./../services/utils/utils";

import {
	CreatePoliticoDTO,
	UpdatePoliticoDTO,
} from "@/core/domain/dtos/politico.dto";

const usecase = DIContainer.getPoliticoUseCase();

export const getPoliticoBaseQueryKey = () => ["politico"];

export const listarPoliticosOptions = () =>
	queryOptions({
		queryKey: [...getPoliticoBaseQueryKey(), "listarPoliticos"],
		queryFn: () => usecase.listar(),
	});

export interface APICreatePoliticoPayload {
	politico: CreatePoliticoDTO;
}

export const CriarPoliticoOptions = () =>
	mutationOptions({
		mutationKey: [...getPoliticoBaseQueryKey(), "criarPolitico"],
		mutationFn: ({
			payload,
		}: MutationVariables<void, APICreatePoliticoPayload>) =>
			usecase.criar(payload.politico),
	});

export interface APIAtualizarPoliticoPayload {
	id: string;
	data: UpdatePoliticoDTO;
}

export const AtualizarPoliticoOptions = () =>
	mutationOptions({
		mutationKey: [...getPoliticoBaseQueryKey(), "atualizarPolitico"],
		mutationFn: ({
			payload,
		}: MutationVariables<void, APIAtualizarPoliticoPayload>) =>
			usecase.atualizar(payload.id, payload.data),
	});

export interface APIExcluirPoliticoPayload {
	id: string;
}
export const ExcluirPoliticoOptions = () =>
	mutationOptions({
		mutationKey: [...getPoliticoBaseQueryKey(), "excluirPolitico"],
		mutationFn: ({
			payload,
		}: MutationVariables<void, APIExcluirPoliticoPayload>) =>
			usecase.excluir(payload.id),
	});
