import { oswald } from "@/fonts/fonts";

export default function PaginaDeSucesso() {
	return (
		<div className="fundo-login flex flex-col items-center justify-center min-h-screen p-4">
			<h1 className={`${oswald.className} text-4xl text-green-600 mb-4`}>
				Sucesso!
			</h1>
			<p className={`${oswald.className} text-lg text-white text-center`}>
				Seu e-mail foi verificado com sucesso. Você já pode fazer login.
			</p>
			<a href="/login" className="mt-6 text-blue-600 hover:underline">
				Ir para a página de Login
			</a>
		</div>
	);
}
