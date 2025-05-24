import { Prisma } from "@prisma/client";

import {
	CreatePartidoDTO,
	ResponsePartidoDTO,
} from "@/domain/dtos/partido.dto";
import { prismaClient } from "@/services/prisma/prisma";

interface ICriarPartidoService {
	executar(params: CreatePartidoDTO): Promise<ResponsePartidoDTO>;
}

export class CriarPartidoService implements ICriarPartidoService {
	private readonly prisma = prismaClient;

	async executar({
		nome,
		sigla,
		imagem,
	}: CreatePartidoDTO): Promise<ResponsePartidoDTO> {
		try {
			const partido = await this.prisma.partido.create({
				data: {
					nome,
					sigla,
					imagem,
					politicos: {
						create: [],
					},
					projetos: {
						create: [],
					},
				},
				select: {
					id: true,
					nome: true,
					sigla: true,
					imagem: true,
				},
			});

			return {
				id: partido.id,
				nome: partido.nome,
				sigla: partido.sigla,
				imagem: partido.imagem,
			};
		} catch (error) {
			if (error instanceof Prisma.PrismaClientKnownRequestError) {
				if (error.code === "P2002") {
					throw new Error(
						`Já existe um partido com essas informações: ${error.meta?.target}`
					);
				}
			}

			throw error;
		}
	}
}
