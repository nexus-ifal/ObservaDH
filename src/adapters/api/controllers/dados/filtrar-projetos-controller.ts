import {
	FiltrarProjetosService,
	IFiltrarProjetosService,
} from "../../service/dados/filtrar-projetos-service";

import { RespostaApi } from "@/core/domain/models/resposta-api";

export interface IFiltrarProjetosController {
	executar(
		esferaId?: string,
		ano?: string,
		estadoId?: string,
		pautaId?: string
	): Promise<RespostaApi>;
}

export class FiltrarProjetosController implements IFiltrarProjetosController {
	constructor(
		private readonly filtrarProjetosService: IFiltrarProjetosService = new FiltrarProjetosService()
	) {}

	async executar(
		esferaId?: string,
		ano?: string,
		estadoId?: string,
		pautaId?: string
	) {
		try {
			const dados = await this.filtrarProjetosService.executar(
				esferaId,
				ano,
				estadoId,
				pautaId
			);

			const filtrosAplicados = [];
			if (esferaId) filtrosAplicados.push(`esfera: ${esferaId}`);
			if (ano) filtrosAplicados.push(`ano: ${ano}`);
			if (estadoId) filtrosAplicados.push(`estado: ${estadoId}`);
			if (pautaId) filtrosAplicados.push(`pauta: ${pautaId}`);

			const mensagem =
				filtrosAplicados.length > 0
					? `Projetos filtrados por ${filtrosAplicados.join(", ")}`
					: "Todos os projetos";

			return new RespostaApi({
				sucesso: true,
				mensagem,
				dados,
			});
		} catch (error) {
			return new RespostaApi({
				sucesso: false,
				mensagem: "Erro ao filtrar projetos",
				dados: error instanceof Error ? error.message : String(error),
			});
		}
	}
}
