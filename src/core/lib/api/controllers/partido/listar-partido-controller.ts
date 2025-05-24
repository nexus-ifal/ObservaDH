import {
	IListarPartidoService,
	ListarPartidoService,
} from "../../service/partido/listar-partido-service";

import { RespostaApi } from "@/domain/models/resposta-api";

export interface IListarPartidoController {
	executar(): Promise<RespostaApi>;
}

export class ListarPartidoController implements IListarPartidoController {
	constructor(
		private readonly listarPartidoService: IListarPartidoService = new ListarPartidoService()
	) {}

	async executar(): Promise<RespostaApi> {
		try {
			const partidos = await this.listarPartidoService.executar();

			if (partidos.length > 0) {
				return new RespostaApi({
					sucesso: true,
					mensagem: `${partidos.length} partido(s) foram encontrados`,
					dados: partidos,
				});
			} else {
				return new RespostaApi({
					sucesso: false,
					mensagem: "Nenhum partido foi encontrado",
					dados: [],
				});
			}
		} catch (error) {
			return new RespostaApi({
				sucesso: false,
				mensagem: "Erro ao listar partidos",
				dados: error instanceof Error ? error.message : String(error),
			});
		}
	}
}
