import { SerializacaoDesserializacao } from "./serializacao-desserializacao";

class DireitoViolado {
	id?: string;
	nome: string;
	sigla: string;
	descricao: string;
	projetos?: string[];

	constructor({
		id,
		nome,
		sigla,
		projetos,
		descricao,
	}: {
		id?: string;
		nome: string;
		sigla: string;
		descricao: string;
		projetos?: string[];
	}) {
		this.id = id;
		this.nome = nome;
		this.descricao = descricao;
		this.sigla = sigla;
		this.projetos = projetos;
	}

	serializarDireitoViolado(direito: DireitoViolado): string {
		return SerializacaoDesserializacao.serializar(direito) as string;
	}

	desserializarDireitoViolado(text: string): DireitoViolado {
		return SerializacaoDesserializacao.desserializar(text) as DireitoViolado;
	}
}

export { DireitoViolado };
