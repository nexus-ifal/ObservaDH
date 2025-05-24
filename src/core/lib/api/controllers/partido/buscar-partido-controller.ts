import {
	BuscarPartidoService,
	IBuscarPartidoService,
} from "../../service/partido/buscar-partido-service";

import { RespostaApi } from "@/domain/models/resposta-api";

export interface IBuscarPartidoController {
	executar(id: string): Promise<RespostaApi>;
	buscarPorNome(nome: string): Promise<RespostaApi>;
	buscarPorSigla(sigla: string): Promise<RespostaApi>;
}

export class BuscarPartidoController implements IBuscarPartidoController {
	constructor(
		private readonly buscarPartidoService: IBuscarPartidoService = new BuscarPartidoService()
	) {}

	async executar(id: string): Promise<RespostaApi> {
		try {
			if (!id) {
				return new RespostaApi({
					sucesso: false,
					mensagem: "ID do partido não fornecido",
				});
			}

			const partido = await this.buscarPartidoService.buscarPorId({ id });

			if (partido) {
				return new RespostaApi({
					sucesso: true,
					mensagem: "O partido foi encontrado com sucesso",
					dados: partido,
				});
			} else {
				return new RespostaApi({
					sucesso: false,
					mensagem: "Nenhum partido foi encontrado com este ID",
				});
			}
		} catch (error) {
			return new RespostaApi({
				sucesso: false,
				mensagem: "Erro ao buscar partido",
				dados: error instanceof Error ? error.message : String(error),
			});
		}
	}

	async buscarPorNome(nome: string): Promise<RespostaApi> {
		try {
			if (!nome) {
				return new RespostaApi({
					sucesso: false,
					mensagem: "É necessário informar o nome do partido",
				});
			}

			const partido = await this.buscarPartidoService.buscarPorNome({ nome });

			if (partido) {
				return new RespostaApi({
					sucesso: true,
					mensagem: "O partido foi encontrado com sucesso",
					dados: partido,
				});
			} else {
				return new RespostaApi({
					sucesso: false,
					mensagem: "Nenhum partido foi encontrado com este nome",
				});
			}
		} catch (error) {
			return new RespostaApi({
				sucesso: false,
				mensagem: "Erro ao buscar partido por nome",
				dados: error instanceof Error ? error.message : String(error),
			});
		}
	}

	async buscarPorSigla(sigla: string): Promise<RespostaApi> {
		try {
			if (!sigla) {
				return new RespostaApi({
					sucesso: false,
					mensagem: "É necessário informar a sigla do partido",
				});
			}

			const partido = await this.buscarPartidoService.buscarPorSigla({ sigla });

			if (partido) {
				return new RespostaApi({
					sucesso: true,
					mensagem: "O partido foi encontrado com sucesso",
					dados: partido,
				});
			} else {
				return new RespostaApi({
					sucesso: false,
					mensagem: "Nenhum partido foi encontrado com esta sigla",
				});
			}
		} catch (error) {
			return new RespostaApi({
				sucesso: false,
				mensagem: "Erro ao buscar partido por sigla",
				dados: error instanceof Error ? error.message : String(error),
			});
		}
	}
}
