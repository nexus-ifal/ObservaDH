import {
	CreatePartidoDTO,
	ResponsePartidoDTO,
	UpdatePartidoDTO,
} from "@/core/domain/dtos/partido.dto";
import { PartidoRepository } from "@/core/repositories/partido.repository";
import { conexaoBackend } from "@/infra/api/client";

class PartidoAPI implements PartidoRepository {
	async listar(): Promise<ResponsePartidoDTO[]> {
		const response = await conexaoBackend.get("/partido");
		const dados = response.data.dados;
		return dados;
	}
	async criar(partido: CreatePartidoDTO): Promise<ResponsePartidoDTO> {
		const response = await conexaoBackend.post("/partido", partido);
		const dados = response.data.dados;
		return dados;
	}
	async atualizar(
		id: string,
		partido: UpdatePartidoDTO
	): Promise<ResponsePartidoDTO> {
		const response = await conexaoBackend.patch(`/partido/${id}`, partido);
		const dados = response.data.dados;
		return dados;
	}
	async excluir(id: string): Promise<ResponsePartidoDTO> {
		const response = await conexaoBackend.delete(`/partido/${id}`);
		const dados = response.data.dados;
		return dados;
	}
}
export default PartidoAPI;
