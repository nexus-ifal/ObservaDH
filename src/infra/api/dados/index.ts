import {
	DadosIdeologiaGenero,
	DadosParlamentarProjetosEsfera,
	DadosPautaEsfera,
	DadosPautaPorAno,
	DadosPlPorAno,
	DadosProjetoEstado,
	DadosProjetosDireitosIdeologias,
	DadosReligiaoRaca,
} from "@/core/domain/dtos/dados.dto";
import { DadosRepository } from "@/core/repositories/dados.repository";
import { conexaoBackend } from "@/infra/api/client";

class DadosAPI implements DadosRepository {
	async listarProjetosPorAno(): Promise<DadosPlPorAno[]> {
		const response = await conexaoBackend.get("/dados/projeto-por-ano");
		return response.data.dados;
	}

	async listarIdeologiaGenero(): Promise<DadosIdeologiaGenero[]> {
		const response = await conexaoBackend.get("/dados/ideologia-por-genero");
		return response.data.dados;
	}

	async listarReligiaoRaca(): Promise<DadosReligiaoRaca[]> {
		const response = await conexaoBackend.get("/dados/religiao-por-raca");
		return response.data.dados;
	}

	async listarPautaPorAno(): Promise<DadosPautaPorAno[]> {
		const response = await conexaoBackend.get("/dados/pauta-por-ano");
		return response.data.dados;
	}

	async listarProjetosPorUF(esfera?: string): Promise<DadosProjetoEstado[]> {
		const URL = "/dados/projeto-por-estado";
		const response = await conexaoBackend.get(URL, { params: { esfera } });
		return response.data.dados;
	}

	async listarPautaPorEsfera(esfera?: string): Promise<DadosPautaEsfera[]> {
		const URL = "/dados/pauta-por-esfera";
		const response = await conexaoBackend.get(URL, { params: { esfera } });
		return response.data.dados;
	}

	async listarParlamentarEsfera(
		esfera?: string
	): Promise<DadosParlamentarProjetosEsfera> {
		const URL = "/dados/parlamentares-por-esfera";
		const response = await conexaoBackend.get(URL, { params: { esfera } });
		return response.data.dados;
	}

	async listarProjetosDireitosIdeologias(
		pauta?: string
	): Promise<DadosProjetosDireitosIdeologias> {
		const URL = "/dados/projetos-direitos-ideologias";
		const response = await conexaoBackend.get(URL, {
			params: { pautaId: pauta },
		});
		return response.data.resposta.dados;
	}
}

export default DadosAPI;
