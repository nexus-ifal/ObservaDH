import { DadosProjetoEstado } from "@/core/domain/dtos/dados.dto";

export interface DadosRepository {
	listarProjetosPorUF(esfera?: string): Promise<DadosProjetoEstado[]>;
}
