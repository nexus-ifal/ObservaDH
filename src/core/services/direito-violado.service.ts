import { ResponseDireitoVioladoDTO } from "../domain/dtos/direito-violado.dto";
import { DireitoVioladoRepository } from "../interfaces/repository/direito-violado.repository";
import DireitoVioladosUseCase from "../interfaces/usecase/direito-violado.usecase";

class DireitoVioladoService implements DireitoVioladosUseCase {
	protected readonly adapter: DireitoVioladoRepository;

	constructor(adapter: DireitoVioladoRepository) {
		this.adapter = adapter
	}

	listar(): Promise<ResponseDireitoVioladoDTO[]> {
		return this.adapter.listar()
	}
}

export default DireitoVioladoService;