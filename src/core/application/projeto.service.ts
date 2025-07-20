import { FiltrosProjetos, ProjetoDTO } from "../domain/dtos/dados.dto";
import {
	CreateProjetoDTO,
	ResponseProjetoDTO,
	UpdateProjetoDTO,
} from "../domain/dtos/projeto.dto";
import { ProjetoRepository } from "../repositories/projeto.repository";
import ProjetoUseCase from "../usecases/projeto.usecase";

class ProjetoService implements ProjetoUseCase {
	protected readonly adapter: ProjetoRepository;

	constructor(adapter: ProjetoRepository) {
		this.adapter = adapter;
	}

	listar(): Promise<ResponseProjetoDTO[]> {
		return this.adapter.listar();
	}

	criar(projeto: CreateProjetoDTO): Promise<ResponseProjetoDTO> {
		return this.adapter.criar(projeto);
	}

	atualizar(
		id: string,
		projeto: UpdateProjetoDTO
	): Promise<ResponseProjetoDTO> {
		return this.adapter.atualizar(id, projeto);
	}

	excluir(id: string): Promise<ResponseProjetoDTO> {
		return this.adapter.excluir(id);
	}

	buscar(id: string): Promise<ResponseProjetoDTO | null> {
		return this.adapter.buscar(id);
	}

	filtrar(filtros?: FiltrosProjetos): Promise<ProjetoDTO[]> {
		return this.adapter.filtrar(filtros);
	}
}

export default ProjetoService;
