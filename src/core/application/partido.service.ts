import {
	CreatePartidoDTO,
	ResponsePartidoDTO,
	UpdatePartidoDTO,
} from "../domain/dtos/partido.dto";
import { PartidoRepository } from "../repositories/partido.repository";
import PartidoUseCase from "../usecases/partido.usecase";

class PartidoService implements PartidoUseCase {
	protected readonly adapter: PartidoRepository;

	constructor(adapter: PartidoRepository) {
		this.adapter = adapter;
	}

	listar(): Promise<ResponsePartidoDTO[]> {
		return this.adapter.listar();
	}

	criar(partido: CreatePartidoDTO): Promise<ResponsePartidoDTO> {
		return this.adapter.criar(partido);
	}
	atualizar(
		id: string,
		partido: UpdatePartidoDTO
	): Promise<ResponsePartidoDTO> {
		return this.adapter.atualizar(id, partido);
	}

	excluir(id: string): Promise<ResponsePartidoDTO> {
		return this.adapter.excluir(id);
	}
}

export default PartidoService;
