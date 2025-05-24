import { ZodError } from "zod";

import {
	BuscarEstadoService,
	IBuscarEstadoService,
} from "../../service/estado/buscar-estado-service";

import { RespostaApi } from "@/domain/models/resposta-api";

export interface IBuscarEstadoController {
	executar(id: string): Promise<RespostaApi>;
	buscarPorNome(nome: string): Promise<RespostaApi>;
	buscarPorSigla(sigla: string): Promise<RespostaApi>;
}

export class BuscarEstadoController implements IBuscarEstadoController {
	constructor(
		private readonly buscarEstadoService: IBuscarEstadoService = new BuscarEstadoService()
	) {}

	async executar(id: string): Promise<RespostaApi> {
		try {
			if (!id) {
				return new RespostaApi({
					sucesso: false,
					mensagem: "Estão faltando informações para a busca do estado",
				});
			}

			const estado = await this.buscarEstadoService.buscarPorId({ id });

			if (estado) {
				return new RespostaApi({
					sucesso: true,
					mensagem: "O estado foi encontrado com sucesso",
					dados: estado,
				});
			} else {
				return new RespostaApi({
					sucesso: false,
					mensagem: "Nenhum estado foi encontrado",
				});
			}
		} catch (error) {
			return new RespostaApi({
				sucesso: false,
				mensagem: "Erro ao buscar estado",
				dados: error instanceof Error ? error.message : String(error),
			});
		}
	}

	async buscarPorNome(nome: string): Promise<RespostaApi> {
		try {
			if (!nome) {
				return new RespostaApi({
					sucesso: false,
					mensagem: "É necessário informar o nome do estado",
				});
			}

			const estado = await this.buscarEstadoService.buscarPorNome({ nome });

			if (estado) {
				return new RespostaApi({
					sucesso: true,
					mensagem: "O estado foi encontrado com sucesso",
					dados: estado,
				});
			} else {
				return new RespostaApi({
					sucesso: false,
					mensagem: "Nenhum estado foi encontrado com este nome",
				});
			}
		} catch (error) {
			return new RespostaApi({
				sucesso: false,
				mensagem: "Erro ao buscar estado por nome",
				dados: error instanceof Error ? error.message : String(error),
			});
		}
	}

	async buscarPorSigla(sigla: string): Promise<RespostaApi> {
		try {
			if (!sigla) {
				return new RespostaApi({
					sucesso: false,
					mensagem: "É necessário informar a sigla do estado",
				});
			}

			const estado = await this.buscarEstadoService.buscarPorSigla({ sigla });

			if (estado) {
				return new RespostaApi({
					sucesso: true,
					mensagem: "O estado foi encontrado com sucesso",
					dados: estado,
				});
			} else {
				return new RespostaApi({
					sucesso: false,
					mensagem: "Nenhum estado foi encontrado com esta sigla",
				});
			}
		} catch (error) {
			return new RespostaApi({
				sucesso: false,
				mensagem: "Erro ao buscar estado por sigla",
				dados: error instanceof ZodError ? error.message : String(error),
			});
		}
	}
}
