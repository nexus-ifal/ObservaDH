"use client";

import { useActionState, useState } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";

import { deleteUser } from "@/core/lib/actions/delete-actions";
import { oswald } from "@/core/lib/fonts/fonts";

interface FoundUser {
	id: string;
	name: string;
}

export default function DeleteForm() {
	const searchParams = useSearchParams();
	const callbackUrl =
		searchParams.get("callbackUrl") || "/admin-routes/acoes-usuario";

	const [procurarNome, setprocurarNome] = useState("");
	const [foundUser, setFoundUser] = useState<FoundUser | null>(null);
	const [erroProcura, seterroProcura] = useState<string | null>(null);
	const [isProcurando, setIsProcurando] = useState(false);

	const [deleteMessage, formAction, isDeleting] = useActionState(
		deleteUser,
		undefined
	);

	const pesquisa = async () => {
		if (!procurarNome) {
			seterroProcura("Por favor, insira um nome para a busca");
			return;
		}
		setIsProcurando(true);
		seterroProcura(null);
		setFoundUser(null);

		try {
			const response = await axios.get(`/api/user/nome/${procurarNome}`);
			if (response.data.sucesso) {
				setFoundUser(response.data.dados);
			} else {
				seterroProcura(response.data.mensagem);
			}
		} catch (error) {
			if (axios.isAxiosError(error) && error.response) {
				seterroProcura(
					error.response.data.mensagem || "Usuário não encontrado."
				);
			} else {
				seterroProcura("Ocorreu um erro ao buscar o usuário");
			}
		} finally {
			setIsProcurando(false);
		}
	};

	return (
		<div className="fundo-form flex flex-col p-10 w-fit h-fit rounded-[5px] border-[2px] border-[#1A326E] shadow-2xl shadow-[#2C52A4]/50">
			<h1
				className={`${oswald.className} text-[45px] text-[#122144] text-center`}
			>
				Excluir Usuário
			</h1>

			<div className="flex flex-col gap-2 my-4">
				<label
					className={`${oswald.className} text-[#122144] text-[20px] font-medium block`}
					htmlFor="procurarNome"
				>
					Nome do Usuário
				</label>
				<div className="flex items-center gap-2">
					<input
						className="w-[300px] h-[40px] bg-white rounded-[5px] border-[2px] border-[#3E3E3E] py-[8px] pl-[4px] text-sm placeholder:text-gray-500"
						id="procurarNome"
						type="text"
						value={procurarNome}
						onChange={(e) => setprocurarNome(e.target.value)}
						placeholder="Buscar por nome"
					/>
					<button
						type="button"
						onClick={pesquisa}
						disabled={isProcurando}
						className={`bg-[#121A2B] text-[#91ADF4] p-2 rounded-[4px] border-[2px] border-[#2C52A4] h-[40px] ${oswald.className} hover:cursor-pointer hover:bg-[#2C52A4] hover:border-[#121A2B] hover:text-[#121A2B] transition-colors duration-300 disabled:bg-[#425991] disabled:text-[#0f1930]`}
					>
						{isProcurando ? "Buscando..." : "Buscar"}
					</button>
				</div>
				{erroProcura && (
					<p className="text-red-500 text-sm mt-1">{erroProcura}</p>
				)}
			</div>
			{foundUser && (
				<input type="hidden" name="idUserDelete" value={foundUser.id} />
			)}
			<form
				action={formAction}
				className="flex flex-col items-center gap-6 mt-2"
			>
				<div className="flex flex-col gap-2">
					<label
						className={`${oswald.className} text-[#122144] text-[20px] font-medium block`}
						htmlFor="password"
					>
						Sua Senha (Admin)
					</label>
					<input
						className="w-[400px] h-[40px] bg-white rounded-[5px] border-[2px] border-[#3E3E3E] py-[8px] pl-[4px] text-sm placeholder:text-gray-500"
						id="senha"
						type="password"
						name="senha"
						placeholder="Confirme sua senha para deletar"
						required
						minLength={8}
					/>
				</div>
				<input type="hidden" name="redirectTo" value={callbackUrl} />
				<button
					type="submit"
					className={`bg-[#121A2B] text-[#91ADF4] p-2 rounded-[4px] border-[2px] border-[#2C52A4] h-[40px] ${oswald.className} hover:cursor-pointer hover:bg-[#A42C2C] hover:border-[#711a1a] hover:text-white transition-colors duration-300`}
					aria-disabled={isDeleting}
				>
					{isDeleting ? "Deletando..." : `Deletar`}
				</button>
				{deleteMessage && (
					<div className="text-red-500 text-sm mt-2">{deleteMessage}</div>
				)}
			</form>
		</div>
	);
}
