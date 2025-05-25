/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from "zod";

export interface CreatePoliticoDTO {
	nome: string;
	foto?: string | null;
	genero: string;
	raca: string;
	religiao: string;
	ideologia: string;
	esferaId: string;
	estadoId: string;
	partidoId: string;
	profissaoId: string;
}

export const CreatePoliticoSchema = z.object({
	nome: z.string().min(3, "Nome precisa ter ao menos 3 caracteres"),
	foto: z.string().optional().nullable(),
	genero: z.string().min(1, "Gênero não pode ser vazio"),
	raca: z.string().min(1, "Raça não pode ser vazia"),
	religiao: z.string().min(1, "Religião não pode ser vazia"),
	ideologia: z.string().min(1, "Ideologia (string) não pode ser vazia"),
	esferaId: z.string().uuid("Esfera ID inválido"),
	estadoId: z.string().uuid("Estado ID inválido"),
	partidoId: z.string().uuid("Partido ID inválido"),
	profissaoId: z.string().uuid("Profissão ID inválido"),
});

export interface ResponsePoliticoDTO {
	id: string;
	nome: string;
	foto: string | null;
	genero: string;
	raca: string;
	religiao: string;
	ideologia: string;
	esferaId: string;
	estadoId: string;
	partidoId: string;
	profissaoId: string;
	esfera?: any;
	estado?: any;
	partido?: any;
	profissao?: any;
	projetos?: any[];
}

export interface UpdatePoliticoDTO {
	id: string;
	nome?: string;
	foto?: string | null;
	genero?: string;
	raca?: string;
	religiao?: string;
	ideologia?: string;
	esferaId?: string;
	estadoId?: string;
	partidoId?: string;
	profissaoId?: string;
}

export const UpdatePoliticoSchema = z.object({
	id: z.string().uuid("ID inválido"),
	nome: z.string().min(3, "Nome precisa ter ao menos 3 caracteres").optional(),
	foto: z.string().optional().nullable(),
	genero: z.string().min(1, "Gênero não pode ser vazio").optional(),
	raca: z.string().min(1, "Raça não pode ser vazia").optional(),
	religiao: z.string().min(1, "Religião não pode ser vazia").optional(),
	ideologia: z
		.string()
		.min(1, "Ideologia (string) não pode ser vazia")
		.optional(),
	esferaId: z.string().uuid("Esfera ID inválido").optional(),
	estadoId: z.string().uuid("Estado ID inválido").optional(),
	partidoId: z.string().uuid("Partido ID inválido").optional(),
	profissaoId: z.string().uuid("Profissão ID inválido").optional(),
});

export interface DeletePoliticoDTO {
	id: string;
}

export interface ResponseDeletePoliticoDTO {
	sucesso: boolean;
}

export interface SearchPoliticoDTO {
	id?: string;
}
