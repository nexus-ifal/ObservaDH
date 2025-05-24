import { SerializacaoDesserializacao } from "./serializacao-desserializacao";

class Ideologia {
	id?: string;
	nome: string;
	sigla: string;
	descricao: string;
	projetos?: string[];

	constructor({
		id,
		nome,
		projetos,
		descricao,
		sigla,
	}: {
		id?: string;
		nome: string;
		sigla: string;
		descricao: string;
		projetos?: string[];
	}) {
		this.id = id;
		this.nome = nome;
		this.sigla = sigla;
		this.projetos = projetos;
		this.descricao = descricao;
	}

	serializarIdeologia(ideologia: Ideologia): string {
		return SerializacaoDesserializacao.serializar(ideologia) as string;
	}

	desserializarIdeologia(text: string): Ideologia {
		return SerializacaoDesserializacao.desserializar(text) as Ideologia;
	}
}

export { Ideologia };
