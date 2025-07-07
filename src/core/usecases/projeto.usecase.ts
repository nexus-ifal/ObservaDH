import {
	CreateProjetoDTO,
	ResponseProjetoDTO,
	UpdateProjetoDTO,
} from "@/core/domain/dtos/projeto.dto";

interface ProjetoUseCase {
	listar(): Promise<ResponseProjetoDTO[]>;
	criar(projeto: CreateProjetoDTO): Promise<ResponseProjetoDTO>;
	atualizar(id: string, projeto: UpdateProjetoDTO): Promise<ResponseProjetoDTO>;
	excluir(id: string): Promise<ResponseProjetoDTO>;
	buscar(id: string): Promise<ResponseProjetoDTO | null>;
}

export default ProjetoUseCase;
