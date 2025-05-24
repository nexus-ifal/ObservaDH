import {
	DeleteIdeologiaDTO,
	ResponseDeleteIdeologiaDTO,
} from "@/domain/dtos/ideologia.dto";
import { prismaClient } from "@/services/prisma/prisma";

interface IDeletarIdeologiaService {
	executar(params: { id: string }): Promise<ResponseDeleteIdeologiaDTO>;
}

export class DeletarIdeologiaService implements IDeletarIdeologiaService {
	private readonly prisma = prismaClient;

	async executar({
		id,
	}: DeleteIdeologiaDTO): Promise<ResponseDeleteIdeologiaDTO> {
		try {
			if (!id || typeof id !== "string") {
				throw new Error("ID inválido para deleção");
			}

			await this.prisma.ideologia.delete({
				where: { id },
			});

			return { sucesso: true };
		} catch (error) {
			if (typeof error === "object" && error !== null && "code" in error) {
				const prismaError = error as { code?: string };
				if (prismaError.code === "P2025") {
					throw new Error(`Ideologia com ID ${id} não encontrada`);
				}
				if (prismaError.code === "P2003") {
					throw new Error(
						`Não é possível deletar a ideologia pois existem projetos relacionados`
					);
				}
			}

			console.error("Erro ao deletar ideologia:", error);
			throw error;
		}
	}
}
