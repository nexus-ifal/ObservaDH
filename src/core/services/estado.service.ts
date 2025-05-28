import { CreateEsferaDTO } from "../domain/dtos/esfera.dto";
import { CreateEstadoDTO, ResponseEstadoDTO } from "../domain/dtos/estado.dto";
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
}

export default EstadoService;
