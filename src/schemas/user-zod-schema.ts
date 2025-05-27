import { z } from "zod";
export const criarUserSchema = z.object({
	email: z.string().email("O email é inválido").min(1, "O email é obrigatório"),
	passwordHash: z
		.string()
		.min(8, "A senha deve conter pelo menos 8 caracteres")
		.max(24, "A senha deve conter no máximo 24 caracteres")
		.regex(/[a-z]/, "A senha deve conter pelo menos uma letra minúscula")
		.regex(/[A-Z]/, "A senha deve conter pelo menos uma letra maiúscula")
		.regex(/\d/, "A senha deve conter pelo menos um número")
		.regex(/[@$!%*?&]/, "A senha deve conter pelo menos um caractere especial"),
	name: z.string().min(10, "O nome do usuário é obrigatório"),
});

export const userLoginSchema = z.object({
	email: z.string().email("O email é inválido."),
	passwordHash: z.string().min(1, "A senha é obrigatória."),
});

export const atualizarUserSchema = z.object({
	email: z.string().email("O email é inválido").min(1, "O email é obrigatório"),
	passwordHash: z
		.string()
		.min(8, "A senha deve conter pelo menos 8 caracteres")
		.max(24, "A senha deve conter no máximo 24 caracteres")
		.regex(/[a-z]/, "A senha deve conter pelo menos uma letra minúscula")
		.regex(/[A-Z]/, "A senha deve conter pelo menos uma letra maiúscula")
		.regex(/\d/, "A senha deve conter pelo menos um número")
		.regex(/[@$!%*?&]/, "A senha deve conter pelo menos um caractere especial"),
	name: z.string().min(10, "O nome do usuário é obrigatório"),
});
