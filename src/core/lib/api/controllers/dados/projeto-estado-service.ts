import {
	IListarProjetosPorUFService,
	ListarProjetosPorUFService,
} from "../../service/dados/projetos-estado-service";

import { RespostaApi } from "@/core/domain/models/resposta-api";

export interface IListarProjetosPorUFController {
	executar(): Promise<RespostaApi>;
}

export class ListarProjetosPorUFController
	implements IListarProjetosPorUFController
{
	constructor(
		private readonly listarProjetosPorUFService: IListarProjetosPorUFService = new ListarProjetosPorUFService()
	) {}

	async executar() {
		try {
			const dados = await this.listarProjetosPorUFService.executar();
			return new RespostaApi({
				sucesso: true,
				mensagem: `${dados.length} estados encontrados`,
				dados,
			});
		} catch (error) {
			return new RespostaApi({
				sucesso: false,
				mensagem: "Erro ao listar projetos por estado",
				dados: error instanceof Error ? error.message : String(error),
			});
		}
	}
}
