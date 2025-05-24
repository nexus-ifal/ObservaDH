/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from "zod";

export interface CreatePartidoDTO {
	nome: string;
	sigla: string;
	imagem?: string;
}

export const CreatePartidoSchema = z.object({
	nome: z.string().min(2, "Nome precisa ter ao menos 2 caracteres"),
	sigla: z.string().min(1, "Sigla não pode ser vazia"),
	imagem: z.string().optional().nullable(),
});

export interface ResponsePartidoDTO {
	id: string;
	nome: string;
	sigla: string;
	imagem?: string | null;
	politicos?: any[];
	projetos?: any[];
}

export interface UpdatePartidoDTO {
	id: string;
	nome?: string;
	sigla?: string;
	imagem?: string | null;
}

export const UpdatePartidoSchema = z.object({
	id: z.string().uuid("ID inválido"),
	nome: z.string().min(2, "Nome precisa ter ao menos 2 caracteres").optional(),
	sigla: z.string().min(1, "Sigla não pode ser vazia").optional(),
	imagem: z.string().optional().nullable(),
});

export interface DeletePartidoDTO {
	id: string;
}

export interface ResponseDeletePartidoDTO {
	sucesso: boolean;
}

export interface SearchPartidoDTO {
	id?: string;
	nome?: string;
	sigla?: string;
}
