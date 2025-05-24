import { AtualizarEsferaService } from "../../service/esfera/atualizar-esfera-service";
import { BuscarEsferaService } from "../../service/esfera/buscar-esfera-service";

import { ResponseEsferaDTO, UpdateEsferaDTO } from "@/domain/dtos/esfera.dto";
import { RespostaApi } from "@/domain/models/resposta-api";

interface IBuscarEsferaService {
	buscarPorId(params: { id: string }): Promise<ResponseEsferaDTO | null>;
}

interface IAtualizarEsferaService {
	executar(params: { esfera: UpdateEsferaDTO }): Promise<ResponseEsferaDTO>;
}

export class AtualizarEsferaController {
	private readonly buscarEsferaService: IBuscarEsferaService;
	private readonly atualizarEsferaService: IAtualizarEsferaService;

	constructor(
		buscarEsferaService?: IBuscarEsferaService,
		atualizarEsferaService?: IAtualizarEsferaService
	) {
		this.buscarEsferaService = buscarEsferaService || new BuscarEsferaService();
		this.atualizarEsferaService =
			atualizarEsferaService || new AtualizarEsferaService();
	}

	async executar(params: UpdateEsferaDTO): Promise<RespostaApi> {
		try {
			const { id, nome } = params;

			if (!id) {
				return new RespostaApi({
					sucesso: false,
					mensagem: "ID da esfera não fornecido",
				});
			}

			if (nome === undefined) {
				return new RespostaApi({
					sucesso: false,
					mensagem:
						"É necessário fornecer pelo menos um campo para atualização (nome)",
				});
			}

			const esferaExistente = await this.buscarEsferaService.buscarPorId({
				id,
			});

			if (!esferaExistente) {
				return new RespostaApi({
					sucesso: false,
					mensagem: "A esfera não foi encontrada",
				});
			}

			const esferaAtualizada = await this.atualizarEsferaService.executar({
				esfera: params,
			});

			if (esferaAtualizada) {
				return new RespostaApi({
					sucesso: true,
					mensagem: "A esfera foi atualizada com sucesso",
					dados: esferaAtualizada,
				});
			} else {
				throw new Error("Falha na operação de atualização");
			}
		} catch (error) {
			console.error("Erro ao atualizar esfera:", error);

			const errorMessage =
				error instanceof Error
					? error.message
					: "Ocorreu um erro durante a atualização da esfera";

			return new RespostaApi({
				sucesso: false,
				mensagem: errorMessage,
				dados: process.env.NODE_ENV === "development" ? error : undefined,
			});
		}
	}
}
