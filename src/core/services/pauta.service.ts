import { ResponsePautaDTO } from "../domain/dtos/pauta.dto";
import { PautaRepository } from "../interfaces/repository/pauta.repository";
import PautaUseCase from "../interfaces/usecase/pauta.usecase";

class PautaService implements PautaUseCase {
	protected readonly adapter: PautaRepository;

	constructor(adapter: PautaRepository) {
		this.adapter = adapter;
	}

	listar(): Promise<ResponsePautaDTO[]> {
		return this.adapter.listar();
	}
}

export default PautaService;
