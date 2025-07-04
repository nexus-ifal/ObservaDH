import { BuscarPautaService } from "../../service/pauta/buscar-pauta-service";
import { CriarPautaService } from "../../service/pauta/criar-pauta-service";

import { CreatePautaDTO, ResponsePautaDTO } from "@/core/domain/dtos/pauta.dto";
import { RespostaApi } from "@/core/domain/models/resposta-api";

interface IBuscarPautaService {
	buscarPorNome(params: { nome: string }): Promise<ResponsePautaDTO | null>;
}

interface ICriarPautaService {
	executar(params: CreatePautaDTO): Promise<ResponsePautaDTO>;
}

export class CriarPautaController {
	private readonly buscarPautaService: IBuscarPautaService;
	private readonly criarPautaService: ICriarPautaService;

	constructor(
		buscarPautaService?: IBuscarPautaService,
		criarPautaService?: ICriarPautaService
	) {
		this.buscarPautaService = buscarPautaService || new BuscarPautaService();
		this.criarPautaService = criarPautaService || new CriarPautaService();
	}

	async executar(params: CreatePautaDTO): Promise<RespostaApi> {
		try {
			const { nome } = params;

			if (!nome) {
				return new RespostaApi({
					sucesso: false,
					mensagem: "Nome é obrigatório para criar a pauta",
				});
			}

			const pautaExiste = await this.buscarPautaService.buscarPorNome({
				nome,
			});

			if (pautaExiste) {
				return new RespostaApi({
					sucesso: false,
					mensagem: "Já existe uma pauta com este nome",
				});
			}

			const pautaCriada = await this.criarPautaService.executar(params);

			return new RespostaApi({
				sucesso: true,
				mensagem: "A pauta foi criada com sucesso",
				dados: pautaCriada,
			});
		} catch (error: unknown) {
			const errorMessage =
				error instanceof Error
					? error.message
					: "Houve um problema na criação da pauta";
			return new RespostaApi({
				sucesso: false,
				mensagem: errorMessage,
				dados: process.env.NODE_ENV === "development" ? error : undefined,
			});
		}
	}
}
