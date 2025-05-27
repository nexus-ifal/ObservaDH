import { ResponsePoliticoDTO } from "@/core/domain/dtos/politico.dto";

interface PoliticoUseCase {
	listar(): Promise<ResponsePoliticoDTO[]>;
}

export default PoliticoUseCase;
