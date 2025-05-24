class SerializacaoDesserializacao {
	static serializar(data: unknown): string {
		return JSON.stringify(data);
	}

	static desserializar(text: string): unknown {
		return JSON.parse(text);
	}
}

export { SerializacaoDesserializacao };
