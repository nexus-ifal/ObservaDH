import {
	DadosIdeologiaGenero,
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
}
export default DadosUseCase;
