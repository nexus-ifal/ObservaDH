import {
	CreateProjetoDTO,
	ResponseProjetoDTO,
	UpdateProjetoDTO,
} from "@/core/domain/dtos/projeto.dto";
import { ProjetoRepository } from "@/core/repositories/projeto.repository";
import { conexaoBackend } from "@/infra/api/client";

class ProjetoAPI implements ProjetoRepository {
	async listar(): Promise<ResponseProjetoDTO[]> {
		const response = await conexaoBackend.get("/projeto");
		const dados = response.data.dados;
		return dados;
	}

	async criar(projeto: CreateProjetoDTO): Promise<ResponseProjetoDTO> {
		const response = await conexaoBackend.post("/projeto", projeto);
		const dados = response.data.dados;
		return dados;
	}

	async atualizar(
		id: string,
		projeto: UpdateProjetoDTO
	): Promise<ResponseProjetoDTO> {
		const response = await conexaoBackend.patch(`/projeto/${id}`, projeto);
		const dados = response.data.dados;
		return dados;
	}

	async excluir(id: string): Promise<ResponseProjetoDTO> {
		const response = await conexaoBackend.delete(`/projeto/${id}`);
		const dados = response.data.dados;
		return dados;
	}
	async buscar(id: string): Promise<ResponseProjetoDTO | null> {
		const response = await conexaoBackend.get(`/projeto/${id}`);
		const dados = response.data.dados;
		return dados;
	}
}

export default ProjetoAPI;
