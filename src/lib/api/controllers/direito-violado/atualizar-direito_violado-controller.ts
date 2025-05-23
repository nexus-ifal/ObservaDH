import { AtualizarDireitoVioladoService } from "../../service/direito-violado/atualizar-direito_violado-service";
import { BuscarDireitoVioladoService } from "../../service/direito-violado/buscar-direito_violado-service";

import {
	ResponseDireitoVioladoDTO,
	UpdateDireitoVioladoDTO,
} from "@/domain/dtos/direito-violado.dto";
import { RespostaApi } from "@/domain/models/resposta-api";

interface IBuscarDireitoVioladoService {
	buscarPorId(params: {
		id: string;
	}): Promise<ResponseDireitoVioladoDTO | null>;
	buscarPorNome(params: {
		nome: string;
	}): Promise<ResponseDireitoVioladoDTO | null>;
}

interface IAtualizarDireitoVioladoService {
	executar(params: {
		direitoViolado: UpdateDireitoVioladoDTO;
	}): Promise<ResponseDireitoVioladoDTO>;
}

export class AtualizarDireitoVioladoController {
	private readonly buscarDireitoVioladoService: IBuscarDireitoVioladoService;
	private readonly atualizarDireitoVioladoService: IAtualizarDireitoVioladoService;

	constructor(
		buscarDireitoVioladoService?: IBuscarDireitoVioladoService,
		atualizarDireitoVioladoService?: IAtualizarDireitoVioladoService
	) {
		this.buscarDireitoVioladoService =
			buscarDireitoVioladoService || new BuscarDireitoVioladoService();
		this.atualizarDireitoVioladoService =
			atualizarDireitoVioladoService || new AtualizarDireitoVioladoService();
	}

	async executar(params: UpdateDireitoVioladoDTO): Promise<RespostaApi> {
		try {
			const { id, nome, sigla, descricao } = params;

			if (!id) {
				return new RespostaApi({
					sucesso: false,
					mensagem: "ID do Direito Violado não fornecido",
				});
			}

			if (
				nome === undefined &&
				sigla === undefined &&
				descricao === undefined
			) {
				return new RespostaApi({
					sucesso: false,
					mensagem:
						"É necessário fornecer pelo menos um campo para atualização (nome, sigla ou descrição)",
				});
			}

			const direitoVioladoExistente =
				await this.buscarDireitoVioladoService.buscarPorId({
					id,
				});

			if (!direitoVioladoExistente) {
				return new RespostaApi({
					sucesso: false,
					mensagem: "O Direito Violado não foi encontrado",
				});
			}

			if (nome !== undefined && nome !== direitoVioladoExistente.nome) {
				const direitoVioladoComMesmoNome =
					await this.buscarDireitoVioladoService.buscarPorNome({ nome });
				if (
					direitoVioladoComMesmoNome &&
					direitoVioladoComMesmoNome.id !== id
				) {
					return new RespostaApi({
						sucesso: false,
						mensagem: "Já existe outro Direito Violado com este nome",
					});
				}
			}

			const direitoVioladoAtualizado =
				await this.atualizarDireitoVioladoService.executar({
					direitoViolado: {
						id,
						nome,
						sigla,
						descricao,
					},
				});

			if (direitoVioladoAtualizado) {
				return new RespostaApi({
					sucesso: true,
					mensagem: "O Direito Violado foi atualizado com sucesso",
					dados: direitoVioladoAtualizado,
				});
			} else {
				throw new Error("Falha na operação de atualização");
			}
		} catch (error) {
			console.error("Erro ao atualizar Direito Violado:", error);

			const errorMessage =
				error instanceof Error
					? error.message
					: "Ocorreu um erro durante a atualização do Direito Violado";

			return new RespostaApi({
				sucesso: false,
				mensagem: errorMessage,
				dados: process.env.NODE_ENV === "development" ? error : undefined,
			});
		}
	}
}
