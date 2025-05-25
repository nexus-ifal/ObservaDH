import { CriarIdeologiaService } from "../../service/ideologia/criar-ideologia-service";

import {
	CreateIdeologiaDTO,
	ResponseIdeologiaDTO,
} from "@/core/domain/dtos/ideologia.dto";
import { RespostaApi } from "@/core/domain/models/resposta-api";

interface ICriarIdeologiaService {
	executar(params: CreateIdeologiaDTO): Promise<ResponseIdeologiaDTO>;
}

export class CriarIdeologiaController {
	private readonly criarIdeologiaService: ICriarIdeologiaService;

	constructor(criarIdeologiaService?: ICriarIdeologiaService) {
		this.criarIdeologiaService =
			criarIdeologiaService || new CriarIdeologiaService();
	}

	async executar(params: CreateIdeologiaDTO): Promise<RespostaApi> {
		try {
			const { nome, descricao, sigla } = params;

			if (!nome || !descricao || !sigla) {
				return new RespostaApi({
					sucesso: false,
					mensagem:
						"Nome, descrição e sigla são obrigatórios para criar a ideologia",
				});
			}

			const ideologiaCriada = await this.criarIdeologiaService.executar(params);

			return new RespostaApi({
				sucesso: true,
				mensagem: "A ideologia foi criada com sucesso",
				dados: ideologiaCriada,
			});
		} catch (error: unknown) {
			const errorMessage =
				error instanceof Error
					? error.message
					: "Houve um problema na criação da ideologia";
			return new RespostaApi({
				sucesso: false,
				mensagem: errorMessage,
				dados: process.env.NODE_ENV === "development" ? error : undefined,
			});
		}
	}
}
