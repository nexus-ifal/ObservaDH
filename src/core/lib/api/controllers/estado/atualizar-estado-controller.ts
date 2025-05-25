import { AtualizarEstadoService } from "../../service/estado/atualizar-estado-service";
import { BuscarEstadoService } from "../../service/estado/buscar-estado-service";

import {
	ResponseEstadoDTO,
	UpdateEstadoDTO,
	UpdateEstadoSchema,
} from "@/core/domain/dtos/estado.dto";
import { RespostaApi } from "@/core/domain/models/resposta-api";

interface IBuscarEstadoService {
	buscarPorId(params: { id: string }): Promise<ResponseEstadoDTO | null>;
	buscarPorNome(params: { nome: string }): Promise<ResponseEstadoDTO | null>;
	buscarPorSigla(params: { sigla: string }): Promise<ResponseEstadoDTO | null>;
}

interface IAtualizarEstadoService {
	executar(params: { estado: UpdateEstadoDTO }): Promise<ResponseEstadoDTO>;
}

export class AtualizarEstadoController {
	private readonly buscarEstadoService: IBuscarEstadoService;
	private readonly atualizarEstadoService: IAtualizarEstadoService;

	constructor(
		buscarEstadoService?: IBuscarEstadoService,
		atualizarEstadoService?: IAtualizarEstadoService
	) {
		this.buscarEstadoService = buscarEstadoService || new BuscarEstadoService();
		this.atualizarEstadoService =
			atualizarEstadoService || new AtualizarEstadoService();
	}

	async executar(params: UpdateEstadoDTO): Promise<RespostaApi> {
		try {
			let dadosValidados: UpdateEstadoDTO;
			try {
				dadosValidados = UpdateEstadoSchema.parse({
					id: params.id,
					nome: params.nome,
					sigla: params.sigla,
				});
			} catch (error) {
				return new RespostaApi({
					sucesso: false,
					mensagem: "Dados para atualização do estado são inválidos",
					dados: error,
				});
			}

			const { id, nome, sigla } = dadosValidados;

			if (!id || (!nome && !sigla)) {
				return new RespostaApi({
					sucesso: false,
					mensagem:
						"É necessário fornecer pelo menos um campo para atualização",
				});
			}

			const estadoExistente = await this.buscarEstadoService.buscarPorId({
				id,
			});

			if (!estadoExistente) {
				return new RespostaApi({
					sucesso: false,
					mensagem: "O estado não foi encontrado",
				});
			}

			if (nome && nome !== estadoExistente.nome) {
				const estadoComMesmoNome = await this.buscarEstadoService.buscarPorNome(
					{ nome }
				);
				if (estadoComMesmoNome && estadoComMesmoNome.id !== id) {
					return new RespostaApi({
						sucesso: false,
						mensagem: "Já existe outro estado com este nome",
					});
				}
			}

			if (sigla && sigla !== estadoExistente.sigla) {
				const estadoComMesmaSigla =
					await this.buscarEstadoService.buscarPorSigla({ sigla });
				if (estadoComMesmaSigla && estadoComMesmaSigla.id !== id) {
					return new RespostaApi({
						sucesso: false,
						mensagem: "Já existe outro estado com esta sigla",
					});
				}
			}

			const estadoAtualizado = {
				id,
				nome: nome || estadoExistente.nome,
				sigla: sigla || estadoExistente.sigla,
			} as UpdateEstadoDTO;

			const estadoAtualizadoResult = await this.atualizarEstadoService.executar(
				{
					estado: estadoAtualizado,
				}
			);

			const resultado: ResponseEstadoDTO = {
				id: estadoAtualizadoResult.id ?? "",
				nome: estadoAtualizadoResult.nome,
				sigla: estadoAtualizadoResult.sigla,
			};

			if (resultado.id) {
				return new RespostaApi({
					sucesso: true,
					mensagem: "O estado foi atualizado com sucesso",
					dados: resultado,
				});
			} else {
				throw new Error("Falha na operação de atualização: id indefinido");
			}
		} catch (error) {
			console.error("Erro ao atualizar estado:", error);

			return new RespostaApi({
				sucesso: false,
				mensagem: "Ocorreu um erro durante a atualização do estado",
				dados: process.env.NODE_ENV === "development" ? error : undefined,
			});
		}
	}
}
