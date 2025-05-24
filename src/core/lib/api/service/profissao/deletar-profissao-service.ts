import {
	DeleteProfissaoDTO,
	ResponseDeleteProfissaoDTO,
} from "@/domain/dtos/profissao.dto";
import { prismaClient } from "@/services/prisma/prisma";

interface IDeletarProfissaoService {
	executar(params: { id: string }): Promise<ResponseDeleteProfissaoDTO>;
}

export class DeletarProfissaoService implements IDeletarProfissaoService {
	private readonly prisma = prismaClient;

	async executar({
		id,
	}: DeleteProfissaoDTO): Promise<ResponseDeleteProfissaoDTO> {
		try {
			if (!id || typeof id !== "string") {
				throw new Error("ID inválido para deleção");
			}

			await this.prisma.profissao.delete({
				where: { id },
			});

			return { sucesso: true };
		} catch (error) {
			if (typeof error === "object" && error !== null && "code" in error) {
				const prismaError = error as { code?: string };
				if (prismaError.code === "P2025") {
					throw new Error(`Profissão com ID ${id} não encontrada`);
				}
				if (prismaError.code === "P2003") {
					throw new Error(
						`Não é possível deletar a profissão pois existem políticos relacionados`
					);
				}
			}

			console.error("Erro ao deletar profissão:", error);
			throw error;
		}
	}
}
