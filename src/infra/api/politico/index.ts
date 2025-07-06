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
		let URL = `/politico/dados`;
		if (filtros.esfera) {
			filtros.esfera = filtros.esfera.toLowerCase();
			URL += `?${filtros.esfera}`;
		}
		if (filtros.ordemProjetos) {
			filtros.ordemProjetos = filtros.ordemProjetos.toLowerCase() as
				| "asc"
				| "desc";
			URL += `?${filtros.ordemProjetos}`;
		}
		if (filtros.estado) {
			filtros.estado = filtros.estado.toLowerCase();
			URL += `?${filtros.estado}`;
		}
		if (filtros.genero) {
			filtros.genero = filtros.genero.toLowerCase();
			URL += `?${filtros.genero}`;
		}
		if (filtros.partido) {
			filtros.partido = filtros.partido.toLowerCase();
			URL += `?${filtros.partido}`;
		}
		if (filtros.ideologia) {
			filtros.ideologia = filtros.ideologia.toLowerCase();
			URL += `?${filtros.ideologia}`;
		}
		if (filtros.profissao) {
			filtros.profissao = filtros.profissao.toLowerCase();
			URL += `?${filtros.profissao}`;
		}
		const response = await conexaoBackend.get(URL);
		const dados = response.data.dados;
		return dados;
	}
}
export default PoliticoAPI;
