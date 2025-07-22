import { DadosParaPesquisaParlamenta } from "@/core/domain/dtos/dados.dto";
import {
	CreatePoliticoDTO,
	ResponsePoliticoDTO,
	UpdatePoliticoDTO,
} from "@/core/domain/dtos/politico.dto";
import { PoliticoRepository } from "@/core/repositories/politico.repository";
import { conexaoBackend } from "@/infra/api/client";

class PoliticoAPI implements PoliticoRepository {
	async listar(): Promise<ResponsePoliticoDTO[]> {
		const response = await conexaoBackend.get("/politico");
		const dados = response.data.dados;
		return dados;
	}
	async criar(politico: CreatePoliticoDTO): Promise<ResponsePoliticoDTO> {
		const response = await conexaoBackend.post("/politico", politico);
		const dados = response.data.dados;
		return dados;
	}
	async atualizar(
		id: string,
		politico: UpdatePoliticoDTO
	): Promise<ResponsePoliticoDTO> {
		const response = await conexaoBackend.patch(`/politico/${id}`, politico);
		const dados = response.data.dados;
		return dados;
	}
	async excluir(id: string): Promise<ResponsePoliticoDTO> {
		const response = await conexaoBackend.delete(`/politico/${id}`);
		const dados = response.data.dados;
		return dados;
	}

	async listarFiltrados(
		filtros: DadosParaPesquisaParlamenta
	): Promise<ResponsePoliticoDTO[]> {
		console.log("Filtros recebidos:", filtros);
		const response = await conexaoBackend.get("/politico/dados", {
			params: filtros,
		});
		const dados = response.data.dados;
		return dados;
	}
}
export default PoliticoAPI;
