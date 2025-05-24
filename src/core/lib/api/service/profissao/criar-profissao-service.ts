import { Prisma } from "@prisma/client";

import {
	CreateProfissaoDTO,
	ResponseProfissaoDTO,
} from "@/core/domain/dtos/profissao.dto";
import { prismaClient } from "@/services/prisma/prisma";

interface ICriarProfissaoService {
	executar(params: CreateProfissaoDTO): Promise<ResponseProfissaoDTO>;
}

export class CriarProfissaoService implements ICriarProfissaoService {
	private readonly prisma = prismaClient;

	async executar({ nome }: CreateProfissaoDTO): Promise<ResponseProfissaoDTO> {
		try {
			const profissao = await this.prisma.profissao.create({
				data: {
					nome,
					politicos: {},
				},
				select: {
					id: true,
					nome: true,
				},
			});

			return {
				id: profissao.id,
				nome: profissao.nome,
			};
		} catch (error) {
			if (error instanceof Prisma.PrismaClientKnownRequestError) {
				if (error.code === "P2002") {
					throw new Error(
						`Já existe uma Profissão com este nome: ${error.meta?.target}`
					);
				}
			}

			throw error;
		}
	}
}
