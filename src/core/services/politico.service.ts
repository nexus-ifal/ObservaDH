import { ResponsePoliticoDTO } from "../domain/dtos/politico.dto";
import { PoliticoRepository } from "../interfaces/repository/politico.repository";
import PoliticoUseCase from "../interfaces/usecase/politico.usecase";

class PoliticoService implements PoliticoUseCase {
	protected readonly adapter: PoliticoRepository;

	constructor(adapter: PoliticoRepository) {
		this.adapter = adapter;
	}

	async listar(): Promise<ResponsePoliticoDTO[]> {
		return this.adapter.listar();
	}
}

export default PoliticoService;
