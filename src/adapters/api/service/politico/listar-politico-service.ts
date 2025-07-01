import { prismaClient } from "@/adapters/db/prisma";
import { ResponsePoliticoDTO } from "@/core/domain/dtos/politico.dto";

export interface IListarPoliticoService {
	executar(): Promise<ResponsePoliticoDTO[]>;
}

export class ListarPoliticoService implements IListarPoliticoService {
	constructor(private readonly prisma = prismaClient) {}

	async executar(): Promise<ResponsePoliticoDTO[]> {
		const politicos = await this.prisma.politico.findMany({
			include: {
				esfera: true,
				estado: true,
				partido: true,
				profissao: true,
				projetos: true,
			},
		});

		return politicos.map((politico) => ({
			id: politico.id,
			nome: politico.nome,
			foto: politico.foto,
			genero: politico.genero,
			raca: politico.raca,
			religiao: politico.religiao,
			ideologia: politico.ideologia,
			esferaId: politico.esferaId,
			estadoId: politico.estadoId,
			partidoId: politico.partidoId,
			profissaoId: politico.profissaoId,
			esfera: politico.esfera,
			estado: politico.estado,
			partido: politico.partido,
			profissao: politico.profissao,
			projetos: politico.projetos,
		}));
	}
}
