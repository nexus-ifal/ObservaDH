import { ZodError } from "zod";

import { BuscarEstadoService } from "../../service/estado/buscar-estado-service";
import { CriarEstadoService } from "../../service/estado/criar-estado-service";

import {
	CreateEstadoDTO,
	CreateEstadoSchema,
	ResponseEstadoDTO,
} from "@/domain/dtos/estado.dto";
import { RespostaApi } from "@/domain/models/resposta-api";

interface IBuscarEstadoService {
	buscarPorNome(params: { nome: string }): Promise<ResponseEstadoDTO | null>;
	buscarPorSigla(params: { sigla: string }): Promise<ResponseEstadoDTO | null>;
}

interface ICriarEstadoService {
	executar(params: CreateEstadoDTO): Promise<ResponseEstadoDTO>;
}

export class CriarEstadoController {
	private readonly buscarEstadoService: IBuscarEstadoService;
	private readonly criarEstadoService: ICriarEstadoService;

	constructor(
		buscarEstadoService?: IBuscarEstadoService,
		criarEstadoService?: ICriarEstadoService
	) {
		this.buscarEstadoService = buscarEstadoService || new BuscarEstadoService();
		this.criarEstadoService = criarEstadoService || new CriarEstadoService();
	}

	async executar(params: CreateEstadoDTO): Promise<RespostaApi> {
		try {
			const dados = CreateEstadoSchema.parse(params);

			const estadoExiste = await this.buscarEstadoService.buscarPorNome({
				nome: dados.nome,
			});

			if (estadoExiste) {
				return new RespostaApi({
					sucesso: false,
					mensagem: "O estado já existe",
				});
			}

			const siglaExiste = await this.buscarEstadoService.buscarPorSigla({
				sigla: dados.sigla,
			});

			if (siglaExiste) {
				return new RespostaApi({
					sucesso: false,
					mensagem: "A sigla já existe",
				});
			}

			const resposta = await this.criarEstadoService.executar({
				nome: dados.nome,
				sigla: dados.sigla,
			});

			return new RespostaApi({
				sucesso: true,
				mensagem: "O estado foi criado com sucesso",
				dados: resposta,
			});
		} catch (error: unknown) {
			if (error instanceof ZodError) {
				return new RespostaApi({
					sucesso: false,
					mensagem: "As informações do estado estão incorretas",
					dados: error,
				});
			}

			return new RespostaApi({
				sucesso: false,
				mensagem: "Houve um problema na criação do estado",
				dados: process.env.NODE_ENV === "development" ? error : undefined,
			});
		}
	}
}
