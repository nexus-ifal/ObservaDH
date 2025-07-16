import {
	IListarProjetoDireitosService,
	ListarProjetoDireitosService,
} from "../../service/dados/projetos-direitos-ideologias-service";

import { RespostaApi } from "@/core/domain/models/resposta-api";

export interface IListarProjetoDireitosController {
	executar(pautaId?: string): Promise<RespostaApi>;
}

export class ListarProjetoDireitosController
	implements IListarProjetoDireitosController
{
	constructor(
		private readonly listarProjetoDireitosService: IListarProjetoDireitosService = new ListarProjetoDireitosService()
	) {}

	async executar(pautaId?: string): Promise<RespostaApi> {
		try {
			const dados = await this.listarProjetoDireitosService.executar(pautaId);
			return new RespostaApi({
				sucesso: true,
				mensagem: "Dados encontrados com sucesso",
				dados,
			});
		} catch (error) {
			return new RespostaApi({
				sucesso: false,
				mensagem: "Erro ao listar direitos violados de projetos",
				dados: error instanceof Error ? error.message : String(error),
			});
		}
	}
}
