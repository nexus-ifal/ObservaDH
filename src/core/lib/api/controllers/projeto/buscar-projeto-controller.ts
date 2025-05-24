import {
	BuscarProjetoService,
	IBuscarProjetoService,
} from "../../service/projeto/buscar-projeto-service";

import { RespostaApi } from "@/domain/models/resposta-api";

export interface IBuscarProjetoController {
	executar(id: string): Promise<RespostaApi>;
	buscarPorNumeroPl(numeroPl: string): Promise<RespostaApi>;
}

export class BuscarProjetoController implements IBuscarProjetoController {
	constructor(
		private readonly buscarProjetoService: IBuscarProjetoService = new BuscarProjetoService()
	) {}

	async executar(id: string): Promise<RespostaApi> {
		try {
			if (!id) {
				return new RespostaApi({
					sucesso: false,
					mensagem: "ID do projeto não fornecido",
				});
			}

			const projeto = await this.buscarProjetoService.buscarPorId({ id });

			if (projeto) {
				return new RespostaApi({
					sucesso: true,
					mensagem: "O projeto foi encontrado com sucesso",
					dados: projeto,
				});
			} else {
				return new RespostaApi({
					sucesso: false,
					mensagem: "Nenhum projeto foi encontrado com este ID",
				});
			}
		} catch (error) {
			return new RespostaApi({
				sucesso: false,
				mensagem: "Erro ao buscar projeto",
				dados: error instanceof Error ? error.message : String(error),
			});
		}
	}

	async buscarPorNumeroPl(numeroPl: string): Promise<RespostaApi> {
		try {
			if (!numeroPl) {
				return new RespostaApi({
					sucesso: false,
					mensagem: "É necessário informar o número PL do projeto",
				});
			}

			const projeto = await this.buscarProjetoService.buscarPorNumeroPl({
				numeroPl,
			});

			if (projeto) {
				return new RespostaApi({
					sucesso: true,
					mensagem: "O projeto foi encontrado com sucesso",
					dados: projeto,
				});
			} else {
				return new RespostaApi({
					sucesso: false,
					mensagem: "Nenhum projeto foi encontrado com este número PL",
				});
			}
		} catch (error) {
			return new RespostaApi({
				sucesso: false,
				mensagem: "Erro ao buscar projeto por número PL",
				dados: error instanceof Error ? error.message : String(error),
			});
		}
	}
}
