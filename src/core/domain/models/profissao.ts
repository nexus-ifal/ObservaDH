import { SerializacaoDesserializacao } from "./serializacao-desserializacao";

class Profissao {
	id?: string;
	nome: string;
	politicos?: string[];

	constructor({
		id,
		nome,
		politicos,
	}: {
		id?: string;
		nome: string;
		politicos?: string[];
	}) {
		this.id = id;
		this.nome = nome;
		this.politicos = politicos;
	}

	serializarProfissao(profissao: Profissao): string {
		return SerializacaoDesserializacao.serializar(profissao) as string;
	}

	desserializarProfissao(text: string): Profissao {
		return SerializacaoDesserializacao.desserializar(text) as Profissao;
	}
}

export { Profissao };
