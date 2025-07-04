class RespostaApi {
	sucesso: boolean;
	mensagem: string;
	dados?: unknown;
	emailVerificationSent?: boolean;

	constructor({
		sucesso,
		mensagem,
		dados,
		emailVerificationSent,
	}: {
		sucesso: boolean;
		mensagem: string;
		dados?: unknown;
		emailVerificationSent?: boolean;
	}) {
		this.sucesso = sucesso;
		this.mensagem = mensagem;
		this.dados = dados;
		this.emailVerificationSent = emailVerificationSent;
	}
}

export { RespostaApi };
