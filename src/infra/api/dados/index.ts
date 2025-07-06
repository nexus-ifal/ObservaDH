import {
	DadosIdeologiaGenero,
	DadosParlamentarEsfera,
	DadosPautaEsfera,
	DadosPautaPorAno,
	DadosPlPorAno,
	DadosProjetoEstado,
	DadosReligiaoRaca,
} from "@/core/domain/dtos/dados.dto";
import { DadosRepository } from "@/core/repositories/dados.repository";
import { conexaoBackend } from "@/infra/api/client";

class DadosAPI implements DadosRepository {

	private organizarUrl(basePath: string, esfera?: string): string {
		return esfera
			? `${basePath}?esfera=${encodeURIComponent(esfera)}`
			: basePath;
	}

	async listarProjetosPorUF(esfera?: string): Promise<DadosProjetoEstado[]> {
		const url = this.organizarUrl("/dados/projeto-estado", esfera);
		const response = await conexaoBackend.get(url);
		return response.data.dados;
	}

	async listarProjetosPorAno(): Promise<DadosPlPorAno[]> {
		const response = await conexaoBackend.get("/dados/projeto-por-ano");
		return response.data.dados;
	}

	async listarIdeologiaGenero(): Promise<DadosIdeologiaGenero[]> {
		const response = await conexaoBackend.get("/dados/ideologia-genero");
		return response.data.dados;
	}

	async listarReligiaoRaca(): Promise<DadosReligiaoRaca[]> {
		const response = await conexaoBackend.get("/dados/religiao-raca");
		return response.data.dados;
	}

	async listarPautaPorAno(): Promise<DadosPautaPorAno[]> {
		const response = await conexaoBackend.get("/dados/pauta-por-ano");
		return response.data.dados;
	}

	async listarPautaPorEsfera(esfera: string): Promise<DadosPautaEsfera[]> {
		const url = this.organizarUrl("/dados/pauta-esfera", esfera);
		const response = await conexaoBackend.get(url);
		return response.data.dados;
	}

	async listarParlamentarEsfera(
		esfera: string
	): Promise<DadosParlamentarEsfera> {
		const url = this.organizarUrl("/dados/parlamentar-esfera", esfera);
		const response = await conexaoBackend.get(url);
		return response.data.dados;
	}
}

export default DadosAPI;
