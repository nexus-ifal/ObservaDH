import {
	DadosIdeologiaGenero,
	DadosProjetoEstado,
} from "@/core/domain/dtos/dados.dto";

interface DadosUseCase {
	listarProjetosPorUF(esfera?: string): Promise<DadosProjetoEstado[]>;
	listarIdeologiaGenero(): Promise<DadosIdeologiaGenero[]>;
}
export default DadosUseCase;
