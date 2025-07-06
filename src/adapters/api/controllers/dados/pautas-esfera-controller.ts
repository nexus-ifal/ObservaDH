import {
	IListarPautasPorEsferaService,
	ListarPautasPorEsferaService,
} from "../../service/dados/pautas-esfera-service";

import { RespostaApi } from "@/core/domain/models/resposta-api";

export interface IListarPautasPorEsferaController {
	executar(esfera?: string): Promise<RespostaApi>;
}

export class ListarPautasPorEsferaController
	implements IListarPautasPorEsferaController
{
	constructor(
		private readonly listarPautasPorEsferaService: IListarPautasPorEsferaService = new ListarPautasPorEsferaService()
	) {}

	async executar(esfera?: string) {
		try {
			const dados = await this.listarPautasPorEsferaService.executar(esfera);
			return new RespostaApi({
				sucesso: true,
				mensagem: `Retorno de pautas${esfera ? ` da esfera ${esfera}` : ""}`,
				dados,
			});
		} catch (error) {
			return new RespostaApi({
				sucesso: false,
				mensagem: "Erro ao listar pautas por esfera",
				dados: error instanceof Error ? error.message : String(error),
			});
		}
	}
}
