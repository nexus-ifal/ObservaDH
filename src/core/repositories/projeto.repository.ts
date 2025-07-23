import { FiltrosProjetos, ProjetoDTO } from "../domain/dtos/dados.dto";

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
	buscar(id: string): Promise<ResponseProjetoDTO | null>;
	filtrar(filtros?: FiltrosProjetos): Promise<ProjetoDTO[]>;
}
