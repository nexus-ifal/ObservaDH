import { Role } from "@prisma/client";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
	interface Session {
		user: {
			id: string;
			name: string;
			email: string;
			role: Role;
		};
	}
	interface User {
		id: string;
		role: Role;
	}
	interface Session extends DefaultSession {
		user: User;
	}
}

declare module "next-auth/jwt" {
	interface JWT {
		id: string;
		name: string;
		email: string;
		role: Role;
	}
}

declare module "next-auth/adapters" {
	interface AdapterUser {
		role: Role;
	}
}
