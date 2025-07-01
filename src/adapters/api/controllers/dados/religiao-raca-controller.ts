import {
	IListarReligiaoRacaService,
	ListarReligiaoRacaService,
} from "../../service/dados/religiao-raca-service";

import { RespostaApi } from "@/core/domain/models/resposta-api";

export interface IListarReligiaoRacaController {
	executar(): Promise<RespostaApi>;
}

export class ListarReligiaoRacaController
	implements IListarReligiaoRacaController
{
	constructor(
		private readonly listarReligiaoRacaService: IListarReligiaoRacaService = new ListarReligiaoRacaService()
	) {}

	async executar() {
		try {
			const { dados, total } = await this.listarReligiaoRacaService.executar();
			return new RespostaApi({
				sucesso: true,
				mensagem: `${total} religião(s) e raça(s) encontradas`,
				dados,
			});
		} catch (error) {
			return new RespostaApi({
				sucesso: false,
				mensagem: "Erro ao listar religião e raça",
				dados: error instanceof Error ? error.message : String(error),
			});
		}
	}
}
