import {
	IListarDireitoVioladoService,
	ListarDireitoVioladoService,
} from "../../service/direito-violado/listar-direito_violado_service";

import { RespostaApi } from "@/domain/models/resposta-api";

export interface IListarDireitoVioladoController {
	executar(): Promise<RespostaApi>;
}

export class ListarDireitoVioladoController
	implements IListarDireitoVioladoController
{
	constructor(
		private readonly listarDireitoVioladoService: IListarDireitoVioladoService = new ListarDireitoVioladoService()
	) {}

	async executar(): Promise<RespostaApi> {
		try {
			const direitosViolados =
				await this.listarDireitoVioladoService.executar();

			if (direitosViolados.length > 0) {
				return new RespostaApi({
					sucesso: true,
					mensagem: `${direitosViolados.length} Direito(s) Violado(s) foram encontrados`,
					dados: direitosViolados,
				});
			} else {
				return new RespostaApi({
					sucesso: false,
					mensagem: "Nenhum Direito Violado foi encontrado",
					dados: [],
				});
			}
		} catch (error) {
			return new RespostaApi({
				sucesso: false,
				mensagem: "Erro ao listar Direitos Violados",
				dados: error instanceof Error ? error.message : String(error),
			});
		}
	}
}
