export interface TituloGrafico {
	principal: string;
	destaque: string;
}

export interface LegendaGrafico {
	titulo?: TituloGrafico;
	conteudo: string;
	aprofundamento: string;
	cor: string;
}
