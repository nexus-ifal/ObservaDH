import { ResponseIdeologiaDTO } from "@/core/domain/dtos/ideologia.dto";
import { IdeologiaRepository } from "@/core/interfaces/repository/ideologia.repository";
import { conexaoBackend } from "@/infra/services/conexao-backend/client";

class IdeologiaAPI implements IdeologiaRepository {
	async listar(): Promise<ResponseIdeologiaDTO[]> {
		const response = await conexaoBackend.get("/ideologia");
		const dados = response.data.dados;
		console.log(dados)
		return dados
	}
}

export default IdeologiaAPI;
