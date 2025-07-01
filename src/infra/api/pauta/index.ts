import {
	CreatePautaDTO,
	ResponsePautaDTO,
	UpdatePautaDTO,
} from "@/core/domain/dtos/pauta.dto";
import { PautaRepository } from "@/core/repositories/pauta.repository";
import { conexaoBackend } from "@/infra/api/client";

class PautaAPI implements PautaRepository {
	async listar(): Promise<ResponsePautaDTO[]> {
		const response = await conexaoBackend.get("/pauta");
		const dados = response.data.dados;
		return dados;
	}
	async criar(pauta: CreatePautaDTO): Promise<ResponsePautaDTO> {
		const response = await conexaoBackend.post("/pauta", pauta);
		const dados = response.data.dados;
		return dados;
	}
	async atualizar(
		id: string,
		pauta: UpdatePautaDTO
	): Promise<ResponsePautaDTO> {
		const response = await conexaoBackend.patch(`/pauta/${id}`, pauta);
		const dados = response.data.dados;
		return dados;
	}
	async excluir(id: string): Promise<ResponsePautaDTO> {
		const response = await conexaoBackend.delete(`/pauta/${id}`);
		const dados = response.data.dados;
		return dados;
	}
}
export default PautaAPI;
