import { Prisma } from "@prisma/client";

import { CreatePautaDTO, ResponsePautaDTO } from "@/domain/dtos/pauta.dto";
import { prismaClient } from "@/services/prisma/prisma";

interface ICriarPautaService {
	executar(params: CreatePautaDTO): Promise<ResponsePautaDTO>;
}

export class CriarPautaService implements ICriarPautaService {
	private readonly prisma = prismaClient;

	async executar({ nome }: CreatePautaDTO): Promise<ResponsePautaDTO> {
		try {
			const pauta = await this.prisma.pauta.create({
				data: {
					nome,
					projetos: {},
				},
				select: {
					id: true,
					nome: true,
				},
			});

			return {
				id: pauta.id,
				nome: pauta.nome,
			};
		} catch (error) {
			if (error instanceof Prisma.PrismaClientKnownRequestError) {
				if (error.code === "P2002") {
					throw new Error(
						`Já existe uma Pauta com este nome: ${error.meta?.target}`
					);
				}
			}

			throw error;
		}
	}
}
