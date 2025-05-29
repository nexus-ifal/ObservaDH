import {
	CreateEstadoDTO,
	ResponseEstadoDTO,
	UpdateEstadoDTO,
} from "@/core/domain/dtos/estado.dto";
import { EstadoRepository } from "@/core/interfaces/repository/estado.repository";
import { conexaoBackend } from "@/infra/services/conexao-backend/client";

class EstadoAPI implements EstadoRepository {
	async listar(): Promise<ResponseEstadoDTO[]> {
		const response = await conexaoBackend.get("/estado");
		const dados = response.data.resposta.dados;
		return dados;
	}
	async criar(estado: CreateEstadoDTO): Promise<ResponseEstadoDTO> {
		const response = await conexaoBackend.post("/estado", estado);
		const dados = response.data.resposta.dados;
		return dados;
	}
	async atualizar(id: string, estado: UpdateEstadoDTO): Promise<ResponseEstadoDTO> {
		const response = await conexaoBackend.patch(`/estado/${id}`, estado);
		const dados = response.data.dados;
		return dados;
	}
}
export default EstadoAPI;
