import {
	IListarProjetoPorAnoService,
	ListarProjetoPorAnoService,
} from "../../service/dados/projetos-por-ano-service";

import { RespostaApi } from "@/core/domain/models/resposta-api";

export interface IListarProjetosPorAnoController {
	executar(): Promise<RespostaApi>;
}

export class ListarProjetosPorAnoController
	implements IListarProjetosPorAnoController
{
	constructor(
		private readonly listarProjetoPorAnoService: IListarProjetoPorAnoService = new ListarProjetoPorAnoService()
	) {}

	async executar(): Promise<RespostaApi> {
		try {
			const projetosPorAno = await this.listarProjetoPorAnoService.executar();

			if (projetosPorAno.length > 0) {
				return new RespostaApi({
					sucesso: true,
					mensagem: `${projetosPorAno.length} projeto(s) foram encontrados`,
					dados: projetosPorAno,
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
				mensagem: "Erro ao listar projetos por ano",
				dados: error instanceof Error ? error.message : String(error),
			});
		}
	}
}
