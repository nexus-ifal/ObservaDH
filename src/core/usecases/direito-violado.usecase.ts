import {
	CreateDireitoVioladoDTO,
	ResponseDireitoVioladoDTO,
	UpdateDireitoVioladoDTO,
} from "@/core/domain/dtos/direito-violado.dto";

interface DireitoVioladoUseCase {
	listar(): Promise<ResponseDireitoVioladoDTO[]>;
	criar(
		direitoViolado: CreateDireitoVioladoDTO
	): Promise<ResponseDireitoVioladoDTO>;
	atualizar(
		id: string,
		direitoViolado: UpdateDireitoVioladoDTO
	): Promise<ResponseDireitoVioladoDTO>;
	excluir(id: string): Promise<ResponseDireitoVioladoDTO>;
}

export default DireitoVioladoUseCase;
