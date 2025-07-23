import {
	CreateDireitoVioladoDTO,
	ResponseDireitoVioladoDTO,
	UpdateDireitoVioladoDTO,
} from "@/core/domain/dtos/direito-violado.dto";

/**
 * Use case interface for DireitoViolado (Violated Rights) operations
 * Handles CRUD operations for human rights violations while maintaining Portuguese database model names
 */
interface DireitoVioladoUseCase {
	list(): Promise<ResponseDireitoVioladoDTO[]>;
	create(
		direitoViolado: CreateDireitoVioladoDTO
	): Promise<ResponseDireitoVioladoDTO>;
	update(
		id: string,
		direitoViolado: UpdateDireitoVioladoDTO
	): Promise<ResponseDireitoVioladoDTO>;
	delete(id: string): Promise<ResponseDireitoVioladoDTO>;
}

export default DireitoVioladoUseCase;
