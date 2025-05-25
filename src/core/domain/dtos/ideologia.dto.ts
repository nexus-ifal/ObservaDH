/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from "zod";

export interface CreateIdeologiaDTO {
	nome: string;
	descricao: string;
	sigla: string;
}

export const CreateIdeologiaSchema = z.object({
	nome: z.string().min(3, "Nome precisa ter ao menos 3 caracteres"),
	descricao: z.string().min(10, "Descrição muito curta"),
	sigla: z.string().min(1, "Sigla não pode ser vazia"),
});

export interface ResponseIdeologiaDTO {
	id: string;
	nome: string;
	descricao: string;
	sigla: string;
	projetos?: any[];
}

export interface UpdateIdeologiaDTO {
	id: string;
	nome?: string;
	descricao?: string;
	sigla?: string;
}

export const UpdateIdeologiaSchema = z.object({
	id: z.string().uuid("ID inválido"),
	nome: z.string().min(3, "Nome precisa ter ao menos 3 caracteres").optional(),
	descricao: z.string().min(10, "Descrição muito curta").optional(),
	sigla: z.string().min(1, "Sigla não pode ser vazia").optional(),
});

export interface DeleteIdeologiaDTO {
	id: string;
}

export interface ResponseDeleteIdeologiaDTO {
	sucesso: boolean;
}

export interface SearchIdeologiaDTO {
	id?: string;
}
