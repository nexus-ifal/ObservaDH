import { ResponseProjetoDTO } from "../domain/dtos/projeto.dto";
import { ProjetoRepository } from "../interfaces/repository/projeto.repository";
import ProjetoUseCase from "../interfaces/usecase/projeto.usecase";

class ProjetoService implements ProjetoUseCase {
	protected readonly adapter: ProjetoRepository;

	constructor(adapter: ProjetoRepository) {
		this.adapter = adapter;
	}

	listar(): Promise<ResponseProjetoDTO[]> {
		return this.adapter.listar();
	}
}

export default ProjetoService;
