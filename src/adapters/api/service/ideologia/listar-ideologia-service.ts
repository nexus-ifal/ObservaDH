import { prismaClient } from "@/adapters/db/prisma";
import { ResponseIdeologiaDTO } from "@/core/domain/dtos/ideologia.dto";

export interface IListarIdeologiaService {
	executar(): Promise<ResponseIdeologiaDTO[]>;
}

export class ListarIdeologiaService implements IListarIdeologiaService {
	constructor(private readonly prisma = prismaClient) {}

	async executar(): Promise<ResponseIdeologiaDTO[]> {
		const ideologias = await this.prisma.ideologia.findMany({
			include: {
				projetos: true,
			},
		});

		return ideologias.map((ideologia) => ({
			id: ideologia.id,
			nome: ideologia.nome,
			descricao: ideologia.descricao,
			sigla: ideologia.sigla,
			projetos: ideologia.projetos,
		}));
	}
}
