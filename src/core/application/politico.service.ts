import {
	CreatePoliticoDTO,
	ResponsePoliticoDTO,
	UpdatePoliticoDTO,
} from "../domain/dtos/politico.dto";
import { PoliticoRepository } from "../repositories/politico.repository";
import PoliticoUseCase from "../usecases/politico.usecase";

class PoliticoService implements PoliticoUseCase {
	protected readonly adapter: PoliticoRepository;

	constructor(adapter: PoliticoRepository) {
		this.adapter = adapter;
	}

	listar(): Promise<ResponsePoliticoDTO[]> {
		return this.adapter.listar();
	}

	criar(politico: CreatePoliticoDTO): Promise<ResponsePoliticoDTO> {
		return this.adapter.criar(politico);
	}
	atualizar(
		id: string,
		politico: UpdatePoliticoDTO
	): Promise<ResponsePoliticoDTO> {
		return this.adapter.atualizar(id, politico);
	}

	excluir(id: string): Promise<ResponsePoliticoDTO> {
		return this.adapter.excluir(id);
	}
}

export default PoliticoService;
