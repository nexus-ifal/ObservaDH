import { ResponsePautaDTO } from "@/domain/dtos/pauta.dto";
import { prismaClient } from "@/services/prisma/prisma";

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
