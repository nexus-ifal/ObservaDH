import { ResponsePautaDTO } from "@/core/domain/dtos/pauta.dto";

interface PautaUseCase {
	listar(): Promise<ResponsePautaDTO[]>;
}

export default PautaUseCase;
