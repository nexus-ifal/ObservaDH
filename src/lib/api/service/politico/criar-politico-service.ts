import { Prisma } from "@prisma/client";

import {
	CreatePoliticoDTO,
	ResponsePoliticoDTO,
} from "@/domain/dtos/politico.dto";
import { prismaClient } from "@/services/prisma/prisma";

interface ICriarPoliticoService {
	executar(params: CreatePoliticoDTO): Promise<ResponsePoliticoDTO>;
}

export class CriarPoliticoService implements ICriarPoliticoService {
	private readonly prisma = prismaClient;

	async executar(params: CreatePoliticoDTO): Promise<ResponsePoliticoDTO> {
		try {
			const politico = await this.prisma.politico.create({
				data: {
					nome: params.nome,
					foto: params.foto,
					genero: params.genero,
					raca: params.raca,
					religiao: params.religiao,
					ideologia: params.ideologia,
					esferaId: params.esferaId,
					estadoId: params.estadoId,
					partidoId: params.partidoId,
					profissaoId: params.profissaoId,
					projetos: {},
				},
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
				},
			});

			return {
				id: politico.id,
				nome: politico.nome,
				foto: politico.foto,
				genero: politico.genero,
				raca: politico.raca,
				religiao: politico.religiao,
				ideologia: politico.ideologia,
				esferaId: politico.esferaId,
				estadoId: politico.estadoId,
				partidoId: politico.partidoId,
				profissaoId: politico.profissaoId,
			};
		} catch (error) {
			if (error instanceof Prisma.PrismaClientKnownRequestError) {
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
