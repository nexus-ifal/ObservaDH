import { ResponseIdeologiaDTO } from "../domain/dtos/ideologia.dto";
import { IdeologiaRepository } from "../interfaces/repository/ideologia.repository";
import IdeologiaUseCase from "../interfaces/usecase/ideologia.usecase";

class IdeologiaService implements IdeologiaUseCase {
	protected readonly adapter: IdeologiaRepository;

	constructor(adapter: IdeologiaRepository) {
		this.adapter = adapter
	}
	listar(): Promise<ResponseIdeologiaDTO[]> {
		return this.adapter.listar();
	}
}


export default IdeologiaService;
