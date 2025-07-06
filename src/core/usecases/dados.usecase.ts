import {
	DadosIdeologiaGenero,
	DadosParlamentarProjetosEsfera,
	DadosPautaEsfera,
	DadosPautaPorAno,
	DadosPlPorAno,
	DadosProjetoEstado,
	DadosReligiaoRaca,
} from "@/core/domain/dtos/dados.dto";

interface DadosUseCase {
	listarProjetosPorUF(esfera?: string): Promise<DadosProjetoEstado[]>;
	listarIdeologiaGenero(): Promise<DadosIdeologiaGenero[]>;
	listarReligiaoRaca(): Promise<DadosReligiaoRaca[]>;
	listarProjetosPorAno(): Promise<DadosPlPorAno[]>;
	listarPautaPorAno(): Promise<DadosPautaPorAno[]>;
	listarParlamentarEsfera(esfera?: string): Promise<DadosParlamentarProjetosEsfera>;
	listarPautaPorEsfera(esfera?: string): Promise<DadosPautaEsfera[]>;
}
export default DadosUseCase;
