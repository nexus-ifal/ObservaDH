import {
	IListarAnosService,
	ListarAnosService,
} from "../../service/dados/listar-anos-service";

import { RespostaApi } from "@/core/domain/models/resposta-api";

export interface IListarAnosController {
	executar(): Promise<RespostaApi>;
}

export class ListarAnosController implements IListarAnosController {
	constructor(
		private readonly listarAnosService: IListarAnosService = new ListarAnosService()
	) {}

	async executar() {
		try {
			const dados = await this.listarAnosService.executar();
			return new RespostaApi({
				sucesso: true,
				mensagem: "Anos disponíveis retornados com sucesso",
				dados,
			});
		} catch (error) {
			return new RespostaApi({
				sucesso: false,
				mensagem: "Erro ao listar anos",
				dados: error instanceof Error ? error.message : String(error),
			});
		}
	}
}