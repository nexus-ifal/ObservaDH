import { queryOptions } from "@tanstack/react-query";

import DIContainer from "../dicontainer";
import { mutationOptions } from "../services/utils/utils";
import { MutationVariables } from "../services/utils/utils";

import {
	CreateProjetoDTO,
	UpdateProjetoDTO,
} from "@/core/domain/dtos/projeto.dto";

const usecase = DIContainer.getProjetoUseCase();

export const getProjetoBaseQueryKey = () => ["projeto"];

export const listarProjetosOptions = () =>
	queryOptions({
		queryKey: [...getProjetoBaseQueryKey(), "listarProjetos"],
		queryFn: () => usecase.listar(),
	});

export interface APICreateProjetoPayload {
	projeto: CreateProjetoDTO;
}

export const CriarProjetoOptions = () =>
	mutationOptions({
		mutationKey: [...getProjetoBaseQueryKey(), "criarProjeto"],
		mutationFn: ({
			payload,
		}: MutationVariables<void, APICreateProjetoPayload>) =>
			usecase.criar(payload.projeto),
	});

export interface APIAtualizarProjetoPayload {
	id: string;
	data: UpdateProjetoDTO;
}

export const AtualizarProjetoOptions = () =>
	mutationOptions({
		mutationKey: [...getProjetoBaseQueryKey(), "atualizarProjeto"],
		mutationFn: ({
			payload,
		}: MutationVariables<void, APIAtualizarProjetoPayload>) =>
			usecase.atualizar(payload.id, payload.data),
	});

export interface APIExcluirProjetoPayload {
	id: string;
}

export const ExcluirProjetoOptions = () =>
	mutationOptions({
		mutationKey: [...getProjetoBaseQueryKey(), "excluirProjeto"],
		mutationFn: ({
			payload,
		}: MutationVariables<void, APIExcluirProjetoPayload>) =>
			usecase.excluir(payload.id),
	});
