import { ResponseProfissaoDTO } from "../domain/dtos/profissao.dto";
import { ProfissaoRepository } from "../interfaces/repository/profissao.repository";
import ProfissaoUseCase from "../interfaces/usecase/profissao.usecase";

class ProfissaoService implements ProfissaoUseCase {
	protected readonly adapter: ProfissaoRepository;

	constructor(adapter: ProfissaoRepository) {
		this.adapter = adapter;
	}

	listar(): Promise<ResponseProfissaoDTO[]> {
		return this.adapter.listar();
	}
}

export default ProfissaoService;
