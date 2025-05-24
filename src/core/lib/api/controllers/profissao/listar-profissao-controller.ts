import {
	IListarProfissaoService,
	ListarProfissaoService,
} from "../../service/profissao/listar-profissao-service";

import { RespostaApi } from "@/domain/models/resposta-api";

export interface IListarProfissaoController {
	executar(): Promise<RespostaApi>;
}

export class ListarProfissaoController implements IListarProfissaoController {
	constructor(
		private readonly listarProfissaoService: IListarProfissaoService = new ListarProfissaoService()
	) {}

	async executar(): Promise<RespostaApi> {
		try {
			const profissoes = await this.listarProfissaoService.executar();

			if (profissoes.length > 0) {
				return new RespostaApi({
					sucesso: true,
					mensagem: `${profissoes.length} profissão(ões) foram encontradas`,
					dados: profissoes,
				});
			} else {
				return new RespostaApi({
					sucesso: false,
					mensagem: "Nenhuma profissão foi encontrada",
					dados: [],
				});
			}
		} catch (error) {
			return new RespostaApi({
				sucesso: false,
				mensagem: "Erro ao listar profissões",
				dados: error instanceof Error ? error.message : String(error),
			});
		}
	}
}
