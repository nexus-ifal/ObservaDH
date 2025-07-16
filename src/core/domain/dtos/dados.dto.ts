export interface DadosProjetoEstado {
	nome: string;
	uf: string;
	valor: number;
}
export interface DadosIdeologiaGenero {
	homens: number;
	mulheres: number;
	ideologia: string;
}

export interface DadosReligiaoRaca {
	religiao: string;
	pardo: number;
	preto: number;
	branco: number;
	amarelo: number;
	indigena: number;
	indefinido: number;
}

export interface DadosPlPorAno {
	ano: string;
	projetos: number;
}

export interface DadosPautaPorAno {
	ano: string;
	atletasTrans: number;
	propagandaLGBT: number;
	linguagensNeutra: number;
	banheirosMultigenero: number;
}

export interface DadosParlamentarProjetosEsfera {
	esfera: string;
	parlamentares: number;
	projetosLei: number;
}
export interface DadosPautaEsfera {
	pauta: string;
	valor: number;
}
export interface DadosParaPesquisaParlamenta {
	esfera?: string;
	estado?: string;
	genero?: string;
	partido?: string;
	ideologia?: string;
	profissao?: string;
	ordemProjetos?: "asc" | "desc";
}

export type DadosRadial = {
	direito_nome: string;
	direito_sigla: string;
	projetos: number;
};

export type DadosGraficoBarrasVertical = {
	pls: number;
	pauta: string;
};

export type ProjetoDTO = {
	ano: string;
	numeroPl: string;
	pauta: string;
	estado: string[];
	parlamentar: string[];
	ementa: string;
};
