import {
	CreateProfissaoDTO,
	ResponseProfissaoDTO,
	UpdateProfissaoDTO,
} from "../domain/dtos/profissao.dto";
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

	criar(profissao: CreateProfissaoDTO): Promise<ResponseProfissaoDTO> {
		return this.adapter.criar(profissao);
	}

	atualizar(
		id: string,
		profissao: UpdateProfissaoDTO
	): Promise<ResponseProfissaoDTO> {
		return this.adapter.atualizar(id, profissao);
	}

	excluir(id: string): Promise<ResponseProfissaoDTO> {
		return this.adapter.excluir(id);
	}
}

export default ProfissaoService;
