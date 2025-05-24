export type Status = {
	valor: number;
	titulo: string;
};

export type DadosNacionais = {
	dados: Status[];
};

export type Pautas = {
	pautas: Status[];
};

export type StatusType = {
	pautas: Pautas;
	dados: DadosNacionais;
};
