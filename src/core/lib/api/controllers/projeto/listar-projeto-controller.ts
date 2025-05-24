import {
	IListarProjetoService,
	ListarProjetoService,
} from "../../service/projeto/listar-projeto-service";

import { RespostaApi } from "@/domain/models/resposta-api";

export interface IListarProjetoController {
	executar(): Promise<RespostaApi>;
}

export class ListarProjetoController implements IListarProjetoController {
	constructor(
		private readonly listarProjetoService: IListarProjetoService = new ListarProjetoService()
	) {}

	async executar(): Promise<RespostaApi> {
		try {
			const projetos = await this.listarProjetoService.executar();

			if (projetos.length > 0) {
				return new RespostaApi({
					sucesso: true,
					mensagem: `${projetos.length} projeto(s) foram encontrados`,
					dados: projetos,
				});
			} else {
				return new RespostaApi({
					sucesso: false,
					mensagem: "Nenhum projeto foi encontrado",
					dados: [],
				});
			}
		} catch (error) {
			return new RespostaApi({
				sucesso: false,
				mensagem: "Erro ao listar projetos",
				dados: error instanceof Error ? error.message : String(error),
			});
		}
	}
}
