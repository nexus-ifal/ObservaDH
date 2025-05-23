import { Prisma } from "@prisma/client";

import { CreateEsferaDTO, ResponseEsferaDTO } from "@/domain/dtos/esfera.dto";
import { prismaClient } from "@/services/prisma/prisma";

interface ICriarEsferaService {
	executar(params: CreateEsferaDTO): Promise<ResponseEsferaDTO>;
}

export class CriarEsferaService implements ICriarEsferaService {
	private readonly prisma = prismaClient;

	async executar({ nome }: CreateEsferaDTO): Promise<ResponseEsferaDTO> {
		try {
			const esfera = await this.prisma.esfera.create({
				data: {
					nome,
					politicos: {},
					projetos: {},
				},
				select: {
					id: true,
					nome: true,
				},
			});

			return {
				id: esfera.id,
				nome: esfera.nome,
			};
		} catch (error) {
			if (error instanceof Prisma.PrismaClientKnownRequestError) {
				console.error("Erro ao criar esfera:", error);
				throw error;
			}

			throw error;
		}
	}
}
