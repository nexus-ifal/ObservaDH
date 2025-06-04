import { queryOptions } from "@tanstack/react-query";

import DIContainer from "../dicontainer";
import { mutationOptions } from "../services/utils/utils";

import { MutationVariables } from "./../services/utils/utils";

import { CreatePautaDTO, UpdatePautaDTO } from "@/core/domain/dtos/pauta.dto";

const usecase = DIContainer.getPautaUseCase();

export const getPautaBaseQueryKey = () => ["pauta"];

export const listarPautaOptions = () =>
	queryOptions({
		queryKey: [...getPautaBaseQueryKey(), "listarPautas"],
		queryFn: () => usecase.listar(),
	});

export interface APICreatePautaPayload {
	pauta: CreatePautaDTO;
}

export const CriarPautaOptions = () =>
	mutationOptions({
		mutationKey: [...getPautaBaseQueryKey(), "criarPauta"],
		mutationFn: ({ payload }: MutationVariables<void, APICreatePautaPayload>) =>
			usecase.criar(payload.pauta),
	});

export interface APIAtualizarPautaPayload {
	id: string;
	data: UpdatePautaDTO;
}

export const AtualizarPautaOptions = () =>
	mutationOptions({
		mutationKey: [...getPautaBaseQueryKey(), "atualizarPauta"],
		mutationFn: ({
			payload,
		}: MutationVariables<void, APIAtualizarPautaPayload>) =>
			usecase.atualizar(payload.id, payload.data),
	});

export interface APIExcluirPautaPayload {
	id: string;
}
export const ExcluirPautaOptions = () =>
	mutationOptions({
		mutationKey: [...getPautaBaseQueryKey(), "excluirPauta"],
		mutationFn: ({
			payload,
		}: MutationVariables<void, APIExcluirPautaPayload>) =>
			usecase.excluir(payload.id),
	});
