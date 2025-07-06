import { prismaClient } from "@/adapters/db/prisma";
import { FiltrosPoliticosDTO } from "@/core/domain/dtos/politico.dto";

export interface IListarPoliticosFiltradosService {
  executar(
    filtros: FiltrosPoliticosDTO & { ordenacaoProjetos?: "asc" | "desc" }
  ): Promise<{ dados: any; total: number }>;
}

export class ListarPoliticosFiltradosService implements IListarPoliticosFiltradosService {
  async executar(filtros: FiltrosPoliticosDTO & { ordenacaoProjetos?: "asc" | "desc" }) {
    const where: any = {};

    if (filtros.esfera)
      where.esfera = {
        is: { nome: { equals: filtros.esfera, mode: "insensitive" } },
      };
    if (filtros.estado)
      where.estado = { sigla: { equals: filtros.estado, mode: "insensitive" } };
    if (filtros.genero)
      where.genero = { equals: filtros.genero, mode: "insensitive" };
    if (filtros.partido)
      where.partido = {
        is: { nome: { equals: filtros.partido, mode: "insensitive" } },
      };

    if (filtros.ideologia)
      where.ideologia = { equals: filtros.ideologia, mode: "insensitive" };
    if (filtros.profissao)
      where.profissao = {
        is: { nome: { equals: filtros.profissao, mode: "insensitive" } },
      };

    const politicos = await prismaClient.politico.findMany({
      where,
      include: {
        partido: true,
        estado: true,
        projetos: true,
      },
    });

    let dados = politicos.map((p) => ({
      foto: p.foto,
      nome: p.nome,
      partido: p.partido,
      estado: p.estado,
      numeroProjetos: p.projetos.length,
      projetos: p.projetos,
    }));

    // Ordenação pelo número de projetos
    const ordem = filtros.ordenacaoProjetos === "asc" ? 1 : -1;
    dados = dados.sort((a, b) => ordem * (a.numeroProjetos - b.numeroProjetos));

    const total = await prismaClient.politico.count({ where });

    return { dados, total };
  }
}