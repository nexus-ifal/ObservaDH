import {
	CreatePoliticoDTO,
	ResponsePoliticoDTO,
	UpdatePoliticoDTO,
} from "@/core/domain/dtos/politico.dto";

export interface PoliticoRepository {
	listar(): Promise<ResponsePoliticoDTO[]>;
	criar(politico: CreatePoliticoDTO): Promise<ResponsePoliticoDTO>;
	atualizar(
		id: string,
		politico: UpdatePoliticoDTO
	): Promise<ResponsePoliticoDTO>;
	excluir(id: string): Promise<ResponsePoliticoDTO>;
}
