import { DadosParaPesquisaParlamenta } from "../domain/dtos/dados.dto";

import {
	CreatePoliticoDTO,
	ResponsePoliticoDTO,
	UpdatePoliticoDTO,
} from "@/core/domain/dtos/politico.dto";

/**
 * Use case interface for Politico (Politician) operations
 * Handles CRUD operations and filtering for politicians while maintaining Portuguese database model names
 */
interface PoliticoUseCase {
	list(): Promise<ResponsePoliticoDTO[]>;
	create(politico: CreatePoliticoDTO): Promise<ResponsePoliticoDTO>;
	update(
		id: string,
		politico: UpdatePoliticoDTO
	): Promise<ResponsePoliticoDTO>;
	delete(id: string): Promise<ResponsePoliticoDTO>;
	listFiltered(
		filters: DadosParaPesquisaParlamenta
	): Promise<ResponsePoliticoDTO[]>;
}

export default PoliticoUseCase;
