import { ResponseDireitoVioladoDTO } from "../../domain/dtos/direito-violado.dto";

interface DireitoVioladosUseCase {
	listar(): Promise<ResponseDireitoVioladoDTO[]>;
}

export default DireitoVioladosUseCase;
