import { prismaClient } from "@/adapters/db/prisma";
import {
	ResponseIdeologiaDTO,
	SearchIdeologiaDTO,
} from "@/core/domain/dtos/ideologia.dto";

export interface IBuscarIdeologiaService {
	buscarPorId(
		params: Pick<SearchIdeologiaDTO, "id">
	): Promise<ResponseIdeologiaDTO | null>;
}

export class BuscarIdeologiaService implements IBuscarIdeologiaService {
	constructor(private readonly prisma = prismaClient) {}

	async buscarPorId({
		id,
	}: Pick<SearchIdeologiaDTO, "id">): Promise<ResponseIdeologiaDTO | null> {
		if (!id) return null;

		const ideologiaData = await this.prisma.ideologia.findUnique({
			where: { id },
			include: {
				projetos: true,
			},
		});

		if (!ideologiaData) return null;

		return {
			id: ideologiaData.id,
			nome: ideologiaData.nome,
			descricao: ideologiaData.descricao,
			sigla: ideologiaData.sigla,
			projetos: ideologiaData.projetos,
		};
	}
}
