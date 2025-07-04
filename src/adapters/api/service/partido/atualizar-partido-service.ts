import { prismaClient } from "@/adapters/db/prisma";
import {
	ResponsePartidoDTO,
	UpdatePartidoDTO,
} from "@/core/domain/dtos/partido.dto";

interface IAtualizarPartidoService {
	executar(params: { partido: UpdatePartidoDTO }): Promise<ResponsePartidoDTO>;
}

export class AtualizarPartidoService implements IAtualizarPartidoService {
	private readonly prisma = prismaClient;

	async executar({
		partido,
	}: {
		partido: UpdatePartidoDTO;
	}): Promise<ResponsePartidoDTO> {
		try {
			if (!partido || !partido.id) {
				throw new Error("Dados inválidos para atualização do partido");
			}

			const dadosAtualizacao: {
				nome?: string;
				sigla?: string;
				imagem?: string | null;
			} = {};

			if (partido.nome !== undefined) {
				dadosAtualizacao.nome = partido.nome;
			}

			if (partido.sigla !== undefined) {
				dadosAtualizacao.sigla = partido.sigla;
			}

			if (partido.imagem !== undefined) {
				dadosAtualizacao.imagem = partido.imagem;
			}

			if (Object.keys(dadosAtualizacao).length === 0) {
				throw new Error("Nenhum campo fornecido para atualização");
			}

			const partidoAtualizado = await this.prisma.partido.update({
				where: {
					id: partido.id,
				},
				data: dadosAtualizacao,
				select: {
					id: true,
					nome: true,
					sigla: true,
					imagem: true,
				},
			});

			return {
				id: partidoAtualizado.id,
				nome: partidoAtualizado.nome,
				sigla: partidoAtualizado.sigla,
				imagem: partidoAtualizado.imagem,
			};
		} catch (error) {
			if (typeof error === "object" && error !== null && "code" in error) {
				const prismaError = error as {
					code: string;
					meta?: Record<string, unknown>;
				};
				if (prismaError.code === "P2025") {
					throw new Error(`Partido com ID ${partido.id} não encontrado`);
				}

				if (prismaError.code === "P2002") {
					const campo = (prismaError.meta?.target as string[] | undefined)?.[0];
					throw new Error(`Já existe outro partido com este ${campo}`);
				}
			}

			console.error("Erro ao atualizar partido:", error);

			throw error;
		}
	}
}
