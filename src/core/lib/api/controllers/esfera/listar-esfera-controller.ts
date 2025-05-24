import {
	IListarEsferaService,
	ListarEsferaService,
} from "../../service/esfera/listar-esfera-service";

import { RespostaApi } from "@/domain/models/resposta-api";

export interface IListarEsferaController {
	executar(): Promise<RespostaApi>;
}

export class ListarEsferaController implements IListarEsferaController {
	constructor(
		private readonly listarEsferaService: IListarEsferaService = new ListarEsferaService()
	) {}

	async executar(): Promise<RespostaApi> {
		try {
			const esferas = await this.listarEsferaService.executar();

			if (esferas.length > 0) {
				return new RespostaApi({
					sucesso: true,
					mensagem: `${esferas.length} esfera(s) foram encontradas`,
					dados: esferas,
				});
			} else {
				return new RespostaApi({
					sucesso: false,
					mensagem: "Nenhuma esfera foi encontrada",
					dados: [],
				});
			}
		} catch (error) {
			return new RespostaApi({
				sucesso: false,
				mensagem: "Erro ao listar esferas",
				dados: error instanceof Error ? error.message : String(error),
			});
		}
	}
}
