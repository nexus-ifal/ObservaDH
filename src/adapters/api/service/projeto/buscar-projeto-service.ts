import { prismaClient } from "@/adapters/db/prisma";
import {
	ResponseProjetoDTO,
	SearchProjetoDTO,
} from "@/core/domain/dtos/projeto.dto";

export interface IBuscarProjetoService {
	buscarPorId(
		params: Pick<SearchProjetoDTO, "id">
	): Promise<ResponseProjetoDTO | null>;
	buscarPorNumeroPl(
		params: Pick<SearchProjetoDTO, "numeroPl">
	): Promise<ResponseProjetoDTO | null>;
}

export class BuscarProjetoService implements IBuscarProjetoService {
	constructor(private readonly prisma = prismaClient) {}

	async buscarPorId({
		id,
	}: Pick<SearchProjetoDTO, "id">): Promise<ResponseProjetoDTO | null> {
		if (!id) return null;

		const projetoData = await this.prisma.projeto.findUnique({
			where: { id },
			include: {
				esfera: true,
				pauta: true,
				direitosViolados: true,
				ideologias: true,
				partidos: true,
				autores: true,
			},
		});

		if (!projetoData) return null;

		return {
			id: projetoData.id,
			ano: projetoData.ano,
			ementa: projetoData.ementa,
			pautaId: projetoData.pautaId,
			esferaId: projetoData.esferaId,
			numeroPl: projetoData.numeroPl,
			justificativa: projetoData.justificativa,
			esfera: projetoData.esfera,
			pauta: projetoData.pauta,
			direitosViolados: projetoData.direitosViolados,
			ideologias: projetoData.ideologias,
			partidos: projetoData.partidos,
			autores: projetoData.autores,
		};
	}

	async buscarPorNumeroPl({
		numeroPl,
	}: Pick<SearchProjetoDTO, "numeroPl">): Promise<ResponseProjetoDTO | null> {
		if (!numeroPl) return null;

		const projetoData = await this.prisma.projeto.findFirst({
			where: { numeroPl },
			include: {
				esfera: true,
				pauta: true,
				direitosViolados: true,
				ideologias: true,
				partidos: true,
				autores: true,
			},
		});

		if (!projetoData) return null;

		return {
			id: projetoData.id,
			ano: projetoData.ano,
			ementa: projetoData.ementa,
			pautaId: projetoData.pautaId,
			esferaId: projetoData.esferaId,
			numeroPl: projetoData.numeroPl,
			justificativa: projetoData.justificativa,
			esfera: projetoData.esfera,
			pauta: projetoData.pauta,
			direitosViolados: projetoData.direitosViolados,
			ideologias: projetoData.ideologias,
			partidos: projetoData.partidos,
			autores: projetoData.autores,
		};
	}
}
