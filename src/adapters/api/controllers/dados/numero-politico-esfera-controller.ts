import {
	IListarParlamentaresPorEsferaService,
	ListarParlamentaresPorEsferaService,
} from "../../service/dados/numero-politico-esfera-service";

import { RespostaApi } from "@/core/domain/models/resposta-api";

export interface IListarParlamentaresPorEsferaController {
	executar(esfera?: string): Promise<RespostaApi>;
}

export class ListarParlamentaresPorEsferaController
	implements IListarParlamentaresPorEsferaController
{
	constructor(
		private readonly listarParlamentaresPorEsferaService: IListarParlamentaresPorEsferaService = new ListarParlamentaresPorEsferaService()
	) {}

	async executar(esfera?: string) {
		try {
			const dados =
				await this.listarParlamentaresPorEsferaService.executar(esfera);
			return new RespostaApi({
				sucesso: true,
				mensagem: `esfera encontrada`,
				dados,
			});
		} catch (error) {
			return new RespostaApi({
				sucesso: false,
				mensagem: "Erro ao listar parlamentares por esfera",
				dados: error instanceof Error ? error.message : String(error),
			});
		}
	}
}
