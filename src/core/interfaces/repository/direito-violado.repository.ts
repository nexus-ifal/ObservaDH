import { ResponseDireitoVioladoDTO } from "@/core/domain/dtos/direito-violado.dto";

export interface DireitoVioladoRepository {
	listar(): Promise<ResponseDireitoVioladoDTO[]>;
}
