import { ResponsePartidoDTO } from "@/core/domain/dtos/partido.dto";
import { PartidoRepository } from "@/core/interfaces/repository/partido.repository";
import { conexaoBackend } from "@/infra/services/conexao-backend/client";

class PartidoAPI implements PartidoRepository {
	async listar(): Promise<ResponsePartidoDTO[]> {
		const response = await conexaoBackend.get("/partido");
		console.log(response);
		const dados = response.data.dados;
		return dados;
	}
}

export default PartidoAPI;
