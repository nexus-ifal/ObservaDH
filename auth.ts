import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { prismaClient } from "@/services/prisma/prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
	adapter: PrismaAdapter(prismaClient),
	providers: [
		CredentialsProvider({
			name: "Credenciais",
			credentials: {
				email: {
					label: "Email",
					type: "text",
					placeholder: "exemplo@gmail.com",
				},
				password: { label: "Senha", type: "password", placeholder: "********" },
			},
			async authorize(credentials) {
				if (!credentials?.email || !credentials?.password) {
					throw new Error("Email e senha são obrigatórios.");
				}

				const user = await prismaClient.user.findUnique({
					where: { email: credentials.email as string },
				});

				if (!user) {
					throw new Error("Dados inválidos");
				}

				const senhaValida = await bcrypt.compare(
					credentials.password as string,
					user.passwordHash as string
				);
				if (!senhaValida) {
					throw new Error("Dados inválidos");
				}

				return { email: user.email, id: user.id, name: user.name };
			},
		}),
	],
	session: {
		strategy: "jwt",
	},
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.id = user.id;
				token.email = user.email;
			}
			return token;
		},
		async session({ session, token }) {
			if (token) {
				session.user.id = token.id as string;
				session.user.email = token.email as string;
			}
			return session;
		},
	},
	cookies: {
		sessionToken: {
			name: `next-auth.session-token`,
			options: {
				httpOnly: true,
				sameSite: "lax",
				path: "/",
				secure: process.env.NODE_ENV === "production",
			},
		},
	},
});
