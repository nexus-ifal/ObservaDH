import {
	CreateEstadoDTO,
	ResponseEstadoDTO,
} from "@/core/domain/dtos/estado.dto";

interface EstadoUseCase {
	listar(): Promise<ResponseEstadoDTO[]>;
	criar(estado: CreateEstadoDTO): Promise<ResponseEstadoDTO>;
}

export default EstadoUseCase;
