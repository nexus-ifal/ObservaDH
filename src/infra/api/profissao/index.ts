import {
	CreateProfissaoDTO,
	ResponseProfissaoDTO,
	UpdateProfissaoDTO,
} from "@/core/domain/dtos/profissao.dto";
import { ProfissaoRepository } from "@/core/repositories/profissao.repository";
import { conexaoBackend } from "@/infra/api/client";

class ProfissaoAPI implements ProfissaoRepository {
	async listar(): Promise<ResponseProfissaoDTO[]> {
		const response = await conexaoBackend.get("/profissao");
		const dados = response.data.dados;
		return dados;
	}

	async criar(profissao: CreateProfissaoDTO): Promise<ResponseProfissaoDTO> {
		const response = await conexaoBackend.post("/profissao", profissao);
		const dados = response.data.dados;
		return dados;
	}

	async atualizar(
		id: string,
		profissao: UpdateProfissaoDTO
	): Promise<ResponseProfissaoDTO> {
		const response = await conexaoBackend.patch(`/profissao/${id}`, profissao);
		const dados = response.data.dados;
		return dados;
	}

	async excluir(id: string): Promise<ResponseProfissaoDTO> {
		const response = await conexaoBackend.delete(`/profissao/${id}`);
		const dados = response.data.dados;
		return dados;
	}
}

export default ProfissaoAPI;
