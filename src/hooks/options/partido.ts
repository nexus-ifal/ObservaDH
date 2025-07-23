import { queryOptions } from "@tanstack/react-query";

import DIContainer from "../../config/dicontainer";
import { mutationOptions } from "../../utils/mutation/utils";
import { MutationVariables } from "../../utils/mutation/utils";

import {
	CreatePartidoDTO,
	UpdatePartidoDTO,
} from "@/core/domain/dtos/partido.dto";

const usecase = DIContainer.getPartidoUseCase();

/**
 * Query and mutation options for Partido (Political Party) operations
 * Provides React Query configurations for party data management
 */

export const getPartidoBaseQueryKey = () => ["partido"];

export const listPartiesOptions = () =>
	queryOptions({
		queryKey: [...getPartidoBaseQueryKey(), "listParties"],
		queryFn: () => usecase.list(),
	});

export interface APICreatePartidoPayload {
	partido: CreatePartidoDTO;
}

export const createPartyOptions = () =>
	mutationOptions({
		mutationKey: [...getPartidoBaseQueryKey(), "createParty"],
		mutationFn: ({
			payload,
		}: MutationVariables<void, APICreatePartidoPayload>) =>
			usecase.create(payload.partido),
	});

export interface APIAtualizarPartidoPayload {
	id: string;
	data: UpdatePartidoDTO;
}

export const updatePartyOptions = () =>
	mutationOptions({
		mutationKey: [...getPartidoBaseQueryKey(), "updateParty"],
		mutationFn: ({
			payload,
		}: MutationVariables<void, APIAtualizarPartidoPayload>) =>
			usecase.update(payload.id, payload.data),
	});

export interface APIExcluirPartidoPayload {
	id: string;
}
export const deletePartyOptions = () =>
	mutationOptions({
		mutationKey: [...getPartidoBaseQueryKey(), "deleteParty"],
		mutationFn: ({
			payload,
		}: MutationVariables<void, APIExcluirPartidoPayload>) =>
			usecase.delete(payload.id),
	});
