import { Pauta } from "@prisma/client";

import { SerializacaoDesserializacao } from "./serializacao-desserializacao";

class Projeto {
	id?: string;
	ano: string;
	numeroPl: string;
	pautaId: string;
	pauta?: string;
	Pauta?: Pauta;
	justificativa: string;
	ementa: string;
	esferaId: string;
	autores?: string[];
	partidos?: string[];
	direitosViolados?: string[];
	ideologias?: string[];

	constructor({
		id,
		ano,
		pauta,
		ementa,
		pautaId,
		numeroPl,
		esferaId,
		autores,
		partidos,
		ideologias,
		justificativa,
		direitosViolados,
	}: {
		id?: string;
		ano: string;
		pauta?: string;
		ementa: string;
		pautaId: string;
		numeroPl: string;
		esferaId: string;
		autores?: string[];
		partidos?: string[];
		ideologias?: string[];
		justificativa: string;
		direitosViolados?: string[];
	}) {
		this.id = id;
		this.ano = ano;
		this.pauta = pauta;
		this.ementa = ementa;
		this.autores = autores;
		this.pautaId = pautaId;
		this.partidos = partidos;
		this.esferaId = esferaId;
		this.numeroPl = numeroPl;
		this.ideologias = ideologias;
		this.justificativa = justificativa;
		this.direitosViolados = direitosViolados;
	}

	serializarProjeto(projeto: Projeto): string {
		return SerializacaoDesserializacao.serializar(projeto) as string;
	}

	desserializarProjeto(text: string): Projeto {
		return SerializacaoDesserializacao.desserializar(text) as Projeto;
	}
}

export { Projeto };
