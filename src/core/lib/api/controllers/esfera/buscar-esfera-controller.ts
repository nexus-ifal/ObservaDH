import {
	BuscarEsferaService,
	IBuscarEsferaService,
} from "../../service/esfera/buscar-esfera-service";

import { RespostaApi } from "@/domain/models/resposta-api";

export interface IBuscarEsferaController {
	executar(id: string): Promise<RespostaApi>;
}

export class BuscarEsferaController implements IBuscarEsferaController {
	constructor(
		private readonly buscarEsferaService: IBuscarEsferaService = new BuscarEsferaService()
	) {}

	async executar(id: string): Promise<RespostaApi> {
		try {
			if (!id) {
				return new RespostaApi({
					sucesso: false,
					mensagem: "ID da esfera não fornecido",
				});
			}

			const esfera = await this.buscarEsferaService.buscarPorId({ id });

			if (esfera) {
				return new RespostaApi({
					sucesso: true,
					mensagem: "A esfera foi encontrada com sucesso",
					dados: esfera,
				});
			} else {
				return new RespostaApi({
					sucesso: false,
					mensagem: "Nenhuma esfera foi encontrada com este ID",
				});
			}
		} catch (error) {
			return new RespostaApi({
				sucesso: false,
				mensagem: "Erro ao buscar esfera",
				dados: error instanceof Error ? error.message : String(error),
			});
		}
	}
}
