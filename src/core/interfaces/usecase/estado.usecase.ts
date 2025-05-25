import { ResponseEstadoDTO } from "@/core/domain/dtos/estado.dto";

interface EstadoUseCase {
	listar(): Promise<ResponseEstadoDTO[]>;
}

export default EstadoUseCase;
