import { ResponseDireitoVioladoDTO } from "@/domain/dtos/direito-violado.dto";
import { prismaClient } from "@/services/prisma/prisma";

export interface IListarDireitoVioladoService {
	executar(): Promise<ResponseDireitoVioladoDTO[]>;
}

export class ListarDireitoVioladoService
	implements IListarDireitoVioladoService
{
	constructor(private readonly prisma = prismaClient) {}

	async executar(): Promise<ResponseDireitoVioladoDTO[]> {
		const direitosViolados = await this.prisma.direitoViolado.findMany({
			include: {
				projetos: true,
			},
		});

		return direitosViolados.map((dv) => ({
			id: dv.id,
			nome: dv.nome,
			sigla: dv.sigla,
			descricao: dv.descricao,
			projetos: dv.projetos,
		}));
	}
}
