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
	quantidade: number;
}

export interface DadosPautaPorAno {
	ano: string;
	atletasTrans: number;
	propagandaLGBT: number;
	linguagensNeutra: number;
	banheirosMultigenero: number;
}
