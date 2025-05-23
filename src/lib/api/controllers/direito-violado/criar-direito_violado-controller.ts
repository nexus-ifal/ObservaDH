import { BuscarDireitoVioladoService } from "../../service/direito-violado/buscar-direito_violado-service";
import { CriarDireitoVioladoService } from "../../service/direito-violado/criar-direito_violado-service";

import {
	CreateDireitoVioladoDTO,
	ResponseDireitoVioladoDTO,
} from "@/domain/dtos/direito-violado.dto";
import { RespostaApi } from "@/domain/models/resposta-api";

interface IBuscarDireitoVioladoService {
	buscarPorNome(params: {
		nome: string;
	}): Promise<ResponseDireitoVioladoDTO | null>;
}

interface ICriarDireitoVioladoService {
	executar(params: CreateDireitoVioladoDTO): Promise<ResponseDireitoVioladoDTO>;
}

export class CriarDireitoVioladoController {
	private readonly buscarDireitoVioladoService: IBuscarDireitoVioladoService;
	private readonly criarDireitoVioladoService: ICriarDireitoVioladoService;

	constructor(
		buscarDireitoVioladoService?: IBuscarDireitoVioladoService,
		criarDireitoVioladoService?: ICriarDireitoVioladoService
	) {
		this.buscarDireitoVioladoService =
			buscarDireitoVioladoService || new BuscarDireitoVioladoService();
		this.criarDireitoVioladoService =
			criarDireitoVioladoService || new CriarDireitoVioladoService();
	}

	async executar(params: CreateDireitoVioladoDTO): Promise<RespostaApi> {
		try {
			const { nome, sigla, descricao } = params;

			if (!nome || !sigla || !descricao) {
				return new RespostaApi({
					sucesso: false,
					mensagem:
						"Nome, sigla e descrição são obrigatórios para criar o Direito Violado",
				});
			}

			const direitoVioladoExisteNome =
				await this.buscarDireitoVioladoService.buscarPorNome({
					nome: nome,
				});

			if (direitoVioladoExisteNome) {
				return new RespostaApi({
					sucesso: false,
					mensagem: "Já existe um Direito Violado com este nome",
				});
			}

			const direitoVioladoCriado =
				await this.criarDireitoVioladoService.executar(params);

			return new RespostaApi({
				sucesso: true,
				mensagem: "O Direito Violado foi criado com sucesso",
				dados: direitoVioladoCriado,
			});
		} catch (error: unknown) {
			const errorMessage =
				error instanceof Error
					? error.message
					: "Houve um problema na criação do Direito Violado";
			return new RespostaApi({
				sucesso: false,
				mensagem: errorMessage,
				dados: process.env.NODE_ENV === "development" ? error : undefined,
			});
		}
	}
}
