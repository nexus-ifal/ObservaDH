/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from "zod";
export interface CreateEstadoDTO {
	nome: string;
	sigla: string;
}

export const CreateEstadoSchema = z.object({
	nome: z.string().min(3, "Nome precisa ter ao menos 3 caracteres"),
	sigla: z.string().length(2, "Sigla deve ter exatamente 2 caracteres"),
});

export interface ResponseEstadoDTO {
	id: string;
	nome: string;
	sigla: string;
	politico?: any[];
}

export interface UpdateEstadoDTO {
	id: string;
	nome?: string;
	sigla?: string;
}
export const UpdateEstadoSchema = z.object({
	id: z.string().uuid("ID inválido"),
	nome: z.string().min(3, "Nome precisa ter ao menos 3 caracteres"),
	sigla: z.string().length(2, "Sigla deve ter exatamente 2 caracteres"),
});

export interface DeleteEstadoDTO {
	id: string;
}

export interface ResponseDeleteEstadoDTO {
	sucesso: boolean;
}

export interface SearchEstadoDTO {
	id?: string;
	nome?: string;
	sigla?: string;
}
