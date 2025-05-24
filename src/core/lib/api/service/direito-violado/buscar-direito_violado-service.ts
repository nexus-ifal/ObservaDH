import {
	ResponseDireitoVioladoDTO,
	SearchDireitoVioladoDTO,
} from "@/domain/dtos/direito-violado.dto";
import { prismaClient } from "@/services/prisma/prisma";

export interface IBuscarDireitoVioladoService {
	buscarPorId(
		params: Pick<SearchDireitoVioladoDTO, "id">
	): Promise<ResponseDireitoVioladoDTO | null>;
	buscarPorNome(
		params: Pick<SearchDireitoVioladoDTO, "nome">
	): Promise<ResponseDireitoVioladoDTO | null>;
}

export class BuscarDireitoVioladoService
	implements IBuscarDireitoVioladoService
{
	constructor(private readonly prisma = prismaClient) {}

	async buscarPorId({
		id,
	}: Pick<
		SearchDireitoVioladoDTO,
		"id"
	>): Promise<ResponseDireitoVioladoDTO | null> {
		if (!id) return null;

		const direitoVioladoData = await this.prisma.direitoViolado.findUnique({
			where: { id },
			include: {
				projetos: true,
			},
		});

		if (!direitoVioladoData) return null;

		return {
			id: direitoVioladoData.id,
			nome: direitoVioladoData.nome,
			sigla: direitoVioladoData.sigla,
			descricao: direitoVioladoData.descricao,
			projetos: direitoVioladoData.projetos,
		};
	}

	async buscarPorNome({
		nome,
	}: Pick<
		SearchDireitoVioladoDTO,
		"nome"
	>): Promise<ResponseDireitoVioladoDTO | null> {
		if (!nome) return null;

		const direitoVioladoData = await this.prisma.direitoViolado.findFirst({
			where: { nome },
			include: {
				projetos: true,
			},
		});

		if (!direitoVioladoData) return null;

		return {
			id: direitoVioladoData.id,
			nome: direitoVioladoData.nome,
			sigla: direitoVioladoData.sigla,
			descricao: direitoVioladoData.descricao,
			projetos: direitoVioladoData.projetos,
		};
	}
}
