import { BuscarProjetoService } from "../../service/projeto/buscar-projeto-service";
import { DeletarProjetoService } from "../../service/projeto/deletar-projeto-service";

import {
	DeleteProjetoDTO,
	ResponseProjetoDTO,
} from "@/core/domain/dtos/projeto.dto";
import { RespostaApi } from "@/core/domain/models/resposta-api";

interface IBuscarProjetoService {
	buscarPorId(params: { id: string }): Promise<ResponseProjetoDTO | null>;
}

import { ResponseDeleteProjetoDTO } from "@/core/domain/dtos/projeto.dto";

interface IDeletarProjetoService {
	executar(params: { id: string }): Promise<ResponseDeleteProjetoDTO>;
}

export class DeletarProjetoController {
	private readonly buscarProjetoService: IBuscarProjetoService;
	private readonly deletarProjetoService: IDeletarProjetoService;

	constructor(
		buscarProjetoService?: IBuscarProjetoService,
		deletarProjetoService?: IDeletarProjetoService
	) {
		this.buscarProjetoService =
			buscarProjetoService || new BuscarProjetoService();
		this.deletarProjetoService =
			deletarProjetoService || new DeletarProjetoService();
	}

	async executar({ id }: DeleteProjetoDTO): Promise<RespostaApi> {
		try {
			if (!id || id.trim() === "") {
				return new RespostaApi({
					sucesso: false,
					mensagem: "ID do projeto não fornecido ou inválido",
				});
			}

			const projetoExistente = await this.buscarProjetoService.buscarPorId({
				id: id,
			});

			if (!projetoExistente) {
				return new RespostaApi({
					sucesso: false,
					mensagem: "O projeto não foi encontrado",
				});
			}

			const resultadoDelecao = await this.deletarProjetoService.executar({
				id: id,
			});

			if (resultadoDelecao.sucesso) {
				return new RespostaApi({
					sucesso: true,
					mensagem: "O projeto foi deletado com sucesso",
				});
			} else {
				throw new Error("Falha na operação de deleção");
			}
		} catch (error) {
			console.error("Erro ao deletar projeto:", error);

			const errorMessage =
				error instanceof Error
					? error.message
					: "Houve um erro ao deletar o projeto";

			return new RespostaApi({
				sucesso: false,
				mensagem: errorMessage,
				dados: process.env.NODE_ENV === "development" ? error : undefined,
			});
		}
	}
}
