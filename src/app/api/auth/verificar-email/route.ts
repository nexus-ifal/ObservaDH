import { NextRequest, NextResponse } from "next/server";

import { TokenDeVerificacaoService } from "@/services/email/token-verificacao-service";

export async function GET(req: NextRequest) {
	const { searchParams } = new URL(req.url);
	const token = searchParams.get("token");

	if (!token) {
		return NextResponse.json(
			{ sucesso: false, mensagem: "Token de verificação ausente." },
			{ status: 400 }
		);
	}

	try {
		const tokenDeVerificacaoService = new TokenDeVerificacaoService();
		const resultado = await tokenDeVerificacaoService.verificarEmail(token);

		if (resultado.sucesso) {
			return NextResponse.redirect(new URL("/email-routes/sucesso", req.url));
		} else {
			return NextResponse.redirect(
				new URL(
					`/email-routes/erro?message=${encodeURIComponent(resultado.mensagem)}`,
					req.url
				)
			);
		}
	} catch (error) {
		console.error("Erro no endpoint de verificação de e-mail:", error);
		return NextResponse.redirect(
			new URL(
				`/email-routes/erro?message=${encodeURIComponent("Erro interno ao verificar o e-mail.")}`,
				req.url
			)
		);
	}
}
