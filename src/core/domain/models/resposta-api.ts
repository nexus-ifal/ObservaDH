class RespostaApi {
	sucesso: boolean;
	mensagem: string;
	dados?: unknown;

	constructor({
		sucesso,
		mensagem,
		dados,
	}: {
		sucesso: boolean;
		mensagem: string;
		dados?: unknown;
	}) {
		this.sucesso = sucesso;
		this.mensagem = mensagem;
		this.dados = dados;
	}
}

export { RespostaApi };
