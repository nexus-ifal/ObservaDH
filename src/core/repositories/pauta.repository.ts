import {
	CreatePautaDTO,
	ResponsePautaDTO,
	UpdatePautaDTO,
} from "@/core/domain/dtos/pauta.dto";

export interface PautaRepository {
	listar(): Promise<ResponsePautaDTO[]>;
	criar(pauta: CreatePautaDTO): Promise<ResponsePautaDTO>;
	atualizar(id: string, pauta: UpdatePautaDTO): Promise<ResponsePautaDTO>;
	excluir(id: string): Promise<ResponsePautaDTO>;
}
