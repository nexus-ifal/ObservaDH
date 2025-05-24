import { ResponseEsferaDTO, UpdateEsferaDTO } from "@/domain/dtos/esfera.dto";
import { prismaClient } from "@/services/prisma/prisma";

interface IAtualizarEsferaService {
	executar(params: { esfera: UpdateEsferaDTO }): Promise<ResponseEsferaDTO>;
}

export class AtualizarEsferaService implements IAtualizarEsferaService {
	private readonly prisma = prismaClient;

	async executar({
		esfera,
	}: {
		esfera: UpdateEsferaDTO;
	}): Promise<ResponseEsferaDTO> {
		try {
			if (!esfera || !esfera.id) {
				throw new Error("Dados inválidos para atualização da esfera");
			}

			const dadosAtualizacao: {
				nome?: string;
			} = {};

			if (esfera.nome !== undefined) {
				dadosAtualizacao.nome = esfera.nome;
			}

			if (Object.keys(dadosAtualizacao).length === 0) {
				throw new Error("Nenhum campo fornecido para atualização");
			}

			const esferaAtualizada = await this.prisma.esfera.update({
				where: {
					id: esfera.id,
				},
				data: dadosAtualizacao,
				select: {
					id: true,
					nome: true,
				},
			});

			return {
				id: esferaAtualizada.id,
				nome: esferaAtualizada.nome,
			};
		} catch (error) {
			if (typeof error === "object" && error !== null && "code" in error) {
				const prismaError = error as {
					code: string;
					meta?: Record<string, unknown>;
				};
				if (prismaError.code === "P2025") {
					throw new Error(`Esfera com ID ${esfera.id} não encontrada`);
				}
			}

			console.error("Erro ao atualizar esfera:", error);

			throw error;
		}
	}
}
