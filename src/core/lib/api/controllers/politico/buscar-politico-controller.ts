import {
	BuscarPoliticoService,
	IBuscarPoliticoService,
} from "../../service/politico/buscar-politico-service";

import { RespostaApi } from "@/domain/models/resposta-api";

export interface IBuscarPoliticoController {
	executar(id: string): Promise<RespostaApi>;
}

export class BuscarPoliticoController implements IBuscarPoliticoController {
	constructor(
		private readonly buscarPoliticoService: IBuscarPoliticoService = new BuscarPoliticoService()
	) {}

	async executar(id: string): Promise<RespostaApi> {
		try {
			if (!id) {
				return new RespostaApi({
					sucesso: false,
					mensagem: "ID do político não fornecido",
				});
			}

			const politico = await this.buscarPoliticoService.buscarPorId({ id });

			if (politico) {
				return new RespostaApi({
					sucesso: true,
					mensagem: "O político foi encontrado com sucesso",
					dados: politico,
				});
			} else {
				return new RespostaApi({
					sucesso: false,
					mensagem: "Nenhum político foi encontrado com este ID",
				});
			}
		} catch (error) {
			return new RespostaApi({
				sucesso: false,
				mensagem: "Erro ao buscar político",
				dados: error instanceof Error ? error.message : String(error),
			});
		}
	}
}
