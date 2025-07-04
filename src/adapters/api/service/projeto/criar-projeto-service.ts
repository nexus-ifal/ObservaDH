import { Prisma } from "@prisma/client";

import { prismaClient } from "@/adapters/db/prisma";
import {
	CreateProjetoDTO,
	ResponseProjetoDTO,
} from "@/core/domain/dtos/projeto.dto";

interface ICriarProjetoService {
	executar(params: CreateProjetoDTO): Promise<ResponseProjetoDTO>;
}

export class CriarProjetoService implements ICriarProjetoService {
	private readonly prisma = prismaClient;

	async executar(params: CreateProjetoDTO): Promise<ResponseProjetoDTO> {
		try {
			let partidosData = undefined;

			if (params.autoresId && params.autoresId.length > 0) {
				const autores = await this.prisma.politico.findMany({
					where: { id: { in: params.autoresId } },
					select: { partidoId: true },
				});
				const partidoIds = [
					...new Set(
						autores
							.map((autor) => autor.partidoId)
							.filter((id): id is string => !!id)
					),
				];
				if (partidoIds.length > 0) {
					partidosData = {
						connect: partidoIds.map((id) => ({ id })),
					};
				} else {
					partidosData = undefined;
				}
			}
			const projeto = await this.prisma.projeto.create({
				data: {
					ano: params.ano,
					ementa: params.ementa,
					pautaId: params.pautaId,
					esferaId: params.esferaId,
					numeroPl: params.numeroPl,
					justificativa: params.justificativa,

					ideologias: {
						connect: params.ideologiasId.map((ideologiaId) => ({
							id: ideologiaId,
						})),
					},
					autores: {
						connect: params.autoresId?.map((autorId) => ({ id: autorId })),
					},
					direitosViolados: {
						connect: params.direitosVioladosId?.map((direitoId) => ({
							id: direitoId,
						})),
					},
					partidos: partidosData,
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
