import { NextResponse } from "next/server";

import {
	IListarProjetosService,
	ListarProjetosService,
} from "../../service/projeto/listar-projetos-filtrados-service";

import { FiltrosProjetosDTO } from "@/core/domain/dtos/projeto.dto";
import { RespostaApi } from "@/core/domain/models/resposta-api";

export class ListarProjetosFiltradosController {
	constructor(
		private readonly service: IListarProjetosService = new ListarProjetosService()
	) {}

	async executar(request: Request) {
		const url = new URL(request.url);
		const raw = Object.fromEntries(url.searchParams.entries());
		const filtros: FiltrosProjetosDTO = {
			ano: raw.ano as string | undefined,
			esfera: raw.esfera as string | undefined,
			estado: raw.estado as string | undefined,
			pauta: raw.pauta as string | undefined,
		};

		try {
			const { dados, total } = await this.service.executar(filtros);
			return NextResponse.json(
				new RespostaApi({
					sucesso: true,
					mensagem: `${total} projeto(s) encontrados`,
					dados,
				}),
				{ status: 200 }
			);
		} catch (err) {
			return NextResponse.json(
				new RespostaApi({
					sucesso: false,
					mensagem: "Erro ao listar projetos",
					dados: (err as Error).message,
				}),
				{ status: 500 }
			);
		}
	}
}
