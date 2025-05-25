import { ResponsePartidoDTO } from "@/core/domain/dtos/partido.dto";

interface PartidoUseCase {
	listar(): Promise<ResponsePartidoDTO[]>
}

export default PartidoUseCase;
