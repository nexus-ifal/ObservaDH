import { ResponseEstadoDTO, SearchEstadoDTO } from "@/domain/dtos/estado.dto";
import { prismaClient } from "@/services/prisma/prisma";

export interface IBuscarEstadoService {
	buscarPorId(
		params: Pick<SearchEstadoDTO, "id">
	): Promise<ResponseEstadoDTO | null>;
	buscarPorNome(
		params: Pick<SearchEstadoDTO, "nome">
	): Promise<ResponseEstadoDTO | null>;
	buscarPorSigla(
		params: Pick<SearchEstadoDTO, "sigla">
	): Promise<ResponseEstadoDTO | null>;
}

export class BuscarEstadoService implements IBuscarEstadoService {
	constructor(private readonly prisma = prismaClient) {}

	async buscarPorId({
		id,
	}: Pick<SearchEstadoDTO, "id">): Promise<ResponseEstadoDTO | null> {
		if (!id) return null;

		const estadoData = await this.prisma.estado.findUnique({
			where: { id },
			include: {
				politicos: true,
			},
		});
		return estadoData;
	}

	async buscarPorNome({
		nome,
	}: Pick<SearchEstadoDTO, "nome">): Promise<ResponseEstadoDTO | null> {
		if (!nome) return null;

		const estadoData = await this.prisma.estado.findFirst({
			where: { nome },
			include: {
				politicos: true,
			},
		});
		return estadoData;
	}

	async buscarPorSigla({
		sigla,
	}: Pick<SearchEstadoDTO, "sigla">): Promise<ResponseEstadoDTO | null> {
		if (!sigla) return null;
		const estadoData = await this.prisma.estado.findFirst({
			where: {
				sigla: sigla,
			},
			include: {
				politicos: true,
			},
		});
		return estadoData;
	}
}
