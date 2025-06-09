import {
	CreateDireitoVioladoDTO,
	ResponseDireitoVioladoDTO,
	UpdateDireitoVioladoDTO,
} from "@/core/domain/dtos/direito-violado.dto";
import { DireitoVioladoRepository } from "@/core/interfaces/repository/direito-violado.repository";
import { conexaoBackend } from "@/infra/services/conexao-backend/client";

class DireitoVioladoAPI implements DireitoVioladoRepository {
	async listar(): Promise<ResponseDireitoVioladoDTO[]> {
		const response = await conexaoBackend.get("/direito-violado");
		const dados = response.data.dados;
		console.log(dados);
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
