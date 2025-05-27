import { ResponsePautaDTO } from "@/core/domain/dtos/pauta.dto";
import { PautaRepository } from "@/core/interfaces/repository/pauta.repository";
import { conexaoBackend } from "@/infra/services/conexao-backend/client";

class PautaAPI implements PautaRepository {
	async listar(): Promise<ResponsePautaDTO[]> {
		const response = await conexaoBackend.get("/pauta");
		const dados = response.data.dados;
		return dados;
	}
}
export default PautaAPI;
