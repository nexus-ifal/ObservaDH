import { prismaClient } from "@/adapters/db/prisma";
import { ResponseEstadoDTO } from "@/core/domain/dtos/estado.dto";

export interface IListarEstadoService {
	executar(): Promise<ResponseEstadoDTO[]>;
}

export class ListarEstadoService implements IListarEstadoService {
	constructor(private readonly prisma = prismaClient) {}

	async executar(): Promise<ResponseEstadoDTO[]> {
		const estados = await this.prisma.estado.findMany({
			include: {
				politicos: true,
			},
		});
		return estados.map((estado) => ({
			id: estado.id,
			nome: estado.nome,
			sigla: estado.sigla,
			politico: estado.politicos,
		}));
	}
}
