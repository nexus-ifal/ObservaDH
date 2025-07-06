import {
	DadosIdeologiaGenero,
	DadosParlamentarEsfera,
	DadosPautaEsfera,
	DadosPautaPorAno,
	DadosPlPorAno,
	DadosProjetoEstado,
	DadosReligiaoRaca,
} from "@/core/domain/dtos/dados.dto";

export interface DadosRepository {
	listarProjetosPorUF(esfera?: string): Promise<DadosProjetoEstado[]>;
	listarIdeologiaGenero(): Promise<DadosIdeologiaGenero[]>;
	listarReligiaoRaca(): Promise<DadosReligiaoRaca[]>;
	listarProjetosPorAno(): Promise<DadosPlPorAno[]>;
	listarPautaPorAno(): Promise<DadosPautaPorAno[]>;
	listarParlamentarEsfera(esfera: string): Promise<DadosParlamentarEsfera>;
	listarPautaPorEsfera(esfera: string): Promise<DadosPautaEsfera[]>;
}
