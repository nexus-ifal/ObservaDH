import { AtualizarProjetoService } from "../../service/projeto/atualizar-projeto-service";
import { BuscarProjetoService } from "../../service/projeto/buscar-projeto-service";

import {
	ResponseProjetoDTO,
	UpdateProjetoDTO,
} from "@/domain/dtos/projeto.dto";
import { RespostaApi } from "@/domain/models/resposta-api";

interface IBuscarProjetoService {
	buscarPorId(params: { id: string }): Promise<ResponseProjetoDTO | null>;
	buscarPorNumeroPl(params: {
		numeroPl: string;
	}): Promise<ResponseProjetoDTO | null>;
}

interface IAtualizarProjetoService {
	executar(params: { projeto: UpdateProjetoDTO }): Promise<ResponseProjetoDTO>;
}

export class AtualizarProjetoController {
	private readonly buscarProjetoService: IBuscarProjetoService;
	private readonly atualizarProjetoService: IAtualizarProjetoService;

	constructor(
		buscarProjetoService?: IBuscarProjetoService,
		atualizarProjetoService?: IAtualizarProjetoService
	) {
		this.buscarProjetoService =
			buscarProjetoService || new BuscarProjetoService();
		this.atualizarProjetoService =
			atualizarProjetoService || new AtualizarProjetoService();
	}

	async executar(params: UpdateProjetoDTO): Promise<RespostaApi> {
		try {
			const { id, ano, ementa, pautaId, esferaId, numeroPl, justificativa } =
				params;

			if (!id) {
				return new RespostaApi({
					sucesso: false,
					mensagem: "ID do projeto não fornecido",
				});
			}

			const camposParaAtualizar = [
				ano,
				ementa,
				pautaId,
				esferaId,
				numeroPl,
				justificativa,
			];
			if (camposParaAtualizar.every((field) => field === undefined)) {
				return new RespostaApi({
					sucesso: false,
					mensagem:
						"É necessário fornecer pelo menos um campo para atualização",
				});
			}

			const projetoExistente = await this.buscarProjetoService.buscarPorId({
				id,
			});

			if (!projetoExistente) {
				return new RespostaApi({
					sucesso: false,
					mensagem: "O projeto não foi encontrado",
				});
			}

			if (numeroPl !== undefined && numeroPl !== projetoExistente.numeroPl) {
				const projetoComMesmoNumeroPl =
					await this.buscarProjetoService.buscarPorNumeroPl({ numeroPl });
				if (projetoComMesmoNumeroPl && projetoComMesmoNumeroPl.id !== id) {
					return new RespostaApi({
						sucesso: false,
						mensagem: `Já existe outro projeto com o número PL '${numeroPl}'`,
					});
				}
			}

			const projetoAtualizado = await this.atualizarProjetoService.executar({
				projeto: {
					id,
					ano,
					ementa,
					pautaId,
					esferaId,
					numeroPl,
					justificativa,
				},
			});

			if (projetoAtualizado) {
				return new RespostaApi({
					sucesso: true,
					mensagem: "O projeto foi atualizado com sucesso",
					dados: projetoAtualizado,
				});
			} else {
				throw new Error("Falha na operação de atualização");
			}
		} catch (error) {
			console.error("Erro ao atualizar projeto:", error);

			const errorMessage =
				error instanceof Error
					? error.message
					: "Ocorreu um erro durante a atualização do projeto";

			return new RespostaApi({
				sucesso: false,
				mensagem: errorMessage,
				dados: process.env.NODE_ENV === "development" ? error : undefined,
			});
		}
	}
}
