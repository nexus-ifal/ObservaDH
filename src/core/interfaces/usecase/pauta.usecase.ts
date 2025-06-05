import {
	CreatePautaDTO,
	ResponsePautaDTO,
	UpdatePautaDTO,
} from "@/core/domain/dtos/pauta.dto";

interface PautaUseCase {
	listar(): Promise<ResponsePautaDTO[]>;
	criar(Pauta: CreatePautaDTO): Promise<ResponsePautaDTO>;
	atualizar(id: string, Pauta: UpdatePautaDTO): Promise<ResponsePautaDTO>;
	excluir(id: string): Promise<ResponsePautaDTO>;
}

export default PautaUseCase;
