import { FiltrosProjetos, ProjetoDTO } from "../domain/dtos/dados.dto";

import {
	CreateProjetoDTO,
	ResponseProjetoDTO,
	UpdateProjetoDTO,
} from "@/core/domain/dtos/projeto.dto";

/**
 * Use case interface for Projeto (Project) operations
 * Handles CRUD operations and filtering for legislative projects while maintaining Portuguese database model names
 */
interface ProjetoUseCase {
	list(): Promise<ResponseProjetoDTO[]>;
	create(projeto: CreateProjetoDTO): Promise<ResponseProjetoDTO>;
	update(id: string, projeto: UpdateProjetoDTO): Promise<ResponseProjetoDTO>;
	delete(id: string): Promise<ResponseProjetoDTO>;
	findById(id: string): Promise<ResponseProjetoDTO | null>;
	filter(filters?: FiltrosProjetos): Promise<ProjetoDTO[]>;
}

export default ProjetoUseCase;
