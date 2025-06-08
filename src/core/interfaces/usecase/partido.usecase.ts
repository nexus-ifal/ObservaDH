import {
	CreatePartidoDTO,
	ResponsePartidoDTO,
	UpdatePartidoDTO,
} from "@/core/domain/dtos/partido.dto";

interface PartidoUseCase {
	listar(): Promise<ResponsePartidoDTO[]>;
	criar(partido: CreatePartidoDTO): Promise<ResponsePartidoDTO>;
	atualizar(id: string, partido: UpdatePartidoDTO): Promise<ResponsePartidoDTO>;
	excluir(id: string): Promise<ResponsePartidoDTO>;
}

export default PartidoUseCase;
