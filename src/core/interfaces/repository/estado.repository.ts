import {
	CreateEstadoDTO,
	ResponseEstadoDTO,
} from "@/core/domain/dtos/estado.dto";

export interface EstadoRepository {
	listar(): Promise<ResponseEstadoDTO[]>;
	criar(estado: CreateEstadoDTO): Promise<ResponseEstadoDTO>;
}
