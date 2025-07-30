import nodemailer from "nodemailer";

interface SendEmailOptions {
	to: string;
	subject: string;
	html: string;
}

export class EnviarEmailService {
	private transporter;

	constructor() {
		this.transporter = nodemailer.createTransport({
			host: process.env.EMAIL_SERVER_HOST,
			port: Number(process.env.EMAIL_SERVER_PORT),
			secure: process.env.EMAIL_SERVER_SECURE === "true",
			auth: {
				user: process.env.EMAIL_SERVER_USER,
				pass: process.env.EMAIL_SERVER_PASSWORD,
			},
		});
	}

	async enviarEmailDeVerificacao({ to, subject, html }: SendEmailOptions) {
		try {
			await this.transporter.sendMail({
				from: process.env.EMAIL_FROM,
				to,
				subject,
				html,
			});
			return true;
		} catch (error) {
			console.error("Erro ao enviar email de verificação:", error);
			return false;
		}
	}
}
