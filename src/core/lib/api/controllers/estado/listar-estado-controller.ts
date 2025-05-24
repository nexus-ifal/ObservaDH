import {
	IListarEstadoService,
	ListarEstadoService,
} from "../../service/estado/listar-estado-service";

import { RespostaApi } from "@/domain/models/resposta-api";

export interface IListarEstadoController {
	executar(): Promise<RespostaApi>;
}

export class ListarEstadoController implements IListarEstadoController {
	constructor(
		private readonly listarEstadoService: IListarEstadoService = new ListarEstadoService()
	) {}

	async executar(): Promise<RespostaApi> {
		try {
			const estados = await this.listarEstadoService.executar();

			if (estados.length > 0) {
				return new RespostaApi({
					sucesso: true,
					mensagem: `${estados.length} estado(s) foram encontrados`,
					dados: estados,
				});
			} else {
				return new RespostaApi({
					sucesso: false,
					mensagem: "Nenhum estado foi encontrado",
					dados: [],
				});
			}
		} catch (error) {
			return new RespostaApi({
				sucesso: false,
				mensagem: "Erro ao listar estados",
				dados: error instanceof Error ? error.message : String(error),
			});
		}
	}
}
