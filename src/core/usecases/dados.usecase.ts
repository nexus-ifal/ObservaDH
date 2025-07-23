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

/**
 * Use case interface for data analytics and reporting operations
 * Handles complex data queries for charts, statistics and reports
 * Source: Custom analytics aggregations for dashboard visualizations
 */
interface DadosUseCase {
	listProjectsByState(sphere?: string): Promise<DadosProjetoEstado[]>;
	listIdeologyByGender(): Promise<DadosIdeologiaGenero[]>;
	listReligionByRace(): Promise<DadosReligiaoRaca[]>;
	listProjectsByYear(): Promise<DadosPlPorAno[]>;
	listAgendaByYear(): Promise<DadosPautaPorAno[]>;
	listParliamentariansBySphere(
		sphere?: string
	): Promise<DadosParlamentarProjetosEsfera>;
	listAgendaBySphere(sphere?: string): Promise<DadosPautaEsfera[]>;
	listProjectsRightsIdeologies(
		agenda?: string
	): Promise<DadosProjetosDireitosIdeologias>;
	listYears(): Promise<{ ano: string }[]>;
	listPartyRankings(): Promise<PartidoRankingDTO[]>;
}

export default DadosUseCase;
