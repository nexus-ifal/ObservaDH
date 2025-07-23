import {
	CreateEstadoDTO,
	ResponseEstadoDTO,
	UpdateEstadoDTO,
} from "@/core/domain/dtos/estado.dto";

/**
 * Use case interface for Estado (State) operations
 * Handles CRUD operations for Brazilian states while maintaining Portuguese database model names
 */
interface EstadoUseCase {
	list(): Promise<ResponseEstadoDTO[]>;
	create(estado: CreateEstadoDTO): Promise<ResponseEstadoDTO>;
	update(id: string, estado: UpdateEstadoDTO): Promise<ResponseEstadoDTO>;
	delete(id: string): Promise<ResponseEstadoDTO>;
}

export default EstadoUseCase;
