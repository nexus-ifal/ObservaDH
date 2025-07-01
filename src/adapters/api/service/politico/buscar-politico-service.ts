import {
	ResponsePoliticoDTO,
	SearchPoliticoDTO,
} from "@/core/domain/dtos/politico.dto";
import { prismaClient } from "@/services/prisma/prisma";

export interface IBuscarPoliticoService {
	buscarPorId(
		params: Pick<SearchPoliticoDTO, "id">
	): Promise<ResponsePoliticoDTO | null>;
}

export class BuscarPoliticoService implements IBuscarPoliticoService {
	constructor(private readonly prisma = prismaClient) {}

	async buscarPorId({
		id,
	}: Pick<SearchPoliticoDTO, "id">): Promise<ResponsePoliticoDTO | null> {
		if (!id) return null;

		const politicoData = await this.prisma.politico.findUnique({
			where: { id },
			include: {
				esfera: true,
				estado: true,
				partido: true,
				profissao: true,
				projetos: true,
			},
		});

		if (!politicoData) return null;

		return {
			id: politicoData.id,
			nome: politicoData.nome,
			foto: politicoData.foto,
			genero: politicoData.genero,
			raca: politicoData.raca,
			religiao: politicoData.religiao,
			ideologia: politicoData.ideologia,
			esferaId: politicoData.esferaId,
			estadoId: politicoData.estadoId,
			partidoId: politicoData.partidoId,
			profissaoId: politicoData.profissaoId,
			esfera: politicoData.esfera,
			estado: politicoData.estado,
			partido: politicoData.partido,
			profissao: politicoData.profissao,
			projetos: politicoData.projetos,
		};
	}
}
