import {
	DadosIdeologiaGenero,
	DadosProjetoEstado,
	DadosReligiaoRaca,
} from "@/core/domain/dtos/dados.dto";

interface DadosUseCase {
	listarProjetosPorUF(esfera?: string): Promise<DadosProjetoEstado[]>;
	listarIdeologiaGenero(): Promise<DadosIdeologiaGenero[]>;
	listarReligiaoRaca(): Promise<DadosReligiaoRaca[]>;
}
export default DadosUseCase;
