class Politico {
	id?: string;
	nome: string;
	raca: string;
	foto?: string;
	genero: string;
	estado?: string;
	religiao: string;
	partido?: string;
	esferaId: string;
	estadoId: string;
	ideologia: string;
	partidoId: string;
	profissaoId: string;
	projetos?: string[];

	constructor({
		id,
		nome,
		raca,
		foto,
		genero,
		estado,
		partido,
		religiao,
		projetos,
		esferaId,
		estadoId,
		partidoId,
		ideologia,
		profissaoId,
	}: {
		id?: string;
		nome: string;
		genero: string;
		raca: string;
		foto: string;
		estado?: string;
		partido?: string;
		religiao: string;
		estadoId: string;
		esferaId: string;
		partidoId: string;
		ideologia: string;
		projetos?: string[];
		profissaoId: string;
	}) {
		this.id = id;
		this.nome = nome;
		this.raca = raca;
		this.foto = foto;
		this.estado = estado;
		this.genero = genero;
		this.partido = partido;
		this.esferaId = esferaId;
		this.religiao = religiao;
		this.projetos = projetos;
		this.estadoId = estadoId;
		this.ideologia = ideologia;
		this.partidoId = partidoId;
		this.profissaoId = profissaoId;
	}
}
export default Politico;
