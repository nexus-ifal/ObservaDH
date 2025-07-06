import { queryOptions } from "@tanstack/react-query";

import DIContainer from "../../config/dicontainer";
import { mutationOptions } from "../../utils/mutation/utils";
import { MutationVariables } from "../../utils/mutation/utils";

import { DadosParaPesquisaParlamenta } from "@/core/domain/dtos/dados.dto";
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

export interface APIFiltrarPoliticosPayload {
	filtros: DadosParaPesquisaParlamenta;
}

export const FiltrarPoliticosOptions = (filtros: DadosParaPesquisaParlamenta) =>
	queryOptions({
		queryKey: [...getPoliticoBaseQueryKey(), "filtrarPoliticos", filtros],
		queryFn: () => usecase.listarFiltrados(filtros),
	});
