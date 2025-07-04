import { prismaClient } from "@/adapters/db/prisma";
import {
	DeleteEstadoDTO,
	ResponseDeleteEstadoDTO,
} from "@/core/domain/dtos/estado.dto";

export class DeletarEstadoService {
	private readonly prisma = prismaClient;

	async executar({ id }: DeleteEstadoDTO): Promise<ResponseDeleteEstadoDTO> {
		try {
			if (!id || typeof id !== "string") {
				throw new Error("ID inválido para deleção");
			}

			await this.prisma.estado.delete({
				where: { id },
			});

			return { sucesso: true };
		} catch (error) {
			if (typeof error === "object" && error !== null && "code" in error) {
				const prismaError = error as { code?: string };
				if (prismaError.code === "P2025") {
					throw new Error(`Estado com ID ${id} não encontrado`);
				}
				if (prismaError.code === "P2003") {
					throw new Error(
						`Não é possível deletar o estado pois existem registros relacionados`
					);
				}
			}

			console.error("Erro ao deletar estado:", error);
			throw error;
		}
	}
}
