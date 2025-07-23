import { PrismaClient } from "@prisma/client";

export interface PartidoRankingDTO {
	id: string;
	nome: string;
	sigla: string;
	imagem: string | null;
	numeroParlamentares: number;
	numeroPropostas: number;
}

export interface IRankingPartidosService {
	executar(): Promise<PartidoRankingDTO[]>;
}

export class RankingPartidosService implements IRankingPartidosService {
	async executar(): Promise<PartidoRankingDTO[]> {
		const prisma = new PrismaClient();
		try {
			const partidos = await prisma.partido.findMany({
				select: {
					id: true,
					nome: true,
					sigla: true,
					imagem: true,
					_count: {
						select: {
							politicos: true,
							projetos: true,
						},
					},
				},
				orderBy: [
					{
						projetos: {
							_count: 'desc',
						},
					},
					{
						politicos: {
							_count: 'desc',
						},
					},
				],
			});

			const resultado: PartidoRankingDTO[] = partidos.map((partido) => ({
				id: partido.id,
				nome: partido.nome,
				sigla: partido.sigla,
				imagem: partido.imagem,
				numeroParlamentares: partido._count.politicos,
				numeroPropostas: partido._count.projetos,
			}));

			return resultado;
		} finally {
			await prisma.$disconnect();
		}
	}
}