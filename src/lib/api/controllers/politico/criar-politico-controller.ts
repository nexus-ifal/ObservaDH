import { CriarPoliticoService } from "../../service/politico/criar-politico-service";

import {
	CreatePoliticoDTO,
	ResponsePoliticoDTO,
} from "@/domain/dtos/politico.dto";
import { RespostaApi } from "@/domain/models/resposta-api";

interface ICriarPoliticoService {
	executar(params: CreatePoliticoDTO): Promise<ResponsePoliticoDTO>;
}

export class CriarPoliticoController {
	private readonly criarPoliticoService: ICriarPoliticoService;

	constructor(criarPoliticoService?: ICriarPoliticoService) {
		this.criarPoliticoService =
			criarPoliticoService || new CriarPoliticoService();
	}

	async executar(params: CreatePoliticoDTO): Promise<RespostaApi> {
		try {
			const {
				nome,
				genero,
				raca,
				religiao,
				ideologia,
				esferaId,
				estadoId,
				partidoId,
				profissaoId,
				foto,
			} = params;

			if (
				!nome ||
				!genero ||
				!raca ||
				!religiao ||
				!ideologia ||
				!esferaId ||
				!estadoId ||
				!partidoId ||
				!profissaoId ||
				!foto
			) {
				return new RespostaApi({
					sucesso: false,
					mensagem: "Faltam informações obrigatórias para criar o político",
				});
			}

			const politicoCriado = await this.criarPoliticoService.executar(params);

			return new RespostaApi({
				sucesso: true,
				mensagem: "O político foi criado com sucesso",
				dados: politicoCriado,
			});
		} catch (error: unknown) {
			const errorMessage =
				error instanceof Error
					? error.message
					: "Houve um problema na criação do político";
			return new RespostaApi({
				sucesso: false,
				mensagem: errorMessage,
				dados: process.env.NODE_ENV === "development" ? error : undefined,
			});
		}
	}
}
