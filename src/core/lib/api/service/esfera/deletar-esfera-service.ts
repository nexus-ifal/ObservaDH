import {
	DeleteEsferaDTO,
	ResponseDeleteEsferaDTO,
} from "@/core/domain/dtos/esfera.dto";
import { prismaClient } from "@/services/prisma/prisma";

interface IDeletarEsferaService {
	executar(params: { id: string }): Promise<ResponseDeleteEsferaDTO>;
}

export class DeletarEsferaService implements IDeletarEsferaService {
	private readonly prisma = prismaClient;

	async executar({ id }: DeleteEsferaDTO): Promise<ResponseDeleteEsferaDTO> {
		try {
			if (!id || typeof id !== "string") {
				throw new Error("ID inválido para deleção");
			}

			await this.prisma.esfera.delete({
				where: { id },
			});

			return { sucesso: true };
		} catch (error) {
			if (typeof error === "object" && error !== null && "code" in error) {
				const prismaError = error as { code?: string };
				if (prismaError.code === "P2025") {
					throw new Error(`Esfera com ID ${id} não encontrada`);
				}
				if (prismaError.code === "P2003") {
					throw new Error(
						`Não é possível deletar a esfera pois existem políticos ou projetos relacionados`
					);
				}
			}

			console.error("Erro ao deletar esfera:", error);
			throw error;
		}
	}
}
