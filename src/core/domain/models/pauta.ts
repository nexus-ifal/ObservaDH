import { SerializacaoDesserializacao } from "./serializacao-desserializacao";

class Pauta {
	id?: string;
	nome: string;
	projetos?: string[];

	constructor({
		id,
		nome,
		projetos,
	}: {
		id?: string;
		nome: string;
		projetos?: string[];
	}) {
		this.id = id;
		this.nome = nome;
		this.projetos = projetos;
	}

	serializarPauta(pauta: Pauta): string {
		return SerializacaoDesserializacao.serializar(pauta) as string;
	}

	desserializarPauta(text: string): Pauta {
		return SerializacaoDesserializacao.desserializar(text) as Pauta;
	}
}

export { Pauta };
