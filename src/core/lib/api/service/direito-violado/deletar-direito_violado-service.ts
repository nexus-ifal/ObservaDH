import {
	DeleteDireitoVioladoDTO,
	ResponseDeleteDireitoVioladoDTO,
} from "@/domain/dtos/direito-violado.dto";
import { prismaClient } from "@/services/prisma/prisma";

interface IDeletarDireitoVioladoService {
	executar(params: { id: string }): Promise<ResponseDeleteDireitoVioladoDTO>;
}

export class DeletarDireitoVioladoService
	implements IDeletarDireitoVioladoService
{
	private readonly prisma = prismaClient;

	async executar({
		id,
	}: DeleteDireitoVioladoDTO): Promise<ResponseDeleteDireitoVioladoDTO> {
		try {
			if (!id || typeof id !== "string") {
				throw new Error("ID inválido para deleção");
			}

			await this.prisma.direitoViolado.delete({
				where: { id },
			});

			return { sucesso: true };
		} catch (error) {
			if (typeof error === "object" && error !== null && "code" in error) {
				const prismaError = error as { code?: string };
				if (prismaError.code === "P2025") {
					throw new Error(`Direito Violado com ID ${id} não encontrado`);
				}
				if (prismaError.code === "P2003") {
					throw new Error(
						`Não é possível deletar o Direito Violado pois existem projetos relacionados`
					);
				}
			}

			console.error("Erro ao deletar Direito Violado:", error);
			throw error;
		}
	}
}
