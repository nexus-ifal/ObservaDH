import {
	DeletePoliticoDTO,
	ResponseDeletePoliticoDTO,
} from "@/domain/dtos/politico.dto";
import { prismaClient } from "@/services/prisma/prisma";

interface IDeletarPoliticoService {
	executar(params: { id: string }): Promise<ResponseDeletePoliticoDTO>;
}

export class DeletarPoliticoService implements IDeletarPoliticoService {
	private readonly prisma = prismaClient;

	async executar({
		id,
	}: DeletePoliticoDTO): Promise<ResponseDeletePoliticoDTO> {
		try {
			if (!id || typeof id !== "string") {
				throw new Error("ID inválido para deleção");
			}

			await this.prisma.politico.delete({
				where: { id },
			});

			return { sucesso: true };
		} catch (error) {
			if (typeof error === "object" && error !== null && "code" in error) {
				const prismaError = error as { code?: string };
				if (prismaError.code === "P2025") {
					throw new Error(`Político com ID ${id} não encontrado`);
				}
				if (prismaError.code === "P2003") {
					throw new Error(
						`Não é possível deletar o político pois ele é autor de projetos`
					);
				}
			}

			console.error("Erro ao deletar político:", error);
			throw error;
		}
	}
}
