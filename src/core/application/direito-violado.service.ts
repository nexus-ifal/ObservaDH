import {
	CreateDireitoVioladoDTO,
	ResponseDireitoVioladoDTO,
	UpdateDireitoVioladoDTO,
} from "../domain/dtos/direito-violado.dto";
import { DireitoVioladoRepository } from "../repositories/direito-violado.repository";
import DireitoVioladoUseCase from "../usecases/direito-violado.usecase";

class DireitoVioladoService implements DireitoVioladoUseCase {
	protected readonly adapter: DireitoVioladoRepository;

	constructor(adapter: DireitoVioladoRepository) {
		this.adapter = adapter;
	}

	listar(): Promise<ResponseDireitoVioladoDTO[]> {
		return this.adapter.listar();
	}

	criar(
		direitoViolado: CreateDireitoVioladoDTO
	): Promise<ResponseDireitoVioladoDTO> {
		return this.adapter.criar(direitoViolado);
	}
	atualizar(
		id: string,
		direitoViolado: UpdateDireitoVioladoDTO
	): Promise<ResponseDireitoVioladoDTO> {
		return this.adapter.atualizar(id, direitoViolado);
	}

	excluir(id: string): Promise<ResponseDireitoVioladoDTO> {
		return this.adapter.excluir(id);
	}
}

export default DireitoVioladoService;
