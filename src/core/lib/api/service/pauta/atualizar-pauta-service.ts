import { ResponsePautaDTO, UpdatePautaDTO } from "@/domain/dtos/pauta.dto";
import { prismaClient } from "@/services/prisma/prisma";

interface IAtualizarPautaService {
	executar(params: { pauta: UpdatePautaDTO }): Promise<ResponsePautaDTO>;
}

export class AtualizarPautaService implements IAtualizarPautaService {
	private readonly prisma = prismaClient;

	async executar({
		pauta,
	}: {
		pauta: UpdatePautaDTO;
	}): Promise<ResponsePautaDTO> {
		try {
			if (!pauta || !pauta.id) {
				throw new Error("Dados inválidos para atualização da pauta");
			}

			const dadosAtualizacao: {
				nome?: string;
			} = {};

			if (pauta.nome !== undefined) {
				dadosAtualizacao.nome = pauta.nome;
			}

			if (Object.keys(dadosAtualizacao).length === 0) {
				throw new Error("Nenhum campo fornecido para atualização");
			}

			const pautaAtualizada = await this.prisma.pauta.update({
				where: {
					id: pauta.id,
				},
				data: dadosAtualizacao,
				select: {
					id: true,
					nome: true,
				},
			});

			return {
				id: pautaAtualizada.id,
				nome: pautaAtualizada.nome,
			};
		} catch (error) {
			if (typeof error === "object" && error !== null && "code" in error) {
				const prismaError = error as {
					code: string;
					meta?: Record<string, unknown>;
				};
				if (prismaError.code === "P2025") {
					throw new Error(`Pauta com ID ${pauta.id} não encontrada`);
				}

				if (prismaError.code === "P2002") {
					const campo = (prismaError.meta?.target as string[] | undefined)?.[0];
					throw new Error(`Já existe outra Pauta com este ${campo}`);
				}
			}

			console.error("Erro ao atualizar pauta:", error);

			throw error;
		}
	}
}
