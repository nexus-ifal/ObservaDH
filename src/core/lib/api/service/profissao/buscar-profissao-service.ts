import {
	ResponseProfissaoDTO,
	SearchProfissaoDTO,
} from "@/domain/dtos/profissao.dto";
import { prismaClient } from "@/services/prisma/prisma";

export interface IBuscarProfissaoService {
	buscarPorId(
		params: Pick<SearchProfissaoDTO, "id">
	): Promise<ResponseProfissaoDTO | null>;
	buscarPorNome(
		params: Pick<SearchProfissaoDTO, "nome">
	): Promise<ResponseProfissaoDTO | null>;
}

export class BuscarProfissaoService implements IBuscarProfissaoService {
	constructor(private readonly prisma = prismaClient) {}

	async buscarPorId({
		id,
	}: Pick<SearchProfissaoDTO, "id">): Promise<ResponseProfissaoDTO | null> {
		if (!id) return null;

		const profissaoData = await this.prisma.profissao.findUnique({
			where: { id },
			include: {
				politicos: true,
			},
		});

		if (!profissaoData) return null;

		return {
			id: profissaoData.id,
			nome: profissaoData.nome,
			politicos: profissaoData.politicos,
		};
	}

	async buscarPorNome({
		nome,
	}: Pick<SearchProfissaoDTO, "nome">): Promise<ResponseProfissaoDTO | null> {
		if (!nome) return null;

		const profissaoData = await this.prisma.profissao.findFirst({
			where: { nome },
			include: {
				politicos: true,
			},
		});

		if (!profissaoData) return null;

		return {
			id: profissaoData.id,
			nome: profissaoData.nome,
			politicos: profissaoData.politicos,
		};
	}
}
