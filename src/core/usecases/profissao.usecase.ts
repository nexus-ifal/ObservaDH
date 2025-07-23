import {
	CreateProfissaoDTO,
	ResponseProfissaoDTO,
	UpdateProfissaoDTO,
} from "@/core/domain/dtos/profissao.dto";

/**
 * Use case interface for Profissao (Profession) operations
 * Handles CRUD operations for politician professions while maintaining Portuguese database model names  
 */
interface ProfissaoUseCase {
	list(): Promise<ResponseProfissaoDTO[]>;
	create(profissao: CreateProfissaoDTO): Promise<ResponseProfissaoDTO>;
	update(
		id: string,
		profissao: UpdateProfissaoDTO
	): Promise<ResponseProfissaoDTO>;
	delete(id: string): Promise<ResponseProfissaoDTO>;
}

export default ProfissaoUseCase;
