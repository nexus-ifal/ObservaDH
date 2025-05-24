import { ResponseDireitoVioladoDTO } from "@/core/domain/dtos/direito-violado.dto";
import { DireitoVioladoRepository } from "@/core/interfaces/repository/direito-violado.repository";
import { conexaoBackend } from "@/infra/services/conexao-backend/client";

class DireitoVioladoAPI implements DireitoVioladoRepository {
	async listar(): Promise<ResponseDireitoVioladoDTO[]> {
		const response = await conexaoBackend.get("/direito-violado");
		const dados = response.data.dados;
		console.log("aaaaaaa", dados)
		return dados;
	}
}
export default DireitoVioladoAPI;