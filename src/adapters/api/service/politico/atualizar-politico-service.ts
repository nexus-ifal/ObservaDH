import { prismaClient } from "@/adapters/db/prisma";
import {
	ResponsePoliticoDTO,
	UpdatePoliticoDTO,
} from "@/core/domain/dtos/politico.dto";

interface IAtualizarPoliticoService {
	executar(params: {
		politico: UpdatePoliticoDTO;
	}): Promise<ResponsePoliticoDTO>;
}

export class AtualizarPoliticoService implements IAtualizarPoliticoService {
	private readonly prisma = prismaClient;

	async executar({
		politico,
	}: {
		politico: UpdatePoliticoDTO;
	}): Promise<ResponsePoliticoDTO> {
		try {
			if (!politico || !politico.id) {
				throw new Error("Dados inválidos para atualização do político");
			}

			const dadosAtualizacao: Record<string, unknown> = {};

			if (politico.nome !== undefined) dadosAtualizacao.nome = politico.nome;
			if (politico.foto !== undefined) dadosAtualizacao.foto = politico.foto;
			if (politico.genero !== undefined)
				dadosAtualizacao.genero = politico.genero;
			if (politico.raca !== undefined) dadosAtualizacao.raca = politico.raca;
			if (politico.religiao !== undefined)
				dadosAtualizacao.religiao = politico.religiao;
			if (politico.ideologia !== undefined)
				dadosAtualizacao.ideologia = politico.ideologia;
			if (politico.esferaId !== undefined)
				dadosAtualizacao.esferaId = politico.esferaId;
			if (politico.estadoId !== undefined)
				dadosAtualizacao.estadoId = politico.estadoId;
			if (politico.partidoId !== undefined)
				dadosAtualizacao.partidoId = politico.partidoId;
			if (politico.profissaoId !== undefined)
				dadosAtualizacao.profissaoId = politico.profissaoId;

			if (politico.projetos !== undefined) {
				if (Array.isArray(politico.projetos)) {
					dadosAtualizacao.projetos = {
						set: politico.projetos.map((id) => ({ id })),
					};
				} else {
					throw new Error("O campo projetos precisa ser um array de IDs.");
				}
			}

			Object.keys(dadosAtualizacao).forEach(
				(key) =>
					dadosAtualizacao[key] === undefined && delete dadosAtualizacao[key]
			);

			if (Object.keys(dadosAtualizacao).length === 0) {
				throw new Error("Nenhum campo fornecido para atualização");
			}

			const politicoAtualizado = await this.prisma.politico.update({
				where: {
					id: politico.id,
				},
				data: dadosAtualizacao,
				select: {
					id: true,
					nome: true,
					foto: true,
					genero: true,
					raca: true,
					religiao: true,
					ideologia: true,
					esferaId: true,
					estadoId: true,
					partidoId: true,
					profissaoId: true,
					projetos: true,
				},
			});

			return {
				id: politicoAtualizado.id,
				nome: politicoAtualizado.nome,
				foto: politicoAtualizado.foto,
				genero: politicoAtualizado.genero,
				raca: politicoAtualizado.raca,
				religiao: politicoAtualizado.religiao,
				ideologia: politicoAtualizado.ideologia,
				esferaId: politicoAtualizado.esferaId,
				estadoId: politicoAtualizado.estadoId,
				partidoId: politicoAtualizado.partidoId,
				profissaoId: politicoAtualizado.profissaoId,
				projetos: politicoAtualizado.projetos,
			};
		} catch (error) {
			if (typeof error === "object" && error !== null && "code" in error) {
				const prismaError = error as {
					code: string;
					meta?: Record<string, unknown>;
				};
				if (prismaError.code === "P2025") {
					throw new Error(`Político com ID ${politico.id} não encontrado`);
				}
				if (prismaError.code === "P2003") {
					const field =
						(prismaError.meta?.field_name as string | undefined) ||
						"campo relacionado";
					throw new Error(`ID relacionado inválido: ${field}`);
				}
			}

			console.error("Erro ao atualizar político:", error);

			throw error;
		}
	}
}
