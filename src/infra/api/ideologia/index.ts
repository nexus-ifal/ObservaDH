import {
	CreateIdeologiaDTO,
	ResponseIdeologiaDTO,
	UpdateIdeologiaDTO,
} from "@/core/domain/dtos/ideologia.dto";
import { IdeologiaRepository } from "@/core/repositories/ideologia.repository";
import { conexaoBackend } from "@/infra/api/client";

class IdeologiaAPI implements IdeologiaRepository {
	async listar(): Promise<ResponseIdeologiaDTO[]> {
		const response = await conexaoBackend.get("/ideologia");
		return response.data.dados;
	}

	async criar(ideologia: CreateIdeologiaDTO): Promise<ResponseIdeologiaDTO> {
		const response = await conexaoBackend.post("/ideologia", ideologia);
		return response.data.dados;
	}

	async atualizar(
		id: string,
		ideologia: UpdateIdeologiaDTO
	): Promise<ResponseIdeologiaDTO> {
		const response = await conexaoBackend.patch(`/ideologia/${id}`, ideologia);
		return response.data.dados;
	}

	async excluir(id: string): Promise<ResponseIdeologiaDTO> {
		const response = await conexaoBackend.delete(`/ideologia/${id}`);
		return response.data.dados;
	}
}

export default IdeologiaAPI;
