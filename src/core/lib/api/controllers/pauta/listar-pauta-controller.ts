import {
	IListarPautaService,
	ListarPautaService,
} from "../../service/pauta/listar-pauta-service";

import { RespostaApi } from "@/domain/models/resposta-api";

export interface IListarPautaController {
	executar(): Promise<RespostaApi>;
}

export class ListarPautaController implements IListarPautaController {
	constructor(
		private readonly listarPautaService: IListarPautaService = new ListarPautaService()
	) {}

	async executar(): Promise<RespostaApi> {
		try {
			const pautas = await this.listarPautaService.executar();

			if (pautas.length > 0) {
				return new RespostaApi({
					sucesso: true,
					mensagem: `${pautas.length} pauta(s) foram encontradas`,
					dados: pautas,
				});
			} else {
				return new RespostaApi({
					sucesso: false,
					mensagem: "Nenhuma pauta foi encontrada",
					dados: [],
				});
			}
		} catch (error) {
			return new RespostaApi({
				sucesso: false,
				mensagem: "Erro ao listar pautas",
				dados: error instanceof Error ? error.message : String(error),
			});
		}
	}
}
