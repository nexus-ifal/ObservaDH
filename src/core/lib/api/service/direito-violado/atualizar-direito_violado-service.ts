import {
	ResponseDireitoVioladoDTO,
	UpdateDireitoVioladoDTO,
} from "@/domain/dtos/direito-violado.dto";
import { prismaClient } from "@/services/prisma/prisma";

interface IAtualizarDireitoVioladoService {
	executar(params: {
		direitoViolado: UpdateDireitoVioladoDTO;
	}): Promise<ResponseDireitoVioladoDTO>;
}

export class AtualizarDireitoVioladoService
	implements IAtualizarDireitoVioladoService
{
	private readonly prisma = prismaClient;

	async executar({
		direitoViolado,
	}: {
		direitoViolado: UpdateDireitoVioladoDTO;
	}): Promise<ResponseDireitoVioladoDTO> {
		try {
			if (!direitoViolado || !direitoViolado.id) {
				throw new Error("Dados inválidos para atualização do Direito Violado");
			}

			const dadosAtualizacao: {
				nome?: string;
				sigla?: string;
				descricao?: string;
			} = {};

			if (direitoViolado.nome !== undefined) {
				dadosAtualizacao.nome = direitoViolado.nome;
			}

			if (direitoViolado.sigla !== undefined) {
				dadosAtualizacao.sigla = direitoViolado.sigla;
			}

			if (direitoViolado.descricao !== undefined) {
				dadosAtualizacao.descricao = direitoViolado.descricao;
			}

			if (Object.keys(dadosAtualizacao).length === 0) {
				throw new Error("Nenhum campo fornecido para atualização");
			}

			const direitoVioladoAtualizado = await this.prisma.direitoViolado.update({
				where: {
					id: direitoViolado.id,
				},
				data: dadosAtualizacao,
				select: {
					id: true,
					nome: true,
					sigla: true,
					descricao: true,
				},
			});

			return {
				id: direitoVioladoAtualizado.id,
				nome: direitoVioladoAtualizado.nome,
				sigla: direitoVioladoAtualizado.sigla,
				descricao: direitoVioladoAtualizado.descricao,
			};
		} catch (error) {
			if (typeof error === "object" && error !== null && "code" in error) {
				const prismaError = error as {
					code: string;
					meta?: Record<string, unknown>;
				};
				if (prismaError.code === "P2025") {
					throw new Error(
						`Direito Violado com ID ${direitoViolado.id} não encontrado`
					);
				}

				if (prismaError.code === "P2002") {
					const campo = (prismaError.meta?.target as string[] | undefined)?.[0];
					throw new Error(`Já existe outro Direito Violado com este ${campo}`);
				}
			}

			console.error("Erro ao atualizar Direito Violado:", error);

			throw error;
		}
	}
}
