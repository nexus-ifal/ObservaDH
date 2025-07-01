import { queryOptions } from "@tanstack/react-query";

import DIContainer from "../../config/dicontainer";
import { mutationOptions } from "../../utils/mutation/utils";
import { MutationVariables } from "../../utils/mutation/utils";

import {
	CreateProfissaoDTO,
	UpdateProfissaoDTO,
} from "@/core/domain/dtos/profissao.dto";

const usecase = DIContainer.getProfissaoUseCase();

export const getProfissaoBaseQueryKey = () => ["profissao"];

export const listarProfissoesOptions = () =>
	queryOptions({
		queryKey: [...getProfissaoBaseQueryKey(), "listarProfissaos"],
		queryFn: () => usecase.listar(),
	});

export interface APICreateProfissaoPayload {
	profissao: CreateProfissaoDTO;
}

export const CriarProfissaoOptions = () =>
	mutationOptions({
		mutationKey: [...getProfissaoBaseQueryKey(), "criarProfissao"],
		mutationFn: ({
			payload,
		}: MutationVariables<void, APICreateProfissaoPayload>) =>
			usecase.criar(payload.profissao),
	});

export interface APIAtualizarProfissaoPayload {
	id: string;
	data: UpdateProfissaoDTO;
}

export const AtualizarProfissaoOptions = () =>
	mutationOptions({
		mutationKey: [...getProfissaoBaseQueryKey(), "atualizarProfissao"],
		mutationFn: ({
			payload,
		}: MutationVariables<void, APIAtualizarProfissaoPayload>) =>
			usecase.atualizar(payload.id, payload.data),
	});

export interface APIExcluirProfissaoPayload {
	id: string;
}

export const ExcluirProfissaoOptions = () =>
	mutationOptions({
		mutationKey: [...getProfissaoBaseQueryKey(), "excluirProfissao"],
		mutationFn: ({
			payload,
		}: MutationVariables<void, APIExcluirProfissaoPayload>) =>
			usecase.excluir(payload.id),
	});
