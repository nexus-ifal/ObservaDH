import {
	CreateDireitoVioladoDTO,
	ResponseDireitoVioladoDTO,
	UpdateDireitoVioladoDTO,
} from "@/core/domain/dtos/direito-violado.dto";
import { DireitoVioladoRepository } from "@/core/repositories/direito-violado.repository";
import { conexaoBackend } from "@/infra/api/client";

class DireitoVioladoAPI implements DireitoVioladoRepository {
	async listar(): Promise<ResponseDireitoVioladoDTO[]> {
		const response = await conexaoBackend.get("/direito-violado");
		const dados = response.data.dados;
		return dados;
	}
	async criar(
		direitoViolado: CreateDireitoVioladoDTO
	): Promise<ResponseDireitoVioladoDTO> {
		const response = await conexaoBackend.post(
			"/direito-violado",
			direitoViolado
		);
		const dados = response.data.dados;
		return dados;
	}
	async atualizar(
		id: string,
		direitoViolado: UpdateDireitoVioladoDTO
	): Promise<ResponseDireitoVioladoDTO> {
		const response = await conexaoBackend.patch(
			`/direito-violado/${id}`,
			direitoViolado
		);
		const dados = response.data.dados;
		return dados;
	}
	async excluir(id: string): Promise<ResponseDireitoVioladoDTO> {
		const response = await conexaoBackend.delete(`/direito-violado/${id}`);
		const dados = response.data.dados;
		return dados;
	}
}
export default DireitoVioladoAPI;
