import { ResponseProjetoDTO } from "@/core/domain/dtos/projeto.dto";

export interface ProjetoRepository {
	listar(): Promise<ResponseProjetoDTO[]>;
}
