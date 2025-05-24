import {
	DeleteDireitoVioladoDTO,
	ResponseDireitoVioladoDTO,
} from "@/core/domain/dtos/direito-violado.dto";
import { RespostaApi } from "@/core/domain/models/resposta-api";

interface IBuscarDireitoVioladoService {
	buscarPorId(params: {
		id: string;
	}): Promise<ResponseDireitoVioladoDTO | null>;
}

import { BuscarDireitoVioladoService } from "../../service/direito-violado/buscar-direito_violado-service";
import { DeletarDireitoVioladoService } from "../../service/direito-violado/deletar-direito_violado-service";

import { ResponseDeleteDireitoVioladoDTO } from "@/core/domain/dtos/direito-violado.dto";

interface IDeletarDireitoVioladoService {
	executar(params: { id: string }): Promise<ResponseDeleteDireitoVioladoDTO>;
}

export class DeletarDireitoVioladoController {
	private readonly buscarDireitoVioladoService: IBuscarDireitoVioladoService;
	private readonly deletarDireitoVioladoService: IDeletarDireitoVioladoService;

	constructor(
		buscarDireitoVioladoService?: IBuscarDireitoVioladoService,
		deletarDireitosVioladosService?: IDeletarDireitoVioladoService
	) {
		this.buscarDireitoVioladoService =
			buscarDireitoVioladoService || new BuscarDireitoVioladoService();
		this.deletarDireitoVioladoService =
			deletarDireitosVioladosService || new DeletarDireitoVioladoService();
	}

	async executar({ id }: DeleteDireitoVioladoDTO): Promise<RespostaApi> {
		try {
			if (!id || id.trim() === "") {
				return new RespostaApi({
					sucesso: false,
					mensagem: "ID do Direito Violado não fornecido ou inválido",
				});
			}

			const direitoVioladoExistente =
				await this.buscarDireitoVioladoService.buscarPorId({
					id: id,
				});

			if (!direitoVioladoExistente) {
				return new RespostaApi({
					sucesso: false,
					mensagem: "O Direito Violado não foi encontrado",
				});
			}

			const resultadoDelecao = await this.deletarDireitoVioladoService.executar(
				{
					id: id,
				}
			);

			if (resultadoDelecao.sucesso) {
				return new RespostaApi({
					sucesso: true,
					mensagem: "O Direito Violado foi deletado com sucesso",
				});
			} else {
				throw new Error("Falha na operação de deleção");
			}
		} catch (error) {
			console.error("Erro ao deletar Direito Violado:", error);

			const errorMessage =
				error instanceof Error
					? error.message
					: "Houve um erro ao deletar o Direito Violado";

			return new RespostaApi({
				sucesso: false,
				mensagem: errorMessage,
				dados: process.env.NODE_ENV === "development" ? error : undefined,
			});
		}
	}
}
