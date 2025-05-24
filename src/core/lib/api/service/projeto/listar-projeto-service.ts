import { ResponseProjetoDTO } from "@/domain/dtos/projeto.dto";
import { prismaClient } from "@/services/prisma/prisma";

export interface IListarProjetoService {
	executar(): Promise<ResponseProjetoDTO[]>;
}

export class ListarProjetoService implements IListarProjetoService {
	constructor(private readonly prisma = prismaClient) {}

	async executar(): Promise<ResponseProjetoDTO[]> {
		const projetos = await this.prisma.projeto.findMany({
			include: {
				esfera: true,
				pauta: true,
				direitosViolados: true,
				ideologias: true,
				partidos: true,
				autores: true,
			},
		});

		return projetos.map((projeto) => ({
			id: projeto.id,
			ano: projeto.ano,
			ementa: projeto.ementa,
			pautaId: projeto.pautaId,
			esferaId: projeto.esferaId,
			numeroPl: projeto.numeroPl,
			justificativa: projeto.justificativa,
			esfera: projeto.esfera,
			pauta: projeto.pauta,
			direitosViolados: projeto.direitosViolados,
			ideologias: projeto.ideologias,
			partidos: projeto.partidos,
			autores: projeto.autores,
		}));
	}
}
