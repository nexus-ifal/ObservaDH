import { prismaClient } from "@/adapters/db/prisma";
import { FiltrosPoliticosDTO } from "@/core/domain/dtos/politico.dto";

export interface IListarPoliticosFiltradosService {
	executar(
		filtros: FiltrosPoliticosDTO & { ordenacaoProjetos?: "asc" | "desc" }
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	): Promise<{ dados: any; total: number }>;
}

export class ListarPoliticosFiltradosService
	implements IListarPoliticosFiltradosService
{
	async executar(
		filtros: FiltrosPoliticosDTO & { ordenacaoProjetos?: "asc" | "desc" }
	) {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const where: any = {};

		if (filtros.esfera) where.esferaId = filtros.esfera;
		if (filtros.estado) where.estadoId = filtros.estado;
		if (filtros.genero)
			where.genero = { equals: filtros.genero, mode: "insensitive" };
		if (filtros.partido) where.partidoId = filtros.partido;
		if (filtros.ideologia)
			where.ideologia = { equals: filtros.ideologia, mode: "insensitive" };
		if (filtros.profissao) where.profissaoId = filtros.profissao;

		const politicos = await prismaClient.politico.findMany({
			where,
			include: {
				partido: true,
				estado: true,
				projetos: true,
			},
		});
		let dados = politicos.map((p) => ({
			foto: p.foto,
			nome: p.nome,
			partido: p.partido,
			estado: p.estado,
			numeroProjetos: p.projetos.length,
			projetos: p.projetos,
		}));

		const ordem = filtros.ordenacaoProjetos === "asc" ? 1 : -1;
		dados = dados.sort((a, b) => ordem * (a.numeroProjetos - b.numeroProjetos));

		const total = await prismaClient.politico.count({ where });

		return { dados, total };
	}
}
