import { BuscarPautaService } from "../../service/pauta/buscar-pauta-service";
import { DeletarPautaService } from "../../service/pauta/deletar-pauta-service";

import { DeletePautaDTO, ResponsePautaDTO } from "@/core/domain/dtos/pauta.dto";
import { RespostaApi } from "@/core/domain/models/resposta-api";

interface IBuscarPautaService {
	buscarPorId(params: { id: string }): Promise<ResponsePautaDTO | null>;
}

import { ResponseDeletePautaDTO } from "@/core/domain/dtos/pauta.dto";

interface IDeletarPautaService {
	executar(params: { id: string }): Promise<ResponseDeletePautaDTO>;
}

export class DeletarPautaController {
	private readonly buscarPautaService: IBuscarPautaService;
	private readonly deletarPautaService: IDeletarPautaService;

	constructor(
		buscarPautaService?: IBuscarPautaService,
		deletarPautaService?: IDeletarPautaService
	) {
		this.buscarPautaService = buscarPautaService || new BuscarPautaService();
		this.deletarPautaService = deletarPautaService || new DeletarPautaService();
	}

	async executar({ id }: DeletePautaDTO): Promise<RespostaApi> {
		try {
			if (!id || id.trim() === "") {
				return new RespostaApi({
					sucesso: false,
					mensagem: "ID da pauta não fornecido ou inválido",
				});
			}

			const pautaExistente = await this.buscarPautaService.buscarPorId({
				id: id,
			});

			if (!pautaExistente) {
				return new RespostaApi({
					sucesso: false,
					mensagem: "A pauta não foi encontrada",
				});
			}

			const resultadoDelecao = await this.deletarPautaService.executar({
				id: id,
			});

			if (resultadoDelecao.sucesso) {
				return new RespostaApi({
					sucesso: true,
					mensagem: "A pauta foi deletada com sucesso",
				});
			} else {
				throw new Error("Falha na operação de deleção");
			}
		} catch (error) {
			console.error("Erro ao deletar pauta:", error);

			const errorMessage =
				error instanceof Error
					? error.message
					: "Houve um erro ao deletar a pauta";

			return new RespostaApi({
				sucesso: false,
				mensagem: errorMessage,
				dados: process.env.NODE_ENV === "development" ? error : undefined,
			});
		}
	}
}
