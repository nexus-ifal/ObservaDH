import { BuscarUserService } from "../../service/user/buscar-user-service";
import { DeletarUserService } from "../../service/user/deletar-user-service";

import { RespostaApi } from "@/core/domain/models/resposta-api";

export class DeletarUserController {
	async executar({ id }: { id: string }) {
		if (!id) {
			return new RespostaApi({
				sucesso: false,
				mensagem: "Faltam informações para deletar o usuário",
			});
		}

		const serviceAuxiliar = new BuscarUserService();

		const existe = await serviceAuxiliar.buscarPorID({ id: id });

		if (!existe) {
			return new RespostaApi({
				sucesso: false,
				mensagem: "O usuário já não existe",
			});
		}

		const service = new DeletarUserService();

		const resposta = await service.executar({ id: id });

		if (resposta) {
			return new RespostaApi({
				sucesso: true,
				mensagem: "O usuário foi deletado com sucesso",
				dados: resposta,
			});
		} else {
			return new RespostaApi({
				sucesso: false,
				mensagem: "Houve algum erro para deletar o usuário",
			});
		}
	}
}
