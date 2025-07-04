"use client";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

import { oswald } from "@/core/lib/fonts/fonts";

function ErroConteudo() {
	const searchParams = useSearchParams();
	const message =
		searchParams.get("message") || "Ocorreu um erro ao verificar seu e-mail.";

	return (
		<>
			<h1 className={`${oswald.className} text-4xl text-red-600 mb-4`}>
				Erro na Verificação
			</h1>
			<p className={`${oswald.className} text-lg text-white text-center`}>
				{message}
			</p>
			<a href="/login" className="mt-6 text-blue-600 hover:underline">
				Voltar para a página de Login
			</a>
		</>
	);
}

export default function PaginaDeErro() {
	return (
		<div className="fundo-login flex flex-col items-center justify-center min-h-screen p-4">
			<Suspense
				fallback={
					<div className={`${oswald.className} text-lg text-white text-center`}>
						Carregando mensagem de erro...
					</div>
				}
			>
				<ErroConteudo />
			</Suspense>
		</div>
	);
}
