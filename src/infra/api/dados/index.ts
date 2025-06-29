import { DadosProjetoEstado } from "@/core/domain/dtos/dados.dto";
import { DadosRepository } from "@/core/interfaces/repository/dados.repository";
import { conexaoBackend } from "@/infra/services/conexao-backend/client";

class DadosAPI implements DadosRepository {
	async listarProjetosPorUF(esfera?: string): Promise<DadosProjetoEstado[]> {
		const URL = esfera
			? `/dados/projeto-estado?esfera=${encodeURIComponent(esfera)}`
			: `/dados/projeto-estado`;

		const response = await conexaoBackend.get(URL);

		const dados = response.data.dados;
		return dados;
	}
}

export default DadosAPI;
