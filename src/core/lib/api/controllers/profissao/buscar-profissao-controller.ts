import {
	BuscarProfissaoService,
	IBuscarProfissaoService,
} from "../../service/profissao/buscar-profissao-service";

import { RespostaApi } from "@/domain/models/resposta-api";

export interface IBuscarProfissaoController {
	executar(id: string): Promise<RespostaApi>;
	buscarPorNome(nome: string): Promise<RespostaApi>;
}

export class BuscarProfissaoController implements IBuscarProfissaoController {
	constructor(
		private readonly buscarProfissaoService: IBuscarProfissaoService = new BuscarProfissaoService()
	) {}

	async executar(id: string): Promise<RespostaApi> {
		try {
			if (!id) {
				return new RespostaApi({
					sucesso: false,
					mensagem: "ID da profissão não fornecido",
				});
			}

			const profissao = await this.buscarProfissaoService.buscarPorId({ id });

			if (profissao) {
				return new RespostaApi({
					sucesso: true,
					mensagem: "A profissão foi encontrada com sucesso",
					dados: profissao,
				});
			} else {
				return new RespostaApi({
					sucesso: false,
					mensagem: "Nenhuma profissão foi encontrada com este ID",
				});
			}
		} catch (error) {
			return new RespostaApi({
				sucesso: false,
				mensagem: "Erro ao buscar profissão",
				dados: error instanceof Error ? error.message : String(error),
			});
		}
	}

	async buscarPorNome(nome: string): Promise<RespostaApi> {
		try {
			if (!nome) {
				return new RespostaApi({
					sucesso: false,
					mensagem: "É necessário informar o nome da profissão",
				});
			}

			const profissao = await this.buscarProfissaoService.buscarPorNome({
				nome,
			});

			if (profissao) {
				return new RespostaApi({
					sucesso: true,
					mensagem: "A profissão foi encontrada com sucesso",
					dados: profissao,
				});
			} else {
				return new RespostaApi({
					sucesso: false,
					mensagem: "Nenhuma profissão foi encontrada com este nome",
				});
			}
		} catch (error) {
			return new RespostaApi({
				sucesso: false,
				mensagem: "Erro ao buscar profissão por nome",
				dados: error instanceof Error ? error.message : String(error),
			});
		}
	}
}
