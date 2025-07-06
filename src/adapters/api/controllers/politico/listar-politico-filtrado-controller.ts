import { NextResponse } from "next/server";
import {
	IListarPoliticosFiltradosService,
	ListarPoliticosFiltradosService,
} from "../../service/politico/listar-politico-filtrados-services";
import { FiltrosPoliticosDTO } from "@/core/domain/dtos/politico.dto";
import { RespostaApi } from "@/core/domain/models/resposta-api";

export class ListarPoliticoFiltradoController {
	constructor(
		private readonly service: IListarPoliticosFiltradosService = new ListarPoliticosFiltradosService()
	) {}

	async executar(request: Request) {
		const url = new URL(request.url);
		const raw = Object.fromEntries(url.searchParams.entries());
		const filtros: FiltrosPoliticosDTO & {
			ordenacaoProjetos?: "asc" | "desc";
		} = {
			esfera: raw.esfera,
			estado: raw.estado,
			genero: raw.genero,
			partido: raw.partido,
			ideologia: raw.ideologia,
			profissao: raw.profissao,
			ordenacaoProjetos: raw.ordenacaoProjetos === "asc" ? "asc" : "desc",
		};

		try {
			const { dados, total } = await this.service.executar(filtros);
			return NextResponse.json(
				new RespostaApi({
					sucesso: true,
					mensagem: `${total} político(s) encontrado(s)`,
					dados,
				}),
				{ status: 200 }
			);
		} catch (error) {
			return NextResponse.json(
				new RespostaApi({
					sucesso: false,
					mensagem: "Erro ao listar políticos",
					dados: (error as Error).message,
				}),
				{ status: 500 }
			);
		}
	}
}
