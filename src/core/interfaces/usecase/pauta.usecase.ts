import {
	CreatePautaDTO,
	ResponsePautaDTO,
	UpdatePautaDTO,
} from "@/core/domain/dtos/pauta.dto";

interface PautaUseCase {
	listar(): Promise<ResponsePautaDTO[]>;
	criar(pauta: CreatePautaDTO): Promise<ResponsePautaDTO>;
	atualizar(id: string, pauta: UpdatePautaDTO): Promise<ResponsePautaDTO>;
	excluir(id: string): Promise<ResponsePautaDTO>;
}

export default PautaUseCase;
