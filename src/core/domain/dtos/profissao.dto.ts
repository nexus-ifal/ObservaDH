/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from "zod";

export interface CreateProfissaoDTO {
	nome: string;
}

export const CreateProfissaoSchema = z.object({
	nome: z.string().min(2, "Nome precisa ter ao menos 2 caracteres"),
});

export interface ResponseProfissaoDTO {
	id: string;
	nome: string;
	politicos?: any[];
}

export interface UpdateProfissaoDTO {
	id: string;
	nome?: string;
}

export const UpdateProfissaoSchema = z.object({
	id: z.string().uuid("ID inválido"),
	nome: z.string().min(2, "Nome precisa ter ao menos 2 caracteres").optional(),
});

export interface DeleteProfissaoDTO {
	id: string;
}

export interface ResponseDeleteProfissaoDTO {
	sucesso: boolean;
}

export interface SearchProfissaoDTO {
	id?: string;
	nome?: string;
}
