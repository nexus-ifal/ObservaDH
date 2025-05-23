import {
	DeleteProjetoDTO,
	ResponseDeleteProjetoDTO,
} from "@/domain/dtos/projeto.dto";
import { prismaClient } from "@/services/prisma/prisma";

interface IDeletarProjetoService {
	executar(params: { id: string }): Promise<ResponseDeleteProjetoDTO>;
}

export class DeletarProjetoService implements IDeletarProjetoService {
	private readonly prisma = prismaClient;

	async executar({ id }: DeleteProjetoDTO): Promise<ResponseDeleteProjetoDTO> {
		try {
			if (!id || typeof id !== "string") {
				throw new Error("ID inválido para deleção");
			}

			await this.prisma.projeto.delete({
				where: { id },
			});

			return { sucesso: true };
		} catch (error) {
			if (typeof error === "object" && error !== null && "code" in error) {
				const prismaError = error as { code?: string };
				if (prismaError.code === "P2025") {
					throw new Error(`Projeto com ID ${id} não encontrado`);
				}
				if (prismaError.code === "P2003") {
					throw new Error(
						`Não é possível deletar o projeto pois existem registros relacionados (ex: autores)`
					);
				}
			}

			console.error("Erro ao deletar projeto:", error);
			throw error;
		}
	}
}
