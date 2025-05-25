import { BuscarEsferaService } from "../../service/esfera/buscar-esfera-service";
import { DeletarEsferaService } from "../../service/esfera/deletar-esfera-service";

import {
	DeleteEsferaDTO,
	ResponseEsferaDTO,
} from "@/core/domain/dtos/esfera.dto";
import { RespostaApi } from "@/core/domain/models/resposta-api";

interface IBuscarEsferaService {
	buscarPorId(params: { id: string }): Promise<ResponseEsferaDTO | null>;
}

import { ResponseDeleteEsferaDTO } from "@/core/domain/dtos/esfera.dto";

interface IDeletarEsferaService {
	executar(params: { id: string }): Promise<ResponseDeleteEsferaDTO>;
}

export class DeletarEsferaController {
	private readonly buscarEsferaService: IBuscarEsferaService;
	private readonly deletarEsferaService: IDeletarEsferaService;

	constructor(
		buscarEsferaService?: IBuscarEsferaService,
		deleterEsferaService?: IDeletarEsferaService
	) {
		this.buscarEsferaService = buscarEsferaService || new BuscarEsferaService();
		this.deletarEsferaService =
			deleterEsferaService || new DeletarEsferaService();
	}

	async executar({ id }: DeleteEsferaDTO): Promise<RespostaApi> {
		try {
			if (!id || id.trim() === "") {
				return new RespostaApi({
					sucesso: false,
					mensagem: "ID da esfera não fornecido ou inválido",
				});
			}

			const esferaExistente = await this.buscarEsferaService.buscarPorId({
				id: id,
			});

			if (!esferaExistente) {
				return new RespostaApi({
					sucesso: false,
					mensagem: "A esfera não foi encontrada",
				});
			}

			const resultadoDelecao = await this.deletarEsferaService.executar({
				id: id,
			});

			if (resultadoDelecao.sucesso) {
				return new RespostaApi({
					sucesso: true,
					mensagem: "A esfera foi deletada com sucesso",
				});
			} else {
				throw new Error("Falha na operação de deleção");
			}
		} catch (error) {
			console.error("Erro ao deletar esfera:", error);

			const errorMessage =
				error instanceof Error
					? error.message
					: "Houve um erro ao deletar a esfera";

			return new RespostaApi({
				sucesso: false,
				mensagem: errorMessage,
				dados: process.env.NODE_ENV === "development" ? error : undefined,
			});
		}
	}
}
