/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from "zod";

export interface CreateProjetoDTO {
	ano: string;
	ementa: string;
	pautaId: string;
	esferaId: string;
	numeroPl: string;
	justificativa: string;
}

export const CreateProjetoSchema = z.object({
	ano: z.string().min(4, "Ano inválido"),
	ementa: z.string().min(10, "Ementa muito curta"),
	pautaId: z.string().uuid("Pauta ID inválido"),
	esferaId: z.string().uuid("Esfera ID inválido"),
	numeroPl: z.string().min(1, "Número PL não pode ser vazio"),
	justificativa: z.string().min(10, "Justificativa muito curta"),
});

export interface ResponseProjetoDTO {
	id: string;
	ano: string;
	ementa: string;
	pautaId: string;
	esferaId: string;
	numeroPl: string;
	justificativa: string;
	esfera?: any;
	pauta?: any;
	direitosViolados?: any[];
	ideologias?: any[];
	partidos?: any[];
	autores?: any[];
}

export interface UpdateProjetoDTO {
	id: string;
	ano?: string;
	ementa?: string;
	pautaId?: string;
	esferaId?: string;
	numeroPl?: string;
	justificativa?: string;
}

export const UpdateProjetoSchema = z.object({
	id: z.string().uuid("ID inválido"),
	ano: z.string().min(4, "Ano inválido").optional(),
	ementa: z.string().min(10, "Ementa muito curta").optional(),
	pautaId: z.string().uuid("Pauta ID inválido").optional(),
	esferaId: z.string().uuid("Esfera ID inválido").optional(),
	numeroPl: z.string().min(1, "Número PL não pode ser vazio").optional(),
	justificativa: z.string().min(10, "Justificativa muito curta").optional(),
});

export interface DeleteProjetoDTO {
	id: string;
}

export interface ResponseDeleteProjetoDTO {
	sucesso: boolean;
}

export interface SearchProjetoDTO {
	id?: string;
	numeroPl?: string;
}
