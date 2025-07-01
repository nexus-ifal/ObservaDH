import {
	DadosIdeologiaGenero,
	DadosPautaPorAno,
	DadosPlPorAno,
	DadosProjetoEstado,
	DadosReligiaoRaca,
} from "@/core/domain/dtos/dados.dto";
import { DadosRepository } from "@/core/repositories/dados.repository";
import { conexaoBackend } from "@/infra/api/client";

class DadosAPI implements DadosRepository {
	async listarProjetosPorUF(esfera?: string): Promise<DadosProjetoEstado[]> {
		const URL = esfera
			? `/dados/projeto-estado?esfera=${encodeURIComponent(esfera)}`
			: `/dados/projeto-estado`;

		const response = await conexaoBackend.get(URL);
		const dados = response.data.dados;
		return dados;
	}

	async listarIdeologiaGenero(): Promise<DadosIdeologiaGenero[]> {
		const response = await conexaoBackend.get("/dados/ideologia-genero");
		const dados = response.data.dados;
		return dados;
	}

	async listarReligiaoRaca(): Promise<DadosReligiaoRaca[]> {
		const response = await conexaoBackend.get("/dados/religiao-raca");
		const dados = response.data.dados;
		return dados;
	}
	async listarProjetosPorAno(): Promise<DadosPlPorAno[]> {
		const response = await conexaoBackend.get("/dados/projeto-por-ano");
		const dados = response.data.dados;
		return dados;
	}
	async listarPautaPorAno(): Promise<DadosPautaPorAno[]> {
		const response = await conexaoBackend.get("/dados/pauta-por-ano");
		const dados = response.data.dados;
		return dados;
	}
}

export default DadosAPI;
