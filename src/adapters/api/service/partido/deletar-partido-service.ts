import { prismaClient } from "@/adapters/db/prisma";
import {
	DeletePartidoDTO,
	ResponseDeletePartidoDTO,
} from "@/core/domain/dtos/partido.dto";

interface IDeletarPartidoService {
	executar(params: { id: string }): Promise<ResponseDeletePartidoDTO>;
}

export class DeletarPartidoService implements IDeletarPartidoService {
	private readonly prisma = prismaClient;

	async executar({ id }: DeletePartidoDTO): Promise<ResponseDeletePartidoDTO> {
		try {
			if (!id || typeof id !== "string") {
				throw new Error("ID inválido para deleção");
			}

			await this.prisma.partido.delete({
				where: { id },
			});

			return { sucesso: true };
		} catch (error) {
			if (typeof error === "object" && error !== null && "code" in error) {
				const prismaError = error as { code?: string };
				if (prismaError.code === "P2025") {
					throw new Error(`Partido com ID ${id} não encontrado`);
				}
				if (prismaError.code === "P2003") {
					throw new Error(
						`Não é possível deletar o partido pois existem registros relacionados (Politicos ou Projetos)`
					);
				}
			}

			console.error("Erro ao deletar partido:", error);
			throw error;
		}
	}
}
