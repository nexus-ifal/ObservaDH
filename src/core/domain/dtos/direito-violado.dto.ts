/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from "zod";

export interface CreateDireitoVioladoDTO {
	nome: string;
	sigla: string;
	descricao: string;
}

export const CreateDireitoVioladoSchema = z.object({
	nome: z.string().min(3, "Nome precisa ter ao menos 3 caracteres"),
	sigla: z.string().min(1, "Sigla não pode ser vazia"),
	descricao: z.string().min(10, "Descrição muito curta"),
});

export interface ResponseDireitoVioladoDTO {
	id: string;
	nome: string;
	sigla: string;
	descricao: string;
	projetos?: any[];
}

export interface UpdateDireitoVioladoDTO {
	id: string;
	nome?: string;
	sigla?: string;
	descricao?: string;
}

export const UpdateDireitoVioladoSchema = z.object({
	id: z.string().uuid("ID inválido"),
	nome: z.string().min(3, "Nome precisa ter ao menos 3 caracteres").optional(),
	sigla: z.string().min(1, "Sigla não pode ser vazia").optional(),
	descricao: z.string().min(10, "Descrição muito curta").optional(),
});

export interface DeleteDireitoVioladoDTO {
	id: string;
}

export interface ResponseDeleteDireitoVioladoDTO {
	sucesso: boolean;
}

export interface SearchDireitoVioladoDTO {
	id?: string;
	nome?: string;
}
