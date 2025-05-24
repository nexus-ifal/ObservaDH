import { BuscarEstadoService } from "../../service/estado/buscar-estado-service";
import { DeletarEstadoService } from "../../service/estado/deletar-estado-service";

import { DeleteEstadoDTO, ResponseEstadoDTO } from "@/core/domain/dtos/estado.dto";
import { RespostaApi } from "@/core/domain/models/resposta-api";

interface IBuscarEstadoService {
	buscarPorId(params: { id: string }): Promise<ResponseEstadoDTO | null>;
}

import { ResponseDeleteEstadoDTO } from "@/core/domain/dtos/estado.dto";

interface IDeletarEstadoService {
	executar(params: { id: string }): Promise<ResponseDeleteEstadoDTO | null>;
}

export class DeletarEstadoController {
	private readonly buscarEstadoService: IBuscarEstadoService;
	private readonly deletarEstadoService: IDeletarEstadoService;

	constructor(
		buscarEstadoService?: IBuscarEstadoService,
		deletarEstadoService?: IDeletarEstadoService
	) {
		this.buscarEstadoService = buscarEstadoService || new BuscarEstadoService();
		this.deletarEstadoService =
			deletarEstadoService || new DeletarEstadoService();
	}

	async executar({ id }: DeleteEstadoDTO): Promise<RespostaApi> {
		try {
			if (!id || id.trim() === "") {
				return new RespostaApi({
					sucesso: false,
					mensagem: "ID do estado não fornecido ou inválido",
				});
			}

			const estadoExistente = await this.buscarEstadoService.buscarPorId({
				id: id,
			});

			if (!estadoExistente) {
				return new RespostaApi({
					sucesso: false,
					mensagem: "O estado não foi encontrado",
				});
			}

			const estadoDeletado = await this.deletarEstadoService.executar({
				id: id,
			});

			if (estadoDeletado) {
				return new RespostaApi({
					sucesso: true,
					mensagem: "O estado foi deletado com sucesso",
					dados: estadoDeletado,
				});
			} else {
				throw new Error("Falha na operação de deleção");
			}
		} catch (error) {
			console.error("Erro ao deletar estado:", error);

			return new RespostaApi({
				sucesso: false,
				mensagem: "Houve um erro ao deletar o estado",
				dados: process.env.NODE_ENV === "development" ? error : undefined,
			});
		}
	}
}
