import { ResponseProfissaoDTO } from "@/domain/dtos/profissao.dto";
import { prismaClient } from "@/services/prisma/prisma";

export interface IListarProfissaoService {
	executar(): Promise<ResponseProfissaoDTO[]>;
}

export class ListarProfissaoService implements IListarProfissaoService {
	constructor(private readonly prisma = prismaClient) {}

	async executar(): Promise<ResponseProfissaoDTO[]> {
		const profissoes = await this.prisma.profissao.findMany({
			include: {
				politicos: true,
			},
		});

		return profissoes.map((profissao) => ({
			id: profissao.id,
			nome: profissao.nome,
			politicos: profissao.politicos,
		}));
	}
}
