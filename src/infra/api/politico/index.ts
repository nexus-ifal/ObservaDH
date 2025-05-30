import { ResponsePoliticoDTO } from "@/core/domain/dtos/politico.dto";
import { PoliticoRepository } from "@/core/interfaces/repository/politico.repository";
import { conexaoBackend } from "@/infra/services/conexao-backend/client";

class PoliticoAPI implements PoliticoRepository {
	async listar(): Promise<ResponsePoliticoDTO[]> {
		const response = await conexaoBackend.get("/politico");
		const dados = response.data.dados;
		return dados;
	}
}

export default PoliticoAPI;
