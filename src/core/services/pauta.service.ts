import {
	CreatePautaDTO,
	ResponsePautaDTO,
	UpdatePautaDTO,
} from "../domain/dtos/pauta.dto";
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

	criar(pauta: CreatePautaDTO): Promise<ResponsePautaDTO> {
		return this.adapter.criar(pauta);
	}
	atualizar(id: string, pauta: UpdatePautaDTO): Promise<ResponsePautaDTO> {
		return this.adapter.atualizar(id, pauta);
	}

	excluir(id: string): Promise<ResponsePautaDTO> {
		return this.adapter.excluir(id);
	}
}

export default PautaService;
