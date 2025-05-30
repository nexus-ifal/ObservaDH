import { ResponseIdeologiaDTO } from "@/core/domain/dtos/ideologia.dto";

export interface IdeologiaRepository {
	listar(): Promise<ResponseIdeologiaDTO[]>;
}
