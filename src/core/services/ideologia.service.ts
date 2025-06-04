import {
	CreateIdeologiaDTO,
	ResponseIdeologiaDTO,
	UpdateIdeologiaDTO,
} from "../domain/dtos/ideologia.dto";
import { IdeologiaRepository } from "../interfaces/repository/ideologia.repository";
import IdeologiaUseCase from "../interfaces/usecase/ideologia.usecase";

class IdeologiaService implements IdeologiaUseCase {
	protected readonly adapter: IdeologiaRepository;

	constructor(adapter: IdeologiaRepository) {
		this.adapter = adapter;
	}

	listar(): Promise<ResponseIdeologiaDTO[]> {
		return this.adapter.listar();
	}

	criar(ideologia: CreateIdeologiaDTO): Promise<ResponseIdeologiaDTO> {
		return this.adapter.criar(ideologia);
	}

	atualizar(
		id: string,
		ideologia: UpdateIdeologiaDTO
	): Promise<ResponseIdeologiaDTO> {
		return this.adapter.atualizar(id, ideologia);
	}

	excluir(id: string): Promise<ResponseIdeologiaDTO> {
		return this.adapter.excluir(id);
	}
}

export default IdeologiaService;
