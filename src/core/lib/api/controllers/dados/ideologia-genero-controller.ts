import { RespostaApi } from "@/core/domain/models/resposta-api";
import { IListarIdeologiaGeneroService, ListarIdeologiaGeneroService } from "../../service/dados/ideologia-genero-service";

export interface IListarIdeologiaGeneroController {
	executar(): Promise<RespostaApi>;
}

export class ListarIdeologiaGeneroController
	implements IListarIdeologiaGeneroController
{
	constructor(
		private readonly listarIdeologiaGeneroService: IListarIdeologiaGeneroService = new ListarIdeologiaGeneroService()
	) {}
	async executar() {
		try {
			const { dados, total } =
				await this.listarIdeologiaGeneroService.executar();
			return new RespostaApi({
				sucesso: true,
				mensagem: `${total} ideologia(s) e gênero(s) encontrados`,
				dados,
			});
		} catch (error) {
			return new RespostaApi({
				sucesso: false,
				mensagem: "Erro ao listar ideologia e gênero",
				dados: error instanceof Error ? error.message : String(error),
			});
		}
	}
}
