import { Prisma } from "@prisma/client";

import {
	CreateProjetoDTO,
	ResponseProjetoDTO,
} from "@/domain/dtos/projeto.dto";
import { prismaClient } from "@/services/prisma/prisma";

interface ICriarProjetoService {
	executar(params: CreateProjetoDTO): Promise<ResponseProjetoDTO>;
}

export class CriarProjetoService implements ICriarProjetoService {
	private readonly prisma = prismaClient;

	async executar(params: CreateProjetoDTO): Promise<ResponseProjetoDTO> {
		try {
			const projeto = await this.prisma.projeto.create({
				data: {
					ano: params.ano,
					ementa: params.ementa,
					pautaId: params.pautaId,
					esferaId: params.esferaId,
					numeroPl: params.numeroPl,
					justificativa: params.justificativa,
					direitosViolados: {},
					ideologias: {},
					partidos: {},
					autores: {},
				},
				select: {
					id: true,
					ano: true,
					ementa: true,
					pautaId: true,
					esferaId: true,
					numeroPl: true,
					justificativa: true,
				},
			});

			return {
				id: projeto.id,
				ano: projeto.ano,
				ementa: projeto.ementa,
				pautaId: projeto.pautaId,
				esferaId: projeto.esferaId,
				numeroPl: projeto.numeroPl,
				justificativa: projeto.justificativa,
			};
		} catch (error) {
			if (error instanceof Prisma.PrismaClientKnownRequestError) {
				if (error.code === "P2002") {
					throw new Error(
						`Já existe um projeto com este número PL: ${error.meta?.target}`
					);
				}
				if (error.code === "P2003") {
					const field =
						(error.meta?.field_name as string | undefined) ||
						"campo relacionado";
					throw new Error(`ID relacionado inválido: ${field}`);
				}
			}

			throw error;
		}
	}
}
