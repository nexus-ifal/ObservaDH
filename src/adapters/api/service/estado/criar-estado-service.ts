import { Prisma } from "@prisma/client";

import { prismaClient } from "@/adapters/db/prisma";
import {
	CreateEstadoDTO,
	ResponseEstadoDTO,
} from "@/core/domain/dtos/estado.dto";

export class CriarEstadoService {
	private readonly prisma = prismaClient;

	async executar({ nome, sigla }: CreateEstadoDTO): Promise<ResponseEstadoDTO> {
		try {
			const estado = await this.prisma.estado.create({
				data: {
					nome,
					sigla,
					politicos: {
						create: [],
					},
				},
				select: {
					id: true,
					nome: true,
					sigla: true,
				},
			});

			return {
				id: estado.id,
				nome: estado.nome,
				sigla: estado.sigla,
			};
		} catch (error) {
			if (error instanceof Prisma.PrismaClientKnownRequestError) {
				if (error.code === "P2002") {
					throw new Error(
						`Já existe um estado com essas informações: ${error.meta?.target}`
					);
				}
			}

			throw error;
		}
	}
}
