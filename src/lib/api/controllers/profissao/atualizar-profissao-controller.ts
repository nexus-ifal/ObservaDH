import { AtualizarProfissaoService } from "../../service/profissao/atualizar-profissao-service";
import { BuscarProfissaoService } from "../../service/profissao/buscar-profissao-service";

import {
	ResponseProfissaoDTO,
	UpdateProfissaoDTO,
} from "@/domain/dtos/profissao.dto";
import { RespostaApi } from "@/domain/models/resposta-api";

interface IBuscarProfissaoService {
	buscarPorId(params: { id: string }): Promise<ResponseProfissaoDTO | null>;
	buscarPorNome(params: { nome: string }): Promise<ResponseProfissaoDTO | null>;
}

interface IAtualizarProfissaoService {
	executar(params: {
		profissao: UpdateProfissaoDTO;
	}): Promise<ResponseProfissaoDTO>;
}

export class AtualizarProfissaoController {
	private readonly buscarProfissaoService: IBuscarProfissaoService;
	private readonly atualizarProfissaoService: IAtualizarProfissaoService;

	constructor(
		buscarProfissaoService?: IBuscarProfissaoService,
		atualizarProfissaoService?: IAtualizarProfissaoService
	) {
		this.buscarProfissaoService =
			buscarProfissaoService || new BuscarProfissaoService();
		this.atualizarProfissaoService =
			atualizarProfissaoService || new AtualizarProfissaoService();
	}

	async executar(params: UpdateProfissaoDTO): Promise<RespostaApi> {
		try {
			const { id, nome } = params;

			if (!id) {
				return new RespostaApi({
					sucesso: false,
					mensagem: "ID da profissão não fornecido",
				});
			}

			if (nome === undefined) {
				return new RespostaApi({
					sucesso: false,
					mensagem:
						"É necessário fornecer pelo menos um campo para atualização (nome)",
				});
			}

			const profissaoExistente = await this.buscarProfissaoService.buscarPorId({
				id,
			});

			if (!profissaoExistente) {
				return new RespostaApi({
					sucesso: false,
					mensagem: "A profissão não foi encontrada",
				});
			}

			if (nome !== undefined && nome !== profissaoExistente.nome) {
				const profissaoComMesmoNome =
					await this.buscarProfissaoService.buscarPorNome({ nome });
				if (profissaoComMesmoNome && profissaoComMesmoNome.id !== id) {
					return new RespostaApi({
						sucesso: false,
						mensagem: "Já existe outra profissão com este nome",
					});
				}
			}

			const profissaoAtualizada = await this.atualizarProfissaoService.executar(
				{
					profissao: params,
				}
			);

			if (profissaoAtualizada) {
				return new RespostaApi({
					sucesso: true,
					mensagem: "A profissão foi atualizada com sucesso",
					dados: profissaoAtualizada,
				});
			} else {
				throw new Error("Falha na operação de atualização");
			}
		} catch (error) {
			console.error("Erro ao atualizar profissão:", error);

			const errorMessage =
				error instanceof Error
					? error.message
					: "Ocorreu um erro durante a atualização da profissão";

			return new RespostaApi({
				sucesso: false,
				mensagem: errorMessage,
				dados: process.env.NODE_ENV === "development" ? error : undefined,
			});
		}
	}
}
