/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from "zod";

export interface CreatePautaDTO {
	nome: string;
}

export const CreatePautaSchema = z.object({
	nome: z.string().min(3, "Nome precisa ter ao menos 3 caracteres"),
});

export interface ResponsePautaDTO {
	id: string;
	nome: string;
	projetos?: any[];
}

export interface UpdatePautaDTO {
	id: string;
	nome?: string;
}

export const UpdatePautaSchema = z.object({
	id: z.string().uuid("ID inválido"),
	nome: z.string().min(3, "Nome precisa ter ao menos 3 caracteres").optional(),
});

export interface DeletePautaDTO {
	id: string;
}

export interface ResponseDeletePautaDTO {
	sucesso: boolean;
}

export interface SearchPautaDTO {
	id?: string;
	nome?: string;
}
