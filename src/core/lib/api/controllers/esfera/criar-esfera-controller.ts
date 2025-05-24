import { CriarEsferaService } from "../../service/esfera/criar-esfera-service";

import { CreateEsferaDTO, ResponseEsferaDTO } from "@/domain/dtos/esfera.dto";
import { RespostaApi } from "@/domain/models/resposta-api";

interface ICriarEsferaService {
	executar(params: CreateEsferaDTO): Promise<ResponseEsferaDTO>;
}

export class CriarEsferaController {
	private readonly criarEsferaService: ICriarEsferaService;

	constructor(criarEsferaService?: ICriarEsferaService) {
		this.criarEsferaService = criarEsferaService || new CriarEsferaService();
	}

	async executar(params: CreateEsferaDTO): Promise<RespostaApi> {
		try {
			const { nome } = params;

			if (!nome) {
				return new RespostaApi({
					sucesso: false,
					mensagem: "Nome é obrigatório para criar a esfera",
				});
			}

			const esferaCriada = await this.criarEsferaService.executar(params);

			return new RespostaApi({
				sucesso: true,
				mensagem: "A esfera foi criada com sucesso",
				dados: esferaCriada,
			});
		} catch (error: unknown) {
			const errorMessage =
				error instanceof Error
					? error.message
					: "Houve um problema na criação da esfera";
			return new RespostaApi({
				sucesso: false,
				mensagem: errorMessage,
				dados: process.env.NODE_ENV === "development" ? error : undefined,
			});
		}
	}
}
