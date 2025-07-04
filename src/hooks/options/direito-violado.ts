import { queryOptions } from "@tanstack/react-query";

import DIContainer from "../../config/dicontainer";
import { mutationOptions } from "../../utils/mutation/utils";
import { MutationVariables } from "../../utils/mutation/utils";

import {
	CreateDireitoVioladoDTO,
	UpdateDireitoVioladoDTO,
} from "@/core/domain/dtos/direito-violado.dto";

const usecase = DIContainer.getDireitoVioladoUseCase();

export const getDireitoVioladoBaseQueryKey = () => ["direito-violado"];

export const listarDireitoVioladoOptions = () =>
	queryOptions({
		queryKey: [...getDireitoVioladoBaseQueryKey(), "listarDireitoViolado"],
		queryFn: () => usecase.listar(),
	});

export interface APICreateDireitoVioladoPayload {
	direitoViolado: CreateDireitoVioladoDTO;
}

export const CriarDireitoVioladoOptions = () =>
	mutationOptions({
		mutationKey: [...getDireitoVioladoBaseQueryKey(), "criarDireitoViolado"],
		mutationFn: ({
			payload,
		}: MutationVariables<void, APICreateDireitoVioladoPayload>) =>
			usecase.criar(payload.direitoViolado),
	});

export interface APIAtualizarDireitoVioladoPayload {
	id: string;
	data: UpdateDireitoVioladoDTO;
}

export const AtualizarDireitoVioladoOptions = () =>
	mutationOptions({
		mutationKey: [
			...getDireitoVioladoBaseQueryKey(),
			"atualizarDireitoViolado",
		],
		mutationFn: ({
			payload,
		}: MutationVariables<void, APIAtualizarDireitoVioladoPayload>) =>
			usecase.atualizar(payload.id, payload.data),
	});

export interface APIExcluirDireitoVioladoPayload {
	id: string;
}
export const ExcluirDireitoVioladoOptions = () =>
	mutationOptions({
		mutationKey: [...getDireitoVioladoBaseQueryKey(), "excluirDireitoViolado"],
		mutationFn: ({
			payload,
		}: MutationVariables<void, APIExcluirDireitoVioladoPayload>) =>
			usecase.excluir(payload.id),
	});
