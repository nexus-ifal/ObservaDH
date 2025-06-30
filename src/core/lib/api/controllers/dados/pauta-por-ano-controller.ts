import {
	IListarPautasPorAnoService,
	ListarPautasPorAnoService,
} from "../../service/dados/pauta-por-ano-service";

import { RespostaApi } from "@/core/domain/models/resposta-api";

export interface IListarPautasPorAnoController {
	executar(): Promise<RespostaApi>;
}

export class ListarPautasPorAnoController
	implements IListarPautasPorAnoController
{
	constructor(
		private readonly listarPautasPorAnoService: IListarPautasPorAnoService = new ListarPautasPorAnoService()
	) {}

	async executar(): Promise<RespostaApi> {
		try {
			const dados = await this.listarPautasPorAnoService.executar();
			return new RespostaApi({
				sucesso: true,
				mensagem: `Dados para o ano ${dados.length} encontrados`,
				dados: dados,
			});
		} catch (error) {
			return new RespostaApi({
				sucesso: false,
				mensagem: "Erro ao listar pautas por ano",
				dados: error instanceof Error ? error.message : String(error),
			});
		}
	}
}
