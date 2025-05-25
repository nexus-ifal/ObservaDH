import { ResponseEstadoDTO } from "@/core/domain/dtos/estado.dto";
import { EstadoRepository } from "@/core/interfaces/repository/estado.repository";
import { conexaoBackend } from "@/infra/services/conexao-backend/client";

class EstadoAPI implements EstadoRepository {
	async listar(): Promise<ResponseEstadoDTO[]> {
		const response = await conexaoBackend.get("/estado");
		const dados = response.data.resposta.dados
		return dados;
	}
}
export default EstadoAPI;
