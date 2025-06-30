import {
	DadosIdeologiaGenero,
	DadosPlPorAno,
	DadosProjetoEstado,
	DadosReligiaoRaca,
} from "../domain/dtos/dados.dto";
import { DadosRepository } from "../interfaces/repository/dados.repository";
import DadosUseCase from "../interfaces/usecase/dados.usecase";

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
}

export default DadosService;
