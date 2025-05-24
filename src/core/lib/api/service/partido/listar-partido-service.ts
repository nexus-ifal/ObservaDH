import { ResponsePartidoDTO } from "@/domain/dtos/partido.dto";
import { prismaClient } from "@/services/prisma/prisma";

export interface IListarPartidoService {
	executar(): Promise<ResponsePartidoDTO[]>;
}

export class ListarPartidoService implements IListarPartidoService {
	constructor(private readonly prisma = prismaClient) {}

	async executar(): Promise<ResponsePartidoDTO[]> {
		const partidos = await this.prisma.partido.findMany({
			include: {
				politicos: true,
				projetos: true,
			},
		});

		return partidos.map((partido) => ({
			id: partido.id,
			nome: partido.nome,
			sigla: partido.sigla,
			imagem: partido.imagem,
			politicos: partido.politicos,
			projetos: partido.projetos,
		}));
	}
}
