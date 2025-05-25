import { ResponsePartidoDTO } from "@/core/domain/dtos/partido.dto";

export interface PartidoRepository {
	listar(): Promise<ResponsePartidoDTO[]>;
}
