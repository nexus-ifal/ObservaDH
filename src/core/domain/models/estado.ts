import { SerializacaoDesserializacao } from "./serializacao-desserializacao";

class Estado {
	id?: string;
	nome: string;
	sigla: string;
	politicos?: string[];

	constructor({
		id,
		nome,
		politicos,
		sigla,
	}: {
		id?: string;
		nome: string;
		sigla: string;
		politicos?: string[];
	}) {
		this.id = id;
		this.nome = nome;
		this.sigla = sigla;
		this.politicos = politicos;
	}

	serializarEstado(estado: Estado): string {
		return SerializacaoDesserializacao.serializar(estado) as string;
	}

	desserializarEstado(text: string): Estado {
		return SerializacaoDesserializacao.desserializar(text) as Estado;
	}
}

export { Estado };
