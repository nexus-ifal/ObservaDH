import { Prisma } from "@prisma/client";

import { prismaClient } from "@/adapters/db/prisma";
import {
	CreateIdeologiaDTO,
	ResponseIdeologiaDTO,
} from "@/core/domain/dtos/ideologia.dto";

interface ICriarIdeologiaService {
	executar(params: CreateIdeologiaDTO): Promise<ResponseIdeologiaDTO>;
}

export class CriarIdeologiaService implements ICriarIdeologiaService {
	private readonly prisma = prismaClient;

	async executar({
		nome,
		descricao,
		sigla,
	}: CreateIdeologiaDTO): Promise<ResponseIdeologiaDTO> {
		try {
			const ideologia = await this.prisma.ideologia.create({
				data: {
					nome,
					descricao,
					sigla,
					projetos: {},
				},
				select: {
					id: true,
					nome: true,
					descricao: true,
					sigla: true,
				},
			});

			return {
				id: ideologia.id,
				nome: ideologia.nome,
				descricao: ideologia.descricao,
				sigla: ideologia.sigla,
			};
		} catch (error) {
			if (error instanceof Prisma.PrismaClientKnownRequestError) {
				console.error("Erro ao criar ideologia:", error);
				throw error;
			}

			throw error;
		}
	}
}
