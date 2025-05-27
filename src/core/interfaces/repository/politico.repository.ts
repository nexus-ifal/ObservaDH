import { ResponsePoliticoDTO } from "@/core/domain/dtos/politico.dto";

export interface PoliticoRepository {
	listar(): Promise<ResponsePoliticoDTO[]>;
}
