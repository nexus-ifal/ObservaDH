import { BuscarPartidoService } from "../../service/partido/buscar-partido-service";
import { CriarPartidoService } from "../../service/partido/criar-partido-service";

import {
	CreatePartidoDTO,
	ResponsePartidoDTO,
} from "@/domain/dtos/partido.dto";
import { RespostaApi } from "@/domain/models/resposta-api";

interface IBuscarPartidoService {
	buscarPorNome(params: { nome: string }): Promise<ResponsePartidoDTO | null>;
	buscarPorSigla(params: { sigla: string }): Promise<ResponsePartidoDTO | null>;
}

interface ICriarPartidoService {
	executar(params: CreatePartidoDTO): Promise<ResponsePartidoDTO>;
}

export class CriarPartidoController {
	private readonly buscarPartidoService: IBuscarPartidoService;
	private readonly criarPartidoService: ICriarPartidoService;

	constructor(
		buscarPartidoService?: IBuscarPartidoService,
		criarPartidoService?: ICriarPartidoService
	) {
		this.buscarPartidoService =
			buscarPartidoService || new BuscarPartidoService();
		this.criarPartidoService = criarPartidoService || new CriarPartidoService();
	}

	async executar(params: CreatePartidoDTO): Promise<RespostaApi> {
		try {
			const { nome, sigla, imagem } = params;

			if (!nome || !sigla) {
				return new RespostaApi({
					sucesso: false,
					mensagem: "Nome e sigla são obrigatórios para criar o partido",
				});
			}

			const partidoExisteNome = await this.buscarPartidoService.buscarPorNome({
				nome: nome,
			});

			if (partidoExisteNome) {
				return new RespostaApi({
					sucesso: false,
					mensagem: "Já existe um partido com este nome",
				});
			}

			const partidoExisteSigla = await this.buscarPartidoService.buscarPorSigla(
				{
					sigla: sigla,
				}
			);

			if (partidoExisteSigla) {
				return new RespostaApi({
					sucesso: false,
					mensagem: "Já existe um partido com esta sigla",
				});
			}

			const partidoCriado = await this.criarPartidoService.executar({
				nome,
				sigla,
				imagem,
			});

			return new RespostaApi({
				sucesso: true,
				mensagem: "O partido foi criado com sucesso",
				dados: partidoCriado,
			});
		} catch (error: unknown) {
			return new RespostaApi({
				sucesso: false,
				mensagem: "Houve um problema na criação do partido",
				dados: process.env.NODE_ENV === "development" ? error : undefined,
			});
		}
	}
}
