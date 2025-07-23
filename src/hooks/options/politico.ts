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

/**
 * Query and mutation options for Politico (Politician) operations
 * Provides React Query configurations for politician data management
 */

export const getPoliticoBaseQueryKey = () => ["politico"];

export const listPoliticiansOptions = () =>
	queryOptions({
		queryKey: [...getPoliticoBaseQueryKey(), "listPoliticians"],
		queryFn: () => usecase.list(),
	});

export interface APICreatePoliticoPayload {
	politico: CreatePoliticoDTO;
}

export const createPoliticianOptions = () =>
	mutationOptions({
		mutationKey: [...getPoliticoBaseQueryKey(), "createPolitician"],
		mutationFn: ({
			payload,
		}: MutationVariables<void, APICreatePoliticoPayload>) =>
			usecase.create(payload.politico),
	});

export interface APIAtualizarPoliticoPayload {
	id: string;
	data: UpdatePoliticoDTO;
}

export const updatePoliticianOptions = () =>
	mutationOptions({
		mutationKey: [...getPoliticoBaseQueryKey(), "updatePolitician"],
		mutationFn: ({
			payload,
		}: MutationVariables<void, APIAtualizarPoliticoPayload>) =>
			usecase.update(payload.id, payload.data),
	});

export interface APIExcluirPoliticoPayload {
	id: string;
}
export const deletePoliticianOptions = () =>
	mutationOptions({
		mutationKey: [...getPoliticoBaseQueryKey(), "deletePolitician"],
		mutationFn: ({
			payload,
		}: MutationVariables<void, APIExcluirPoliticoPayload>) =>
			usecase.delete(payload.id),
	});

export interface APIFiltrarPoliticosPayload {
	filtros: DadosParaPesquisaParlamenta;
}

export const filterPoliticiansOptions = (filtros: DadosParaPesquisaParlamenta) =>
	queryOptions({
		queryKey: [...getPoliticoBaseQueryKey(), "filterPoliticians", filtros],
		queryFn: () => usecase.listFiltered(filtros),
	});
