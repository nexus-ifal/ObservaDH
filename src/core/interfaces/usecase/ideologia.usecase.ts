import { ResponseIdeologiaDTO } from "@/core/domain/dtos/ideologia.dto";

interface IdeologiaUseCase {
	listar(): Promise<ResponseIdeologiaDTO[]>;
}

export default IdeologiaUseCase;
