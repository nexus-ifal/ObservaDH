import { ResponsePautaDTO, SearchPautaDTO } from "@/domain/dtos/pauta.dto";
import { prismaClient } from "@/services/prisma/prisma";

export interface IBuscarPautaService {
	buscarPorId(
		params: Pick<SearchPautaDTO, "id">
	): Promise<ResponsePautaDTO | null>;
	buscarPorNome(
		params: Pick<SearchPautaDTO, "nome">
	): Promise<ResponsePautaDTO | null>;
}

export class BuscarPautaService implements IBuscarPautaService {
	constructor(private readonly prisma = prismaClient) {}

	async buscarPorId({
		id,
	}: Pick<SearchPautaDTO, "id">): Promise<ResponsePautaDTO | null> {
		if (!id) return null;

		const pautaData = await this.prisma.pauta.findUnique({
			where: { id },
			include: {
				projetos: true,
			},
		});

		if (!pautaData) return null;

		return {
			id: pautaData.id,
			nome: pautaData.nome,
			projetos: pautaData.projetos,
		};
	}

	async buscarPorNome({
		nome,
	}: Pick<SearchPautaDTO, "nome">): Promise<ResponsePautaDTO | null> {
		if (!nome) return null;

		const pautaData = await this.prisma.pauta.findFirst({
			where: { nome },
			include: {
				projetos: true,
			},
		});

		if (!pautaData) return null;

		return {
			id: pautaData.id,
			nome: pautaData.nome,
			projetos: pautaData.projetos,
		};
	}
}
