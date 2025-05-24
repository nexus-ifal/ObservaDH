import { AtualizarPoliticoService } from "../../service/politico/atualizar-politico-service";
import { BuscarPoliticoService } from "../../service/politico/buscar-politico-service";

import {
	ResponsePoliticoDTO,
	UpdatePoliticoDTO,
} from "@/domain/dtos/politico.dto";
import { RespostaApi } from "@/domain/models/resposta-api";

interface IBuscarPoliticoService {
	buscarPorId(params: { id: string }): Promise<ResponsePoliticoDTO | null>;
}

interface IAtualizarPoliticoService {
	executar(params: {
		politico: UpdatePoliticoDTO;
	}): Promise<ResponsePoliticoDTO>;
}

export class AtualizarPoliticoController {
	private readonly buscarPoliticoService: IBuscarPoliticoService;
	private readonly atualizarPoliticoService: IAtualizarPoliticoService;

	constructor(
		buscarPoliticoService?: IBuscarPoliticoService,
		atualizarPoliticoService?: IAtualizarPoliticoService
	) {
		this.buscarPoliticoService =
			buscarPoliticoService || new BuscarPoliticoService();
		this.atualizarPoliticoService =
			atualizarPoliticoService || new AtualizarPoliticoService();
	}

	async executar(params: UpdatePoliticoDTO): Promise<RespostaApi> {
		try {
			const {
				id,
				nome,
				foto,
				genero,
				raca,
				religiao,
				ideologia,
				esferaId,
				estadoId,
				partidoId,
				profissaoId,
			} = params;

			if (!id) {
				return new RespostaApi({
					sucesso: false,
					mensagem: "ID do político não fornecido",
				});
			}

			const camposParaAtualizar = [
				nome,
				foto,
				genero,
				raca,
				religiao,
				ideologia,
				esferaId,
				estadoId,
				partidoId,
				profissaoId,
			];
			if (camposParaAtualizar.every((field) => field === undefined)) {
				return new RespostaApi({
					sucesso: false,
					mensagem:
						"É necessário fornecer pelo menos um campo para atualização",
				});
			}

			const politicoExistente = await this.buscarPoliticoService.buscarPorId({
				id,
			});

			if (!politicoExistente) {
				return new RespostaApi({
					sucesso: false,
					mensagem: "O político não foi encontrado",
				});
			}

			const politicoAtualizado = await this.atualizarPoliticoService.executar({
				politico: params,
			});

			if (politicoAtualizado) {
				return new RespostaApi({
					sucesso: true,
					mensagem: "O político foi atualizado com sucesso",
					dados: politicoAtualizado,
				});
			} else {
				throw new Error("Falha na operação de atualização");
			}
		} catch (error) {
			console.error("Erro ao atualizar político:", error);

			const errorMessage =
				error instanceof Error
					? error.message
					: "Ocorreu um erro durante a atualização do político";

			return new RespostaApi({
				sucesso: false,
				mensagem: errorMessage,
				dados: process.env.NODE_ENV === "development" ? error : undefined,
			});
		}
	}
}
