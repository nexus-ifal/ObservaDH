/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from "zod";

export interface CreateEsferaDTO {
	nome: string;
}

export const CreateEsferaSchema = z.object({
	nome: z.string().min(3, "Nome precisa ter ao menos 3 caracteres"),
});

export interface ResponseEsferaDTO {
	id: string;
	nome: string;
	politicos?: any[];
	projetos?: any[];
}

export interface UpdateEsferaDTO {
	id: string;
	nome?: string;
}

export const UpdateEsferaSchema = z.object({
	id: z.string().uuid("ID inválido"),
	nome: z.string().min(3, "Nome precisa ter ao menos 3 caracteres").optional(),
});

export interface DeleteEsferaDTO {
	id: string;
}

export interface ResponseDeleteEsferaDTO {
	sucesso: boolean;
}

export interface SearchEsferaDTO {
	id?: string;
}
