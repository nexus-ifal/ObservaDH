import {
	CreateEstadoDTO,
	ResponseEstadoDTO,
	UpdateEstadoDTO,
} from "@/core/domain/dtos/estado.dto";

interface EstadoUseCase {
	listar(): Promise<ResponseEstadoDTO[]>;
	criar(estado: CreateEstadoDTO): Promise<ResponseEstadoDTO>;
	atualizar(id: string, estado: UpdateEstadoDTO): Promise<ResponseEstadoDTO>;
}

export default EstadoUseCase;
