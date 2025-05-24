import {
	IListarPoliticoService,
	ListarPoliticoService,
} from "../../service/politico/listar-politico-service";

import { RespostaApi } from "@/domain/models/resposta-api";

export interface IListarPoliticoController {
	executar(): Promise<RespostaApi>;
}

export class ListarPoliticoController implements IListarPoliticoController {
	constructor(
		private readonly listarPoliticoService: IListarPoliticoService = new ListarPoliticoService()
	) {}

	async executar(): Promise<RespostaApi> {
		try {
			const politicos = await this.listarPoliticoService.executar();

			if (politicos.length > 0) {
				return new RespostaApi({
					sucesso: true,
					mensagem: `${politicos.length} político(s) foram encontrados`,
					dados: politicos,
				});
			} else {
				return new RespostaApi({
					sucesso: false,
					mensagem: "Nenhum político foi encontrado",
					dados: [],
				});
			}
		} catch (error) {
			return new RespostaApi({
				sucesso: false,
				mensagem: "Erro ao listar políticos",
				dados: error instanceof Error ? error.message : String(error),
			});
		}
	}
}
