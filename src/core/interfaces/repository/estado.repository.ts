import { ResponseEstadoDTO } from "@/core/domain/dtos/estado.dto";

export interface EstadoRepository {
	listar(): Promise<ResponseEstadoDTO[]>;
}
