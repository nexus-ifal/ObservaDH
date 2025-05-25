import {
	ResponsePartidoDTO,
	SearchPartidoDTO,
} from "@/core/domain/dtos/partido.dto";
import { prismaClient } from "@/services/prisma/prisma";

export interface IBuscarPartidoService {
	buscarPorId(
		params: Pick<SearchPartidoDTO, "id">
	): Promise<ResponsePartidoDTO | null>;
	buscarPorNome(
		params: Pick<SearchPartidoDTO, "nome">
	): Promise<ResponsePartidoDTO | null>;
	buscarPorSigla(
		params: Pick<SearchPartidoDTO, "sigla">
	): Promise<ResponsePartidoDTO | null>;
}

export class BuscarPartidoService implements IBuscarPartidoService {
	constructor(private readonly prisma = prismaClient) {}

	async buscarPorId({
		id,
	}: Pick<SearchPartidoDTO, "id">): Promise<ResponsePartidoDTO | null> {
		if (!id) return null;

		const partidoData = await this.prisma.partido.findUnique({
			where: { id },
			include: {
				politicos: true,
				projetos: true,
			},
		});

		if (!partidoData) return null;

		return {
			id: partidoData.id,
			nome: partidoData.nome,
			sigla: partidoData.sigla,
			imagem: partidoData.imagem,
			politicos: partidoData.politicos,
			projetos: partidoData.projetos,
		};
	}

	async buscarPorNome({
		nome,
	}: Pick<SearchPartidoDTO, "nome">): Promise<ResponsePartidoDTO | null> {
		if (!nome) return null;

		const partidoData = await this.prisma.partido.findFirst({
			where: { nome },
			include: {
				politicos: true,
				projetos: true,
			},
		});

		if (!partidoData) return null;

		return {
			id: partidoData.id,
			nome: partidoData.nome,
			sigla: partidoData.sigla,
			imagem: partidoData.imagem,
			politicos: partidoData.politicos,
			projetos: partidoData.projetos,
		};
	}

	async buscarPorSigla({
		sigla,
	}: Pick<SearchPartidoDTO, "sigla">): Promise<ResponsePartidoDTO | null> {
		if (!sigla) return null;

		const partidoData = await this.prisma.partido.findFirst({
			where: {
				sigla: sigla,
			},
			include: {
				politicos: true,
				projetos: true,
			},
		});

		if (!partidoData) return null;

		return {
			id: partidoData.id,
			nome: partidoData.nome,
			sigla: partidoData.sigla,
			imagem: partidoData.imagem,
			politicos: partidoData.politicos,
			projetos: partidoData.projetos,
		};
	}
}
