import {
	IRankingPartidosService,
	RankingPartidosService,
} from "../../service/dados/ranking-partidos-service";

import { RespostaApi } from "@/core/domain/models/resposta-api";

export interface IRankingPartidosController {
	executar(): Promise<RespostaApi>;
}

export class RankingPartidosController
	implements IRankingPartidosController
{
	constructor(
		private readonly rankingPartidosService: IRankingPartidosService = new RankingPartidosService()
	) {}

	async executar(): Promise<RespostaApi> {
		try {
			const dados = await this.rankingPartidosService.executar();
			return new RespostaApi({
				sucesso: true,
				mensagem: `Ranking de ${dados.length} partidos encontrado`,
				dados: dados,
			});
		} catch (error) {
			return new RespostaApi({
				sucesso: false,
				mensagem: "Erro ao obter ranking de partidos",
				dados: error instanceof Error ? error.message : String(error),
			});
		}
	}
}