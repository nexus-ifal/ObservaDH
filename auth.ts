import { PrismaAdapter } from "@auth/prisma-adapter";
import { Role } from "@prisma/client";
import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { z } from "zod";

import { userLoginSchema } from "./src/schemas/user-zod-schema";
import { prismaClient } from "@/adapters/db/prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
	adapter: PrismaAdapter(prismaClient),
	providers: [
		CredentialsProvider({
			name: "Credenciais",
			credentials: {
				email: {
					label: "Email",
					type: "text",
					placeholder: "seuEmail@gmail.com",
				},
				password: {
					label: "Password",
					type: "password",
					placeholder: "Sua senha",
				},
			},
			async authorize(credentials) {
				if (!credentials?.email || !credentials?.password) {
					throw new Error("Email e senha são obrigatórios.");
				}

				try {
					const credenciaisValidadas = userLoginSchema.parse(credentials);
					const { email, password } = credenciaisValidadas;

					const user = await prismaClient.user.findUnique({
						where: { email },
					});

					if (!user) {
						console.log("O usuário não foi encontrado");
						return null;
					}

					const senhaValida = await bcrypt.compare(password, user.passwordHash);

					if (!senhaValida) {
						console.log("A senha é inválida");
						return null;
					}

					if (!user.emailVerified) {
						console.log("Email não verificado");
						throw new Error(
							"Seu e-mail ainda não foi verificado. Por favor, verifique sua caixa de entrada."
						);
					}

					let redirectTo: string;
					if (user.role === "ADMIN") {
						redirectTo = "/admin-routes/home";
					} else if (user.role === "EDITOR") {
						redirectTo = "/user-routes/home";
					} else {
						redirectTo = "/";
					}

					return {
						id: user.id,
						name: user.name,
						email: user.email,
						role: user.role,
						redirectTo: redirectTo,
					};
				} catch (error) {
					if (error instanceof z.ZodError) {
						console.error(
							"Erro de validação de credenciais:",
							error.flatten().fieldErrors
						);

						throw new Error(
							"Credenciais inválidas: " +
								JSON.stringify(error.flatten().fieldErrors)
						);
					}
					if (
						error instanceof Error &&
						error.message.includes("Seu e-mail ainda não foi verificado")
					) {
						throw error;
					}
					console.error("Erro na autorização do NextAuth:", error);
					throw new Error("Erro interno ao tentar fazer login.");
				}
			},
		}),
	],
	pages: {
		signIn: "/login",
		error: "/404",
	},
	session: {
		strategy: "jwt",
	},
	callbacks: {
		authorized: async ({ auth }) => {
			return !!auth;
		},
		async jwt({ token, user }) {
			if (user) {
				token.name = user.name;
				token.email = user.email;
				token.id = user.id;
				token.role = user.role;
				if ("redirectTo" in user) {
					token.redirectTo = user.redirectTo;
				}
			}
			return token;
		},
		async session({ session, token }) {
			if (session.user) {
				session.user.id = token.id as string;
				session.user.name = token.name as string;
				session.user.email = token.email as string;
				session.user.role = token.role as Role;
				if ("redirectTo" in token) {
					session.user.redirectTo = token.redirectTo as string;
				}
			}
			return session;
		},
	},
});
