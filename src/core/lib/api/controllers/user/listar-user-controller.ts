import { ListarUsersService } from "../../service/user/listar-users-service";

import { RespostaApi } from "@/core/domain/models/resposta-api";

export class ListarUsersController {
	async executar() {
		const service = new ListarUsersService();

		const resposta = await service.executar();

		if (resposta) {
			return new RespostaApi({
				sucesso: true,
				mensagem: `${resposta.length} usuário(s) foram encontrado(s)`,
				dados: resposta,
			});
		} else {
			return new RespostaApi({
				sucesso: false,
				mensagem: "Nenhum usuário foi encontrado",
			});
		}
	}
}
