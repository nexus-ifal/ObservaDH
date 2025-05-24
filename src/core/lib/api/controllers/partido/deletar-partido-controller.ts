import { BuscarPartidoService } from "../../service/partido/buscar-partido-service";
import { DeletarPartidoService } from "../../service/partido/deletar-partido-service";

import {
	DeletePartidoDTO,
	ResponsePartidoDTO,
} from "@/domain/dtos/partido.dto";
import { RespostaApi } from "@/domain/models/resposta-api";

interface IBuscarPartidoService {
	buscarPorId(params: { id: string }): Promise<ResponsePartidoDTO | null>;
}

import { ResponseDeletePartidoDTO } from "@/domain/dtos/partido.dto";

interface IDeletarPartidoService {
	executar(params: { id: string }): Promise<ResponseDeletePartidoDTO>;
}

export class DeletarPartidoController {
	private readonly buscarPartidoService: IBuscarPartidoService;
	private readonly deletarPartidoService: IDeletarPartidoService;

	constructor(
		buscarPartidoService?: IBuscarPartidoService,
		deletarPartidoService?: IDeletarPartidoService
	) {
		this.buscarPartidoService =
			buscarPartidoService || new BuscarPartidoService();
		this.deletarPartidoService =
			deletarPartidoService || new DeletarPartidoService();
	}

	async executar({ id }: DeletePartidoDTO): Promise<RespostaApi> {
		try {
			if (!id || id.trim() === "") {
				return new RespostaApi({
					sucesso: false,
					mensagem: "ID do partido não fornecido ou inválido",
				});
			}

			const partidoExistente = await this.buscarPartidoService.buscarPorId({
				id: id,
			});

			if (!partidoExistente) {
				return new RespostaApi({
					sucesso: false,
					mensagem: "O partido não foi encontrado",
				});
			}

			const resultadoDelecao = await this.deletarPartidoService.executar({
				id: id,
			});

			if (resultadoDelecao.sucesso) {
				return new RespostaApi({
					sucesso: true,
					mensagem: "O partido foi deletado com sucesso",
				});
			} else {
				throw new Error("Falha na operação de deleção");
			}
		} catch (error) {
			console.error("Erro ao deletar partido:", error);

			const errorMessage =
				error instanceof Error
					? error.message
					: "Houve um erro ao deletar o partido";

			return new RespostaApi({
				sucesso: false,
				mensagem: errorMessage,
				dados: process.env.NODE_ENV === "development" ? error : undefined,
			});
		}
	}
}
