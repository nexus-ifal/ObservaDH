import { AtualizarPautaService } from "../../service/pauta/atualizar-pauta-service";
import { BuscarPautaService } from "../../service/pauta/buscar-pauta-service";

import { ResponsePautaDTO, UpdatePautaDTO } from "@/core/domain/dtos/pauta.dto";
import { RespostaApi } from "@/core/domain/models/resposta-api";

interface IBuscarPautaService {
	buscarPorId(params: { id: string }): Promise<ResponsePautaDTO | null>;
	buscarPorNome(params: { nome: string }): Promise<ResponsePautaDTO | null>;
}

interface IAtualizarPautaService {
	executar(params: { pauta: UpdatePautaDTO }): Promise<ResponsePautaDTO>;
}

export class AtualizarPautaController {
	private readonly buscarPautaService: IBuscarPautaService;
	private readonly atualizarPautaService: IAtualizarPautaService;

	constructor(
		buscarPautaService?: IBuscarPautaService,
		atualizarPautaService?: IAtualizarPautaService
	) {
		this.buscarPautaService = buscarPautaService || new BuscarPautaService();
		this.atualizarPautaService =
			atualizarPautaService || new AtualizarPautaService();
	}

	async executar(params: UpdatePautaDTO): Promise<RespostaApi> {
		try {
			const { id, nome } = params;

			if (!id) {
				return new RespostaApi({
					sucesso: false,
					mensagem: "ID da pauta não fornecido",
				});
			}

			if (nome === undefined) {
				return new RespostaApi({
					sucesso: false,
					mensagem:
						"É necessário fornecer pelo menos um campo para atualização (nome)",
				});
			}

			const pautaExistente = await this.buscarPautaService.buscarPorId({
				id,
			});

			if (!pautaExistente) {
				return new RespostaApi({
					sucesso: false,
					mensagem: "A pauta não foi encontrada",
				});
			}

			if (nome !== undefined && nome !== pautaExistente.nome) {
				const pautaComMesmoNome = await this.buscarPautaService.buscarPorNome({
					nome,
				});
				if (pautaComMesmoNome && pautaComMesmoNome.id !== id) {
					return new RespostaApi({
						sucesso: false,
						mensagem: "Já existe outra pauta com este nome",
					});
				}
			}

			const pautaAtualizada = await this.atualizarPautaService.executar({
				pauta: params,
			});

			if (pautaAtualizada) {
				return new RespostaApi({
					sucesso: true,
					mensagem: "A pauta foi atualizada com sucesso",
					dados: pautaAtualizada,
				});
			} else {
				throw new Error("Falha na operação de atualização");
			}
		} catch (error) {
			console.error("Erro ao atualizar pauta:", error);

			const errorMessage =
				error instanceof Error
					? error.message
					: "Ocorreu um erro durante a atualização da pauta";

			return new RespostaApi({
				sucesso: false,
				mensagem: errorMessage,
				dados: process.env.NODE_ENV === "development" ? error : undefined,
			});
		}
	}
}
