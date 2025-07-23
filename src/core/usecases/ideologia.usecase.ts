import {
	CreateIdeologiaDTO,
	ResponseIdeologiaDTO,
	UpdateIdeologiaDTO,
} from "@/core/domain/dtos/ideologia.dto";

/**
 * Use case interface for Ideologia (Ideology) operations  
 * Handles CRUD operations for political ideologies while maintaining Portuguese database model names
 */
interface IdeologiaUseCase {
	list(): Promise<ResponseIdeologiaDTO[]>;
	create(ideologia: CreateIdeologiaDTO): Promise<ResponseIdeologiaDTO>;
	update(
		id: string,
		ideologia: UpdateIdeologiaDTO
	): Promise<ResponseIdeologiaDTO>;
	delete(id: string): Promise<ResponseIdeologiaDTO>;
}

export default IdeologiaUseCase;
