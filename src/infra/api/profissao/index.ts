import { ResponseProfissaoDTO } from "@/core/domain/dtos/profissao.dto";
import { ProfissaoRepository } from "@/core/interfaces/repository/profissao.repository";
import { conexaoBackend } from "@/infra/services/conexao-backend/client";

class ProfissaoAPI implements ProfissaoRepository {
	async listar(): Promise<ResponseProfissaoDTO[]> {
		const response = await conexaoBackend.get("/profissao");
		const dados = response.data.dados;
		return dados;
	}
}

export default ProfissaoAPI;
