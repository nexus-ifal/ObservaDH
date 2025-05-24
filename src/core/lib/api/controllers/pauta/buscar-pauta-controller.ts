import {
	BuscarPautaService,
	IBuscarPautaService,
} from "../../service/pauta/buscar-pauta-service";

import { RespostaApi } from "@/domain/models/resposta-api";

export interface IBuscarPautaController {
	executar(id: string): Promise<RespostaApi>;
	buscarPorNome(nome: string): Promise<RespostaApi>;
}

export class BuscarPautaController implements IBuscarPautaController {
	constructor(
		private readonly buscarPautaService: IBuscarPautaService = new BuscarPautaService()
	) {}

	async executar(id: string): Promise<RespostaApi> {
		try {
			if (!id) {
				return new RespostaApi({
					sucesso: false,
					mensagem: "ID da pauta não fornecido",
				});
			}

			const pauta = await this.buscarPautaService.buscarPorId({ id });

			if (pauta) {
				return new RespostaApi({
					sucesso: true,
					mensagem: "A pauta foi encontrada com sucesso",
					dados: pauta,
				});
			} else {
				return new RespostaApi({
					sucesso: false,
					mensagem: "Nenhuma pauta foi encontrada com este ID",
				});
			}
		} catch (error) {
			return new RespostaApi({
				sucesso: false,
				mensagem: "Erro ao buscar pauta",
				dados: error instanceof Error ? error.message : String(error),
			});
		}
	}

	async buscarPorNome(nome: string): Promise<RespostaApi> {
		try {
			if (!nome) {
				return new RespostaApi({
					sucesso: false,
					mensagem: "É necessário informar o nome da pauta",
				});
			}

			const pauta = await this.buscarPautaService.buscarPorNome({
				nome,
			});

			if (pauta) {
				return new RespostaApi({
					sucesso: true,
					mensagem: "A pauta foi encontrada com sucesso",
					dados: pauta,
				});
			} else {
				return new RespostaApi({
					sucesso: false,
					mensagem: "Nenhuma pauta foi encontrada com este nome",
				});
			}
		} catch (error) {
			return new RespostaApi({
				sucesso: false,
				mensagem: "Erro ao buscar pauta por nome",
				dados: error instanceof Error ? error.message : String(error),
			});
		}
	}
}
