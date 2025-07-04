import { AtualizarPartidoService } from "../../service/partido/atualizar-partido-service";
import { BuscarPartidoService } from "../../service/partido/buscar-partido-service";

import {
	ResponsePartidoDTO,
	UpdatePartidoDTO,
} from "@/core/domain/dtos/partido.dto";
import { RespostaApi } from "@/core/domain/models/resposta-api";

interface IBuscarPartidoService {
	buscarPorId(params: { id: string }): Promise<ResponsePartidoDTO | null>;
	buscarPorNome(params: { nome: string }): Promise<ResponsePartidoDTO | null>;
	buscarPorSigla(params: { sigla: string }): Promise<ResponsePartidoDTO | null>;
}

interface IAtualizarPartidoService {
	executar(params: { partido: UpdatePartidoDTO }): Promise<ResponsePartidoDTO>;
}

export class AtualizarPartidoController {
	private readonly buscarPartidoService: IBuscarPartidoService;
	private readonly atualizarPartidoService: IAtualizarPartidoService;

	constructor(
		buscarPartidoService?: IBuscarPartidoService,
		atualizarPartidoService?: IAtualizarPartidoService
	) {
		this.buscarPartidoService =
			buscarPartidoService || new BuscarPartidoService();
		this.atualizarPartidoService =
			atualizarPartidoService || new AtualizarPartidoService();
	}

	async executar(params: UpdatePartidoDTO): Promise<RespostaApi> {
		try {
			const { id, nome, sigla, imagem } = params;

			if (!id) {
				return new RespostaApi({
					sucesso: false,
					mensagem: "ID do partido não fornecido",
				});
			}

			if (nome === undefined && sigla === undefined && imagem === undefined) {
				return new RespostaApi({
					sucesso: false,
					mensagem:
						"É necessário fornecer pelo menos um campo para atualização (nome, sigla ou imagem)",
				});
			}

			const partidoExistente = await this.buscarPartidoService.buscarPorId({
				id,
			});

			if (!partidoExistente) {
				return new RespostaApi({
					sucesso: false,
					mensagem: "O partido não foi encontrado",
				});
			}

			if (nome !== undefined && nome !== partidoExistente.nome) {
				const partidoComMesmoNome =
					await this.buscarPartidoService.buscarPorNome({ nome });
				if (partidoComMesmoNome && partidoComMesmoNome.id !== id) {
					return new RespostaApi({
						sucesso: false,
						mensagem: "Já existe outro partido com este nome",
					});
				}
			}

			if (sigla !== undefined && sigla !== partidoExistente.sigla) {
				const partidoComMesmaSigla =
					await this.buscarPartidoService.buscarPorSigla({ sigla });
				if (partidoComMesmaSigla && partidoComMesmaSigla.id !== id) {
					return new RespostaApi({
						sucesso: false,
						mensagem: "Já existe outro partido com esta sigla",
					});
				}
			}

			const partidoAtualizado = await this.atualizarPartidoService.executar({
				partido: {
					id,
					nome,
					sigla,
					imagem,
				},
			});

			if (partidoAtualizado) {
				return new RespostaApi({
					sucesso: true,
					mensagem: "O partido foi atualizado com sucesso",
					dados: partidoAtualizado,
				});
			} else {
				throw new Error("Falha na operação de atualização");
			}
		} catch (error) {
			console.error("Erro ao atualizar partido:", error);

			return new RespostaApi({
				sucesso: false,
				mensagem: "Ocorreu um erro durante a atualização do partido",
				dados: process.env.NODE_ENV === "development" ? error : undefined,
			});
		}
	}
}
