import { ResponsePartidoDTO } from "../domain/dtos/partido.dto";
import { PartidoRepository } from "../interfaces/repository/partido.repository";
import PartidoUseCase from "../interfaces/usecase/partido.usecase";

class PartidoService implements PartidoUseCase {
	protected readonly adapter: PartidoRepository;

	constructor(adapter: PartidoRepository) {
		this.adapter = adapter;
	}

	listar(): Promise<ResponsePartidoDTO[]> {
		return this.adapter.listar()
	}
}

export default PartidoService
