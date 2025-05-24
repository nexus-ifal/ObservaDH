import { Prisma } from "@prisma/client";

import {
	CreateDireitoVioladoDTO,
	ResponseDireitoVioladoDTO,
} from "@/domain/dtos/direito-violado.dto";
import { prismaClient } from "@/services/prisma/prisma";

interface ICriarDireitoVioladoService {
	executar(params: CreateDireitoVioladoDTO): Promise<ResponseDireitoVioladoDTO>;
}

export class CriarDireitoVioladoService implements ICriarDireitoVioladoService {
	private readonly prisma = prismaClient;

	async executar({
		nome,
		sigla,
		descricao,
	}: CreateDireitoVioladoDTO): Promise<ResponseDireitoVioladoDTO> {
		try {
			const direitoViolado = await this.prisma.direitoViolado.create({
				data: {
					nome,
					sigla,
					descricao,
					projetos: {},
				},
				select: {
					id: true,
					nome: true,
					sigla: true,
					descricao: true,
				},
			});

			return {
				id: direitoViolado.id,
				nome: direitoViolado.nome,
				sigla: direitoViolado.sigla,
				descricao: direitoViolado.descricao,
			};
		} catch (error) {
			if (error instanceof Prisma.PrismaClientKnownRequestError) {
				if (error.code === "P2002") {
					throw new Error(
						`Já existe um Direito Violado com este nome: ${error.meta?.target}`
					);
				}
			}

			throw error;
		}
	}
}
