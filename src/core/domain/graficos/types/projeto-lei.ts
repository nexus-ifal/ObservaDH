import { parlamentar } from "./parlamentar";

export type ProjetoLei = {
	id: string;
	ano: string;
	pauta: string;
	ementa: string;
	numeroPl: string;
	violacoes: string[];
	ideologia: string[];
	justificativa: string;
	parlamentares: parlamentar[];
};
