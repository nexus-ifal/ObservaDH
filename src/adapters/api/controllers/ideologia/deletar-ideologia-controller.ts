import { BuscarIdeologiaService } from "../../service/ideologia/buscar-ideologia-service";
import { DeletarIdeologiaService } from "../../service/ideologia/deletar-ideologia-service";

import {
	DeleteIdeologiaDTO,
	ResponseIdeologiaDTO,
} from "@/core/domain/dtos/ideologia.dto";
import { RespostaApi } from "@/core/domain/models/resposta-api";

interface IBuscarIdeologiaService {
	buscarPorId(params: { id: string }): Promise<ResponseIdeologiaDTO | null>;
}

import { ResponseDeleteIdeologiaDTO } from "@/core/domain/dtos/ideologia.dto";

interface IDeletarIdeologiaService {
	executar(params: { id: string }): Promise<ResponseDeleteIdeologiaDTO>;
}

export class DeletarIdeologiaController {
	private readonly buscarIdeologiaService: IBuscarIdeologiaService;
	private readonly deletarIdeologiaService: IDeletarIdeologiaService;

	constructor(
		buscarIdeologiaService?: IBuscarIdeologiaService,
		deletarIdeologiaService?: IDeletarIdeologiaService
	) {
		this.buscarIdeologiaService =
			buscarIdeologiaService || new BuscarIdeologiaService();
		this.deletarIdeologiaService =
			deletarIdeologiaService || new DeletarIdeologiaService();
	}

	async executar({ id }: DeleteIdeologiaDTO): Promise<RespostaApi> {
		try {
			if (!id || id.trim() === "") {
				return new RespostaApi({
					sucesso: false,
					mensagem: "ID da ideologia não fornecido ou inválido",
				});
			}

			const ideologiaExistente = await this.buscarIdeologiaService.buscarPorId({
				id: id,
			});

			if (!ideologiaExistente) {
				return new RespostaApi({
					sucesso: false,
					mensagem: "A ideologia não foi encontrada",
				});
			}

			const resultadoDelecao = await this.deletarIdeologiaService.executar({
				id: id,
			});

			if (resultadoDelecao.sucesso) {
				return new RespostaApi({
					sucesso: true,
					mensagem: "A ideologia foi deletada com sucesso",
				});
			} else {
				throw new Error("Falha na operação de deleção");
			}
		} catch (error) {
			console.error("Erro ao deletar ideologia:", error);

			const errorMessage =
				error instanceof Error
					? error.message
					: "Houve um erro ao deletar a ideologia";

			return new RespostaApi({
				sucesso: false,
				mensagem: errorMessage,
				dados: process.env.NODE_ENV === "development" ? error : undefined,
			});
		}
	}
}
