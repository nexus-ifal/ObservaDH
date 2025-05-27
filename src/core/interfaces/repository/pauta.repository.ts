import { ResponsePautaDTO } from "@/core/domain/dtos/pauta.dto";

export interface PautaRepository {
	listar(): Promise<ResponsePautaDTO[]>;
}
