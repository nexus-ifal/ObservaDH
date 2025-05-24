import {
	BuscarIdeologiaService,
	IBuscarIdeologiaService,
} from "../../service/ideologia/buscar-ideologia-service";

import { RespostaApi } from "@/domain/models/resposta-api";

export interface IBuscarIdeologiaController {
	executar(id: string): Promise<RespostaApi>;
}

export class BuscarIdeologiaController implements IBuscarIdeologiaController {
	constructor(
		private readonly buscarIdeologiaService: IBuscarIdeologiaService = new BuscarIdeologiaService()
	) {}

	async executar(id: string): Promise<RespostaApi> {
		try {
			if (!id) {
				return new RespostaApi({
					sucesso: false,
					mensagem: "ID da ideologia não fornecido",
				});
			}

			const ideologia = await this.buscarIdeologiaService.buscarPorId({ id });

			if (ideologia) {
				return new RespostaApi({
					sucesso: true,
					mensagem: "A ideologia foi encontrada com sucesso",
					dados: ideologia,
				});
			} else {
				return new RespostaApi({
					sucesso: false,
					mensagem: "Nenhuma ideologia foi encontrada com este ID",
				});
			}
		} catch (error) {
			return new RespostaApi({
				sucesso: false,
				mensagem: "Erro ao buscar ideologia",
				dados: error instanceof Error ? error.message : String(error),
			});
		}
	}
}
