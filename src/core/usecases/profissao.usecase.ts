import {
	CreateProfissaoDTO,
	ResponseProfissaoDTO,
	UpdateProfissaoDTO,
} from "@/core/domain/dtos/profissao.dto";

interface ProfissaoUseCase {
	listar(): Promise<ResponseProfissaoDTO[]>;
	criar(profissao: CreateProfissaoDTO): Promise<ResponseProfissaoDTO>;
	atualizar(
		id: string,
		profissao: UpdateProfissaoDTO
	): Promise<ResponseProfissaoDTO>;
	excluir(id: string): Promise<ResponseProfissaoDTO>;
}

export default ProfissaoUseCase;
