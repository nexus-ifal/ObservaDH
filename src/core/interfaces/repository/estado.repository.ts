import {
	CreateEstadoDTO,
	ResponseEstadoDTO,
	UpdateEstadoDTO,
} from "@/core/domain/dtos/estado.dto";

export interface EstadoRepository {
	listar(): Promise<ResponseEstadoDTO[]>;
	criar(estado: CreateEstadoDTO): Promise<ResponseEstadoDTO>;
	atualizar(id: string, estado: UpdateEstadoDTO): Promise<ResponseEstadoDTO>;
	excluir(id: string): Promise<ResponseEstadoDTO>;
}
