import { BuscarProfissaoService } from "../../service/profissao/buscar-profissao-service";
import { CriarProfissaoService } from "../../service/profissao/criar-profissao-service";

import {
	CreateProfissaoDTO,
	ResponseProfissaoDTO,
} from "@/domain/dtos/profissao.dto";
import { RespostaApi } from "@/domain/models/resposta-api";

interface IBuscarProfissaoService {
	buscarPorNome(params: { nome: string }): Promise<ResponseProfissaoDTO | null>;
}

interface ICriarProfissaoService {
	executar(params: CreateProfissaoDTO): Promise<ResponseProfissaoDTO>;
}

export class CriarProfissaoController {
	private readonly buscarProfissaoService: IBuscarProfissaoService;
	private readonly criarProfissaoService: ICriarProfissaoService;

	constructor(
		buscarProfissaoService?: IBuscarProfissaoService,
		criarProfissaoService?: ICriarProfissaoService
	) {
		this.buscarProfissaoService =
			buscarProfissaoService || new BuscarProfissaoService();
		this.criarProfissaoService =
			criarProfissaoService || new CriarProfissaoService();
	}

	async executar(params: CreateProfissaoDTO): Promise<RespostaApi> {
		try {
			const { nome } = params;

			if (!nome) {
				return new RespostaApi({
					sucesso: false,
					mensagem: "Nome é obrigatório para criar a profissão",
				});
			}

			const profissaoExiste = await this.buscarProfissaoService.buscarPorNome({
				nome,
			});

			if (profissaoExiste) {
				return new RespostaApi({
					sucesso: false,
					mensagem: "Já existe uma profissão com este nome",
				});
			}

			const profissaoCriada = await this.criarProfissaoService.executar(params);

			return new RespostaApi({
				sucesso: true,
				mensagem: "A profissão foi criada com sucesso",
				dados: profissaoCriada,
			});
		} catch (error: unknown) {
			const errorMessage =
				error instanceof Error
					? error.message
					: "Houve um problema na criação da profissão";
			return new RespostaApi({
				sucesso: false,
				mensagem: errorMessage,
				dados: process.env.NODE_ENV === "development" ? error : undefined,
			});
		}
	}
}
