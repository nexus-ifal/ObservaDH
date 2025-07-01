import { prismaClient } from "@/adapters/db/prisma";
import {
	ResponseIdeologiaDTO,
	UpdateIdeologiaDTO,
} from "@/core/domain/dtos/ideologia.dto";

interface IAtualizarIdeologiaService {
	executar(params: {
		ideologia: UpdateIdeologiaDTO;
	}): Promise<ResponseIdeologiaDTO>;
}

export class AtualizarIdeologiaService implements IAtualizarIdeologiaService {
	private readonly prisma = prismaClient;

	async executar({
		ideologia,
	}: {
		ideologia: UpdateIdeologiaDTO;
	}): Promise<ResponseIdeologiaDTO> {
		try {
			if (!ideologia || !ideologia.id) {
				throw new Error("Dados inválidos para atualização da ideologia");
			}

			const dadosAtualizacao: {
				nome?: string;
				descricao?: string;
				sigla?: string;
			} = {};

			if (ideologia.nome !== undefined) {
				dadosAtualizacao.nome = ideologia.nome;
			}

			if (ideologia.descricao !== undefined) {
				dadosAtualizacao.descricao = ideologia.descricao;
			}

			if (ideologia.sigla !== undefined) {
				dadosAtualizacao.sigla = ideologia.sigla;
			}

			if (Object.keys(dadosAtualizacao).length === 0) {
				throw new Error("Nenhum campo fornecido para atualização");
			}

			const ideologiaAtualizada = await this.prisma.ideologia.update({
				where: {
					id: ideologia.id,
				},
				data: dadosAtualizacao,
				select: {
					id: true,
					nome: true,
					descricao: true,
					sigla: true,
				},
			});

			return {
				id: ideologiaAtualizada.id,
				nome: ideologiaAtualizada.nome,
				descricao: ideologiaAtualizada.descricao,
				sigla: ideologiaAtualizada.sigla,
			};
		} catch (error) {
			if (typeof error === "object" && error !== null && "code" in error) {
				const prismaError = error as {
					code: string;
					meta?: Record<string, unknown>;
				};
				if (prismaError.code === "P2025") {
					throw new Error(`Ideologia com ID ${ideologia.id} não encontrada`);
				}
			}

			console.error("Erro ao atualizar ideologia:", error);

			throw error;
		}
	}
}
