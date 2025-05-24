import { BuscarPoliticoService } from "../../service/politico/buscar-politico-service";
import { DeletarPoliticoService } from "../../service/politico/deletar-politico-service";

import {
	DeletePoliticoDTO,
	ResponsePoliticoDTO,
} from "@/domain/dtos/politico.dto";
import { RespostaApi } from "@/domain/models/resposta-api";

interface IBuscarPoliticoService {
	buscarPorId(params: { id: string }): Promise<ResponsePoliticoDTO | null>;
}

import { ResponseDeletePoliticoDTO } from "@/domain/dtos/politico.dto";

interface IDeletarPoliticoService {
	executar(params: { id: string }): Promise<ResponseDeletePoliticoDTO>;
}

export class DeletarPoliticoController {
	private readonly buscarPoliticoService: IBuscarPoliticoService;
	private readonly deletarPoliticoService: IDeletarPoliticoService;

	constructor(
		buscarPoliticoService?: IBuscarPoliticoService,
		deletarPoliticoService?: IDeletarPoliticoService
	) {
		this.buscarPoliticoService =
			buscarPoliticoService || new BuscarPoliticoService();
		this.deletarPoliticoService =
			deletarPoliticoService || new DeletarPoliticoService();
	}

	async executar({ id }: DeletePoliticoDTO): Promise<RespostaApi> {
		try {
			if (!id || id.trim() === "") {
				return new RespostaApi({
					sucesso: false,
					mensagem: "ID do político não fornecido ou inválido",
				});
			}

			const politicoExistente = await this.buscarPoliticoService.buscarPorId({
				id: id,
			});

			if (!politicoExistente) {
				return new RespostaApi({
					sucesso: false,
					mensagem: "O político não foi encontrado",
				});
			}

			const resultadoDelecao = await this.deletarPoliticoService.executar({
				id: id,
			});

			if (resultadoDelecao.sucesso) {
				return new RespostaApi({
					sucesso: true,
					mensagem: "O político foi deletado com sucesso",
				});
			} else {
				throw new Error("Falha na operação de deleção");
			}
		} catch (error) {
			console.error("Erro ao deletar político:", error);

			const errorMessage =
				error instanceof Error
					? error.message
					: "Houve um erro ao deletar o político";

			return new RespostaApi({
				sucesso: false,
				mensagem: errorMessage,
				dados: process.env.NODE_ENV === "development" ? error : undefined,
			});
		}
	}
}
