import { SerializacaoDesserializacao } from "./serializacao-desserializacao";

class Esfera {
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

	serializarEsfera(esfera: Esfera): string {
		return SerializacaoDesserializacao.serializar(esfera) as string;
	}

	desserializarEsfera(text: string): Esfera {
		return SerializacaoDesserializacao.desserializar(text) as Esfera;
	}
}

export { Esfera };
