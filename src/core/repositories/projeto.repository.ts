import {
	CreateProjetoDTO,
	ResponseProjetoDTO,
	UpdateProjetoDTO,
} from "@/core/domain/dtos/projeto.dto";

export interface ProjetoRepository {
	listar(): Promise<ResponseProjetoDTO[]>;
	criar(projeto: CreateProjetoDTO): Promise<ResponseProjetoDTO>;
	atualizar(id: string, projeto: UpdateProjetoDTO): Promise<ResponseProjetoDTO>;
	excluir(id: string): Promise<ResponseProjetoDTO>;
}
