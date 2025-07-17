import { prismaClient } from "@/adapters/db/prisma";
import { DadosRadial, ProjetoDTO } from "@/core/domain/dtos/dados.dto";
import { DadosGraficoBarrasVertical } from "@/core/domain/types/barras-vertical";

export interface ResponseProjetoDireitosDTO {
	direitos_violados_valores: DadosRadial[];
	ideologias_valores: DadosGraficoBarrasVertical[];
	projetos: ProjetoDTO[];
}

export interface IListarProjetoDireitosService {
	executar(pautaId?: string): Promise<ResponseProjetoDireitosDTO>;
}

export class ListarProjetoDireitosService
	implements IListarProjetoDireitosService
{
	constructor(private readonly prisma = prismaClient) {}

	async executar(pautaId?: string): Promise<ResponseProjetoDireitosDTO> {
		const projetos = await this.prisma.projeto.findMany({
			where: pautaId ? { pautaId } : {},
			include: {
				direitosViolados: true,
				ideologias: true,
				pauta: true,
				autores: {
					include: {
						estado: true,
					},
				},
			},
		});

		const direitoMap = new Map<
			string,
			{ info: { nome: string; sigla: string }; count: number }
		>();
		const ideologiaMap = new Map<string, number>();

		projetos.forEach((projeto) => {
			projeto.direitosViolados.forEach((direito) => {
				const item = direitoMap.get(direito.id);
				if (item) {
					item.count++;
				} else {
					direitoMap.set(direito.id, {
						info: { nome: direito.nome, sigla: direito.sigla },
						count: 1,
					});
				}
			});

			projeto.ideologias.forEach((ideologia) => {
				ideologiaMap.set(
					ideologia.sigla,
					(ideologiaMap.get(ideologia.sigla) || 0) + 1
				);
			});
		});

		return {
			direitos_violados_valores: Array.from(direitoMap.values()).map(
				(item) => ({
					direito_nome: item.info.nome,
					direito_sigla: item.info.sigla,
					projetos: item.count,
				})
			),
			ideologias_valores: Array.from(ideologiaMap.entries()).map(
				([pauta, pls]) => ({
					pauta,
					pls,
				})
			),
			projetos: projetos.map((projeto) => ({
				id: projeto.id,
				ano: projeto.ano,
				numeroPl: projeto.numeroPl,
				pauta: projeto.pauta.nome,
				estado: projeto.autores
					.map((autor) => autor.estado?.nome)
					.filter(Boolean),
				parlamentar: projeto.autores.map((autor) => autor.nome),
				ementa: projeto.ementa,
			})),
		};
	}
}
