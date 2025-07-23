import { queryOptions } from "@tanstack/react-query";

import DIContainer from "../../config/dicontainer";
import { mutationOptions } from "../../utils/mutation/utils";
import { MutationVariables } from "../../utils/mutation/utils";

import { FiltrosProjetos } from "@/core/domain/dtos/dados.dto";
import {
	CreateProjetoDTO,
	UpdateProjetoDTO,
} from "@/core/domain/dtos/projeto.dto";

const usecase = DIContainer.getProjetoUseCase();

/**
 * Query and mutation options for Projeto (Legislative Project) operations
 * Provides React Query configurations for project data management
 */

export const getProjetoBaseQueryKey = () => ["projeto"];

export const listProjectsOptions = () =>
	queryOptions({
		queryKey: [...getProjetoBaseQueryKey(), "listProjects"],
		queryFn: () => usecase.list(),
	});

export interface APICreateProjetoPayload {
	projeto: CreateProjetoDTO;
}

export const createProjectOptions = () =>
	mutationOptions({
		mutationKey: [...getProjetoBaseQueryKey(), "createProject"],
		mutationFn: ({
			payload,
		}: MutationVariables<void, APICreateProjetoPayload>) =>
			usecase.create(payload.projeto),
	});

export interface APIAtualizarProjetoPayload {
	id: string;
	data: UpdateProjetoDTO;
}

export const updateProjectOptions = () =>
	mutationOptions({
		mutationKey: [...getProjetoBaseQueryKey(), "updateProject"],
		mutationFn: ({
			payload,
		}: MutationVariables<void, APIAtualizarProjetoPayload>) =>
			usecase.update(payload.id, payload.data),
	});

export interface APIExcluirProjetoPayload {
	id: string;
}

export const deleteProjectOptions = () =>
	mutationOptions({
		mutationKey: [...getProjetoBaseQueryKey(), "deleteProject"],
		mutationFn: ({
			payload,
		}: MutationVariables<void, APIExcluirProjetoPayload>) =>
			usecase.delete(payload.id),
	});

export const findProjectByIdOptions = (id: string) =>
	queryOptions({
		queryKey: [...getProjetoBaseQueryKey(), "findProjectById"],
		queryFn: () => usecase.findById(id),
	});

export const filterProjectsOptions = (filters?: FiltrosProjetos) =>
	queryOptions({
		queryKey: [...getProjetoBaseQueryKey(), "filterProjects", filters],
		queryFn: () => usecase.filter(filters),
	});
