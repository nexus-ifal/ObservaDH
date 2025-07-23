import {
	DadosIdeologiaGenero,
	DadosParlamentarProjetosEsfera,
	DadosPautaEsfera,
	DadosPautaPorAno,
	DadosPlPorAno,
	DadosProjetoEstado,
	DadosProjetosDireitosIdeologias,
	DadosReligiaoRaca,
	PartidoRankingDTO,
} from "@/core/domain/dtos/dados.dto";

export interface DadosRepository {
	listarProjetosPorUF(esfera?: string): Promise<DadosProjetoEstado[]>;
	listarIdeologiaGenero(): Promise<DadosIdeologiaGenero[]>;
	listarReligiaoRaca(): Promise<DadosReligiaoRaca[]>;
	listarProjetosPorAno(): Promise<DadosPlPorAno[]>;
	listarPautaPorAno(): Promise<DadosPautaPorAno[]>;
	listarParlamentarEsfera(
		esfera?: string
	): Promise<DadosParlamentarProjetosEsfera>;
	listarPautaPorEsfera(esfera?: string): Promise<DadosPautaEsfera[]>;
	listarProjetosDireitosIdeologias(
		pauta?: string
	): Promise<DadosProjetosDireitosIdeologias>;
	listarAnos(): Promise<{ ano: string }[]>;
	listarRankingPartidos(): Promise<PartidoRankingDTO[]>;
}
