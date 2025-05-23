import {
	DeletePautaDTO,
	ResponseDeletePautaDTO,
} from "@/domain/dtos/pauta.dto";
import { prismaClient } from "@/services/prisma/prisma";

interface IDeletarPautaService {
	executar(params: { id: string }): Promise<ResponseDeletePautaDTO>;
}

export class DeletarPautaService implements IDeletarPautaService {
	private readonly prisma = prismaClient;

	async executar({ id }: DeletePautaDTO): Promise<ResponseDeletePautaDTO> {
		try {
			if (!id || typeof id !== "string") {
				throw new Error("ID inválido para deleção");
			}

			await this.prisma.pauta.delete({
				where: { id },
			});

			return { sucesso: true };
		} catch (error) {
			if (typeof error === "object" && error !== null && "code" in error) {
				const prismaError = error as { code?: string };
				if (prismaError.code === "P2025") {
					throw new Error(`Pauta com ID ${id} não encontrada`);
				}
				if (prismaError.code === "P2003") {
					throw new Error(
						`Não é possível deletar a pauta pois existem projetos relacionados`
					);
				}
			}

			console.error("Erro ao deletar pauta:", error);
			throw error;
		}
	}
}
