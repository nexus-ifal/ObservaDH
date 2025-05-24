import {
	BuscarDireitoVioladoService,
	IBuscarDireitoVioladoService,
} from "../../service/direito-violado/buscar-direito_violado-service";

import { RespostaApi } from "@/domain/models/resposta-api";

export interface IBuscarDireitoVioladoController {
	executar(id: string): Promise<RespostaApi>;
	buscarPorNome(nome: string): Promise<RespostaApi>;
}

export class BuscarDireitoVioladoController
	implements IBuscarDireitoVioladoController
{
	constructor(
		private readonly buscarDireitoVioladoService: IBuscarDireitoVioladoService = new BuscarDireitoVioladoService()
	) {}

	async executar(id: string): Promise<RespostaApi> {
		try {
			if (!id) {
				return new RespostaApi({
					sucesso: false,
					mensagem: "ID do Direito Violado não fornecido",
				});
			}

			const direitoViolado = await this.buscarDireitoVioladoService.buscarPorId(
				{
					id,
				}
			);

			if (direitoViolado) {
				return new RespostaApi({
					sucesso: true,
					mensagem: "O Direito Violado foi encontrado com sucesso",
					dados: direitoViolado,
				});
			} else {
				return new RespostaApi({
					sucesso: false,
					mensagem: "Nenhum Direito Violado foi encontrado com este ID",
				});
			}
		} catch (error) {
			return new RespostaApi({
				sucesso: false,
				mensagem: "Erro ao buscar Direito Violado",
				dados: error instanceof Error ? error.message : String(error),
			});
		}
	}

	async buscarPorNome(nome: string): Promise<RespostaApi> {
		try {
			if (!nome) {
				return new RespostaApi({
					sucesso: false,
					mensagem: "É necessário informar o nome do Direito Violado",
				});
			}

			const direitoViolado =
				await this.buscarDireitoVioladoService.buscarPorNome({ nome });

			if (direitoViolado) {
				return new RespostaApi({
					sucesso: true,
					mensagem: "O Direito Violado foi encontrado com sucesso",
					dados: direitoViolado,
				});
			} else {
				return new RespostaApi({
					sucesso: false,
					mensagem: "Nenhum Direito Violado foi encontrado com este nome",
				});
			}
		} catch (error) {
			return new RespostaApi({
				sucesso: false,
				mensagem: "Erro ao buscar Direito Violado por nome",
				dados: error instanceof Error ? error.message : String(error),
			});
		}
	}
}
