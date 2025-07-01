import {
	CreatePoliticoDTO,
	ResponsePoliticoDTO,
	UpdatePoliticoDTO,
} from "@/core/domain/dtos/politico.dto";

interface PoliticoUseCase {
	listar(): Promise<ResponsePoliticoDTO[]>;
	criar(politico: CreatePoliticoDTO): Promise<ResponsePoliticoDTO>;
	atualizar(
		id: string,
		politico: UpdatePoliticoDTO
	): Promise<ResponsePoliticoDTO>;
	excluir(id: string): Promise<ResponsePoliticoDTO>;
}

export default PoliticoUseCase;
