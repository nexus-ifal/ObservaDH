import {
	ResponseProjetoDTO,
	UpdateProjetoDTO,
} from "@/core/domain/dtos/projeto.dto";
import { prismaClient } from "@/services/prisma/prisma";

interface IAtualizarProjetoService {
	executar(params: { projeto: UpdateProjetoDTO }): Promise<ResponseProjetoDTO>;
}

export class AtualizarProjetoService implements IAtualizarProjetoService {
	private readonly prisma = prismaClient;

	async executar({
		projeto,
	}: {
		projeto: UpdateProjetoDTO;
	}): Promise<ResponseProjetoDTO> {
		try {
			if (!projeto || !projeto.id) {
				throw new Error("Dados inválidos para atualização do projeto");
			}

			const dadosAtualizacao: {
				ano?: string;
				ementa?: string;
				pautaId?: string;
				esferaId?: string;
				numeroPl?: string;
				justificativa?: string;
			} = {};

			if (projeto.ano !== undefined) dadosAtualizacao.ano = projeto.ano;
			if (projeto.ementa !== undefined)
				dadosAtualizacao.ementa = projeto.ementa;
			if (projeto.pautaId !== undefined)
				dadosAtualizacao.pautaId = projeto.pautaId;
			if (projeto.esferaId !== undefined)
				dadosAtualizacao.esferaId = projeto.esferaId;
			if (projeto.numeroPl !== undefined)
				dadosAtualizacao.numeroPl = projeto.numeroPl;
			if (projeto.justificativa !== undefined)
				dadosAtualizacao.justificativa = projeto.justificativa;

			if (Object.keys(dadosAtualizacao).length === 0) {
				throw new Error("Nenhum campo fornecido para atualização");
			}

			const projetoAtualizado = await this.prisma.projeto.update({
				where: {
					id: projeto.id,
				},
				data: dadosAtualizacao,
				select: {
					id: true,
					ano: true,
					ementa: true,
					pautaId: true,
					esferaId: true,
					numeroPl: true,
					justificativa: true,
				},
			});

			return {
				id: projetoAtualizado.id,
				ano: projetoAtualizado.ano,
				ementa: projetoAtualizado.ementa,
				pautaId: projetoAtualizado.pautaId,
				esferaId: projetoAtualizado.esferaId,
				numeroPl: projetoAtualizado.numeroPl,
				justificativa: projetoAtualizado.justificativa,
			};
		} catch (error) {
			if (typeof error === "object" && error !== null && "code" in error) {
				const prismaError = error as {
					code: string;
					meta?: Record<string, unknown>;
				};
				if (prismaError.code === "P2025") {
					throw new Error(`Projeto com ID ${projeto.id} não encontrado`);
				}
				if (prismaError.code === "P2002") {
					const campo = (prismaError.meta?.target as string[] | undefined)?.[0];
					throw new Error(`Já existe outro projeto com este ${campo}`);
				}
				if (prismaError.code === "P2003") {
					const field =
						(prismaError.meta?.field_name as string | undefined) ||
						"campo relacionado";
					throw new Error(`ID relacionado inválido: ${field}`);
				}
			}

			console.error("Erro ao atualizar projeto:", error);

			throw error;
		}
	}
}
