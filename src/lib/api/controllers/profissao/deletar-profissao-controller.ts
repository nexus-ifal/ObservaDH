import { BuscarProfissaoService } from "../../service/profissao/buscar-profissao-service";
import { DeletarProfissaoService } from "../../service/profissao/deletar-profissao-service";

import {
	DeleteProfissaoDTO,
	ResponseProfissaoDTO,
} from "@/domain/dtos/profissao.dto";
import { RespostaApi } from "@/domain/models/resposta-api";

interface IBuscarProfissaoService {
	buscarPorId(params: { id: string }): Promise<ResponseProfissaoDTO | null>;
}

import { ResponseDeleteProfissaoDTO } from "@/domain/dtos/profissao.dto";

interface IDeletarProfissaoService {
	executar(params: { id: string }): Promise<ResponseDeleteProfissaoDTO>;
}

export class DeletarProfissaoController {
	private readonly buscarProfissaoService: IBuscarProfissaoService;
	private readonly deletarProfissaoService: IDeletarProfissaoService;

	constructor(
		buscarProfissaoService?: IBuscarProfissaoService,
		deletarProfissaoService?: IDeletarProfissaoService
	) {
		this.buscarProfissaoService =
			buscarProfissaoService || new BuscarProfissaoService();
		this.deletarProfissaoService =
			deletarProfissaoService || new DeletarProfissaoService();
	}

	async executar({ id }: DeleteProfissaoDTO): Promise<RespostaApi> {
		try {
			if (!id || id.trim() === "") {
				return new RespostaApi({
					sucesso: false,
					mensagem: "ID da profissão não fornecido ou inválido",
				});
			}

			const profissaoExistente = await this.buscarProfissaoService.buscarPorId({
				id: id,
			});

			if (!profissaoExistente) {
				return new RespostaApi({
					sucesso: false,
					mensagem: "A profissão não foi encontrada",
				});
			}

			const resultadoDelecao = await this.deletarProfissaoService.executar({
				id: id,
			});

			if (resultadoDelecao.sucesso) {
				return new RespostaApi({
					sucesso: true,
					mensagem: "A profissão foi deletada com sucesso",
				});
			} else {
				throw new Error("Falha na operação de deleção");
			}
		} catch (error) {
			console.error("Erro ao deletar profissão:", error);

			const errorMessage =
				error instanceof Error
					? error.message
					: "Houve um erro ao deletar a profissão";

			return new RespostaApi({
				sucesso: false,
				mensagem: errorMessage,
				dados: process.env.NODE_ENV === "development" ? error : undefined,
			});
		}
	}
}
