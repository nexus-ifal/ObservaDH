import { prismaClient } from "@/adapters/db/prisma";
import { ResponsePautaDTO } from "@/core/domain/dtos/pauta.dto";

export interface IListarPautaService {
	executar(): Promise<ResponsePautaDTO[]>;
}

export class ListarPautaService implements IListarPautaService {
	constructor(private readonly prisma = prismaClient) {}

	async executar(): Promise<ResponsePautaDTO[]> {
		const pautas = await this.prisma.pauta.findMany({
			include: {
				projetos: true,
			},
		});

		return pautas.map((pauta) => ({
			id: pauta.id,
			nome: pauta.nome,
			projetos: pauta.projetos,
		}));
	}
}
