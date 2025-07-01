import { queryOptions } from "@tanstack/react-query";

import DIContainer from "../../config/dicontainer";
import { mutationOptions, MutationVariables } from "../../utils/mutation/utils";

import {
	CreateIdeologiaDTO,
	UpdateIdeologiaDTO,
} from "@/core/domain/dtos/ideologia.dto";

const usecase = DIContainer.getIdeologiaUseCase();

export const getIdeologiaBaseQueryKey = () => ["ideologia"];

export const listarIdeologiaOptions = () =>
	queryOptions({
		queryKey: [...getIdeologiaBaseQueryKey(), "listarIdeologias"],
		queryFn: () => usecase.listar(),
	});

export interface APICreateIdeologiaPayload {
	ideologia: CreateIdeologiaDTO;
}

export const CriarIdeologiaOptions = () =>
	mutationOptions({
		mutationKey: [...getIdeologiaBaseQueryKey(), "criarIdeologia"],
		mutationFn: ({
			payload,
		}: MutationVariables<void, APICreateIdeologiaPayload>) =>
			usecase.criar(payload.ideologia),
	});

export interface APIAtualizarIdeologiaPayload {
	id: string;
	data: UpdateIdeologiaDTO;
}

export const AtualizarIdeologiaOptions = () =>
	mutationOptions({
		mutationKey: [...getIdeologiaBaseQueryKey(), "atualizarIdeologia"],
		mutationFn: ({
			payload,
		}: MutationVariables<void, APIAtualizarIdeologiaPayload>) =>
			usecase.atualizar(payload.id, payload.data),
	});

export interface APIExcluirIdeologiaPayload {
	id: string;
}

export const ExcluirIdeologiaOptions = () =>
	mutationOptions({
		mutationKey: [...getIdeologiaBaseQueryKey(), "excluirIdeologia"],
		mutationFn: ({
			payload,
		}: MutationVariables<void, APIExcluirIdeologiaPayload>) =>
			usecase.excluir(payload.id),
	});
