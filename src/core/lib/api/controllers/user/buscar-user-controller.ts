import { BuscarUserService } from "../../service/user/buscar-user-service";

import { RespostaApi } from "@/core/domain/models/resposta-api";

export class BuscarUserController {
	async buscarPorNome({ name }: { name: string }) {
		const service = new BuscarUserService();

		const resposta = await service.buscarPorNome({ name: name });

		if (resposta) {
			return new RespostaApi({
				sucesso: true,
				mensagem: "usuário encontrado com sucesso",
				dados: resposta,
			});
		} else {
			return new RespostaApi({
				sucesso: false,
				mensagem: "O usuário não foi encontrado",
			});
		}
	}

	async buscarPorId({ id }: { id: string }) {
		const service = new BuscarUserService();

		const resposta = await service.buscarPorID({ id: id });

		if (resposta) {
			return new RespostaApi({
				sucesso: true,
				mensagem: "usuário encontrado com sucesso",
				dados: resposta,
			});
		} else {
			return new RespostaApi({
				sucesso: false,
				mensagem: "O usuário não foi encontrado",
			});
		}
	}
}
