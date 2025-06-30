import {
	DadosIdeologiaGenero,
	DadosProjetoEstado,
	DadosReligiaoRaca,
} from "@/core/domain/dtos/dados.dto";

export interface DadosRepository {
	listarProjetosPorUF(esfera?: string): Promise<DadosProjetoEstado[]>;
	listarIdeologiaGenero(): Promise<DadosIdeologiaGenero[]>;
	listarReligiaoRaca(): Promise<DadosReligiaoRaca[]>;
}
