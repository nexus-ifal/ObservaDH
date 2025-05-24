import {
	IListarIdeologiaService,
	ListarIdeologiaService,
} from "../../service/ideologia/listar-ideologia-service";

import { RespostaApi } from "@/domain/models/resposta-api";

export interface IListarIdeologiaController {
	executar(): Promise<RespostaApi>;
}

export class ListarIdeologiaController implements IListarIdeologiaController {
	constructor(
		private readonly listarIdeologiaService: IListarIdeologiaService = new ListarIdeologiaService()
	) {}

	async executar(): Promise<RespostaApi> {
		try {
			const ideologias = await this.listarIdeologiaService.executar();

			if (ideologias.length > 0) {
				return new RespostaApi({
					sucesso: true,
					mensagem: `${ideologias.length} ideologia(s) foram encontradas`,
					dados: ideologias,
				});
			} else {
				return new RespostaApi({
					sucesso: false,
					mensagem: "Nenhuma ideologia foi encontrada",
					dados: [],
				});
			}
		} catch (error) {
			return new RespostaApi({
				sucesso: false,
				mensagem: "Erro ao listar ideologias",
				dados: error instanceof Error ? error.message : String(error),
			});
		}
	}
}
