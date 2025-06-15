import { Role } from "@prisma/client";

import { SerializacaoDesserializacao } from "./serializacao-desserializacao";
class User {
	id?: string;
	email?: string;
	passwordHash?: string;
	role?: Role;
	name?: string;
	emailVerified?: Date;
	createdAt?: Date;
	updatedAt?: Date;

	constructor({
		id,
		email,
		passwordHash,
		role,
		name,
		emailVerified,
		createdAt,
		updatedAt,
	}: {
		email?: string;
		passwordHash?: string;
		role?: Role;
		name?: string;
		createdAt?: Date;
		updatedAt?: Date;
		emailVerified?: Date;
		id?: string;
	}) {
		this.id = id;
		this.email = email;
		this.passwordHash = passwordHash;
		this.role = role;
		this.name = name;
		this.emailVerified = emailVerified;
		this.createdAt = createdAt;
		this.updatedAt = updatedAt;
	}

	serializarUser(user: User): string {
		return SerializacaoDesserializacao.serializar(user) as string;
	}

	desserializarUser(text: string): User {
		return SerializacaoDesserializacao.desserializar(text) as User;
	}
}

export { User };
