import {
	ResponseProfissaoDTO,
	UpdateProfissaoDTO,
} from "@/core/domain/dtos/profissao.dto";
import { prismaClient } from "@/services/prisma/prisma";

interface IAtualizarProfissaoService {
	executar(params: {
		profissao: UpdateProfissaoDTO;
	}): Promise<ResponseProfissaoDTO>;
}

export class AtualizarProfissaoService implements IAtualizarProfissaoService {
	private readonly prisma = prismaClient;

	async executar({
		profissao,
	}: {
		profissao: UpdateProfissaoDTO;
	}): Promise<ResponseProfissaoDTO> {
		try {
			if (!profissao || !profissao.id) {
				throw new Error("Dados inválidos para atualização da profissão");
			}

			const dadosAtualizacao: {
				nome?: string;
			} = {};

			if (profissao.nome !== undefined) {
				dadosAtualizacao.nome = profissao.nome;
			}

			if (Object.keys(dadosAtualizacao).length === 0) {
				throw new Error("Nenhum campo fornecido para atualização");
			}

			const profissaoAtualizada = await this.prisma.profissao.update({
				where: {
					id: profissao.id,
				},
				data: dadosAtualizacao,
				select: {
					id: true,
					nome: true,
				},
			});

			return {
				id: profissaoAtualizada.id,
				nome: profissaoAtualizada.nome,
			};
		} catch (error) {
			if (typeof error === "object" && error !== null && "code" in error) {
				const prismaError = error as {
					code: string;
					meta?: Record<string, unknown>;
				};
				if (prismaError.code === "P2025") {
					throw new Error(`Profissão com ID ${profissao.id} não encontrada`);
				}

				if (prismaError.code === "P2002") {
					const campo = (prismaError.meta?.target as string[] | undefined)?.[0];
					throw new Error(`Já existe outra Profissão com este ${campo}`);
				}
			}

			console.error("Erro ao atualizar profissão:", error);

			throw error;
		}
	}
}
