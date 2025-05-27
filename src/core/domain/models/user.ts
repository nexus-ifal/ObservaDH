import { SerializacaoDesserializacao } from "./serializacao-desserializacao";

class User {
	id?: string;
	email: string;
	passwordHash: string;
	role: string;
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
		email: string;
		passwordHash: string;
		role: string;
		createdAt?: Date;
		updatedAt?: Date;
		name?: string | "";
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
