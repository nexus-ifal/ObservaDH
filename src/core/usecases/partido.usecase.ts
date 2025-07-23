import {
	CreatePartidoDTO,
	ResponsePartidoDTO,
	UpdatePartidoDTO,
} from "@/core/domain/dtos/partido.dto";

/**
 * Use case interface for Partido (Political Party) operations  
 * Handles CRUD operations for political parties while maintaining Portuguese database model names
 */
interface PartidoUseCase {
	list(): Promise<ResponsePartidoDTO[]>;
	create(partido: CreatePartidoDTO): Promise<ResponsePartidoDTO>;
	update(id: string, partido: UpdatePartidoDTO): Promise<ResponsePartidoDTO>;
	delete(id: string): Promise<ResponsePartidoDTO>;
}

export default PartidoUseCase;
