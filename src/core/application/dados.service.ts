import {
	DadosIdeologiaGenero,
	DadosParlamentarProjetosEsfera,
	DadosPautaEsfera,
	DadosPautaPorAno,
	DadosPlPorAno,
	DadosProjetoEstado,
	DadosReligiaoRaca,
} from "../domain/dtos/dados.dto";
import { DadosRepository } from "../repositories/dados.repository";
import DadosUseCase from "../usecases/dados.usecase";

class DadosService implements DadosUseCase {
	protected readonly adapter: DadosRepository;

	constructor(adapter: DadosRepository) {
		this.adapter = adapter;
	}

	listarProjetosPorUF(esfera?: string): Promise<DadosProjetoEstado[]> {
		return this.adapter.listarProjetosPorUF(esfera);
	}
	listarIdeologiaGenero(): Promise<DadosIdeologiaGenero[]> {
		return this.adapter.listarIdeologiaGenero();
	}
	listarReligiaoRaca(): Promise<DadosReligiaoRaca[]> {
		return this.adapter.listarReligiaoRaca();
	}
	listarProjetosPorAno(): Promise<DadosPlPorAno[]> {
		return this.adapter.listarProjetosPorAno();
	}
	listarPautaPorAno(): Promise<DadosPautaPorAno[]> {
		return this.adapter.listarPautaPorAno();
	}

	listarParlamentarEsfera(esfera?: string): Promise<DadosParlamentarProjetosEsfera> {
		return this.adapter.listarParlamentarEsfera(esfera);
	}
	listarPautaPorEsfera(esfera?: string): Promise<DadosPautaEsfera[]> {
		return this.adapter.listarPautaPorEsfera(esfera);
	}
}

export default DadosService;
