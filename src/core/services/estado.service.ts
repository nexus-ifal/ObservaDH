import {
	CreateEstadoDTO,
	ResponseEstadoDTO,
	UpdateEstadoDTO,
} from "../domain/dtos/estado.dto";
import { EstadoRepository } from "../interfaces/repository/estado.repository";
import EstadoUseCase from "../interfaces/usecase/estado.usecase";

class EstadoService implements EstadoUseCase {
	protected readonly adapter: EstadoRepository;

	constructor(adapter: EstadoRepository) {
		this.adapter = adapter;
	}

	listar(): Promise<ResponseEstadoDTO[]> {
		return this.adapter.listar();
	}

	criar(estado: CreateEstadoDTO): Promise<ResponseEstadoDTO> {
		return this.adapter.criar(estado);
	}
	atualizar(id: string, estado: UpdateEstadoDTO): Promise<ResponseEstadoDTO> {
		return this.adapter.atualizar(id, estado);
	}

	excluir(id: string): Promise<ResponseEstadoDTO> {
		return this.adapter.excluir(id)
	}
}

export default EstadoService;
