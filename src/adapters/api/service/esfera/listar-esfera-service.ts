import { prismaClient } from "@/adapters/db/prisma";
import { ResponseEsferaDTO } from "@/core/domain/dtos/esfera.dto";

export interface IListarEsferaService {
	executar(): Promise<ResponseEsferaDTO[]>;
}

export class ListarEsferaService implements IListarEsferaService {
	constructor(private readonly prisma = prismaClient) {}

	async executar(): Promise<ResponseEsferaDTO[]> {
		const esferas = await this.prisma.esfera.findMany({
			include: {
				politicos: true,
				projetos: true,
			},
		});

		return esferas.map((esfera) => ({
			id: esfera.id,
			nome: esfera.nome,
			politicos: esfera.politicos,
			projetos: esfera.projetos,
		}));
	}
}
