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
}

export default ProjetoService;
