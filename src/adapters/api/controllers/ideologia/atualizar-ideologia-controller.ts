import { AtualizarIdeologiaService } from "../../service/ideologia/atualizar-ideologia-service";
import { BuscarIdeologiaService } from "../../service/ideologia/buscar-ideologia-service";

import {
	ResponseIdeologiaDTO,
	UpdateIdeologiaDTO,
} from "@/core/domain/dtos/ideologia.dto";
import { RespostaApi } from "@/core/domain/models/resposta-api";

interface IBuscarIdeologiaService {
	buscarPorId(params: { id: string }): Promise<ResponseIdeologiaDTO | null>;
}

interface IAtualizarIdeologiaService {
	executar(params: {
		ideologia: UpdateIdeologiaDTO;
	}): Promise<ResponseIdeologiaDTO>;
}

export class AtualizarIdeologiaController {
	private readonly buscarIdeologiaService: IBuscarIdeologiaService;
	private readonly atualizarIdeologiaService: IAtualizarIdeologiaService;

	constructor(
		buscarIdeologiaService?: IBuscarIdeologiaService,
		atualizarIdeologiaService?: IAtualizarIdeologiaService
	) {
		this.buscarIdeologiaService =
			buscarIdeologiaService || new BuscarIdeologiaService();
		this.atualizarIdeologiaService =
			atualizarIdeologiaService || new AtualizarIdeologiaService();
	}

	async executar(params: UpdateIdeologiaDTO): Promise<RespostaApi> {
		try {
			const { id, nome, descricao, sigla } = params;

			if (!id) {
				return new RespostaApi({
					sucesso: false,
					mensagem: "ID da ideologia não fornecido",
				});
			}

			if (
				nome === undefined &&
				descricao === undefined &&
				sigla === undefined
			) {
				return new RespostaApi({
					sucesso: false,
					mensagem:
						"É necessário fornecer pelo menos um campo para atualização (nome, descrição ou sigla)",
				});
			}

			const ideologiaExistente = await this.buscarIdeologiaService.buscarPorId({
				id,
			});

			if (!ideologiaExistente) {
				return new RespostaApi({
					sucesso: false,
					mensagem: "A ideologia não foi encontrada",
				});
			}

			const ideologiaAtualizada = await this.atualizarIdeologiaService.executar(
				{
					ideologia: params,
				}
			);

			if (ideologiaAtualizada) {
				return new RespostaApi({
					sucesso: true,
					mensagem: "A ideologia foi atualizada com sucesso",
					dados: ideologiaAtualizada,
				});
			} else {
				throw new Error("Falha na operação de atualização");
			}
		} catch (error) {
			console.error("Erro ao atualizar ideologia:", error);

			const errorMessage =
				error instanceof Error
					? error.message
					: "Ocorreu um erro durante a atualização da ideologia";

			return new RespostaApi({
				sucesso: false,
				mensagem: errorMessage,
				dados: process.env.NODE_ENV === "development" ? error : undefined,
			});
		}
	}
}
