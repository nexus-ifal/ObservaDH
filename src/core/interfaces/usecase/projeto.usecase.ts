import { ResponseProjetoDTO } from "@/core/domain/dtos/projeto.dto";

interface ProjetoUseCase {
	listar(): Promise<ResponseProjetoDTO[]>;
}

export default ProjetoUseCase;
