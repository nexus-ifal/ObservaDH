import { SerializacaoDesserializacao } from "./serializacao-desserializacao";

class Partido {
	id?: string;
	nome: string;
	sigla: string;
	imagem: string;
	projetos?: string[];
	politicos?: string[];

	constructor({
		id,
		nome,
		sigla,
		imagem,
		projetos,
		politicos,
	}: {
		id?: string;
		nome: string;
		sigla: string;
		imagem: string;
		projetos?: string[];
		politicos?: string[];
	}) {
		this.id = id;
		this.nome = nome;
		this.sigla = sigla;
		this.imagem = imagem;
		this.projetos = projetos;
		this.politicos = politicos;
	}

	serializarPartido(partido: Partido): string {
		return SerializacaoDesserializacao.serializar(partido) as string;
	}

	desserializarPartido(text: string): Partido {
		return SerializacaoDesserializacao.desserializar(text) as Partido;
	}
}

export { Partido };
