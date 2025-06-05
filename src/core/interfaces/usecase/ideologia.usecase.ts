import {
	CreateIdeologiaDTO,
	ResponseIdeologiaDTO,
	UpdateIdeologiaDTO,
} from "@/core/domain/dtos/ideologia.dto";

interface IdeologiaUseCase {
	listar(): Promise<ResponseIdeologiaDTO[]>;
	criar(ideologia: CreateIdeologiaDTO): Promise<ResponseIdeologiaDTO>;
	atualizar(
		id: string,
		ideologia: UpdateIdeologiaDTO
	): Promise<ResponseIdeologiaDTO>;
	excluir(id: string): Promise<ResponseIdeologiaDTO>;
}

export default IdeologiaUseCase;
