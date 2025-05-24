import { ResponseEstadoDTO, UpdateEstadoDTO } from "@/domain/dtos/estado.dto";
import { prismaClient } from "@/services/prisma/prisma";

export class AtualizarEstadoService {
	private readonly prisma = prismaClient;

	async executar({
		estado,
	}: {
		estado: UpdateEstadoDTO;
	}): Promise<ResponseEstadoDTO> {
		try {
			if (!estado || !estado.id) {
				throw new Error("Dados inválidos para atualização do estado");
			}

			const dadosAtualizacao: { nome?: string; sigla?: string } = {};

			if (estado.nome) {
				dadosAtualizacao.nome = estado.nome;
			}

			if (estado.sigla) {
				dadosAtualizacao.sigla = estado.sigla;
			}

			if (Object.keys(dadosAtualizacao).length === 0) {
				throw new Error("Nenhum campo fornecido para atualização");
			}

			const estadoAtualizado = await this.prisma.estado.update({
				where: {
					id: estado.id,
				},
				data: dadosAtualizacao,
			});

			return {
				id: estadoAtualizado.id,
				nome: estadoAtualizado.nome,
				sigla: estadoAtualizado.sigla,
			};
		} catch (error) {
			if (typeof error === "object" && error !== null && "code" in error) {
				const prismaError = error as {
					code: string;
					meta?: Record<string, unknown>;
				};
				if (prismaError.code === "P2025") {
					throw new Error(`Estado com ID ${estado.id} não encontrado`);
				}

				if (prismaError.code === "P2002") {
					const campo = (prismaError.meta?.target as string[] | undefined)?.[0];
					throw new Error(
						`Já existe um estado com este ${campo === "nome" ? "nome" : "sigla"}`
					);
				}
			}

			console.error("Erro ao atualizar estado:", error);

			throw error;
		}
	}
}
