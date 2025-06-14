"use client";

import { useActionState, useState } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";

import { updateUser } from "@/core/lib/actions/update-actions";
import { oswald } from "@/core/lib/fonts/fonts";

interface FoundUser {
	id: string;
	name: string;
}

export default function UpdateForm() {
	const searchParams = useSearchParams();
	const callbackUrl =
		searchParams.get("callbackUrl") || "/admin-routes/acoes-usuario";

	const [procurarNome, setprocurarNome] = useState("");
	const [foundUser, setFoundUser] = useState<FoundUser | null>(null);
	const [erroProcura, seterroProcura] = useState<string | null>(null);
	const [isProcurando, setIsProcurando] = useState(false);

	const [updateMessage, formAction, isUpdating] = useActionState(
		updateUser,
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
		<div className="fundo-form flex flex-col p-10 w-fit h-fit overflow-auto rounded-[5px] border-[2px] border-[#1A326E] shadow-2xl shadow-[#2C52A4]/50">
			<h1 className={`${oswald.className} text-[40px] text-[#122144]`}>
				Atualização de Usuário
			</h1>
			<div className="flex flex-col gap-2 my-4">
				<label
					className={`${oswald.className} text-[#122144] text-[15px] font-medium block`}
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
					<p className="text-red-600 text-sm mt-1">{erroProcura}</p>
				)}
			</div>
			{foundUser && (
				<form action={formAction} className="overflow-auto flex flex-col gap-6">
					<input type="hidden" name="idUserUpdate" value={foundUser.id} />
					<p className={`${oswald.className} text-[#122144] text-[15px] mb-2`}>
						Usuário encontrado
					</p>

					<div className="flex gap-4">
						<div className="flex flex-col gap-2">
							<div className="flex flex-col gap-2">
								<label
									className={`${oswald.className} text-[#122144] text-[15px] font-medium block`}
									htmlFor="name"
								>
									Novo nome
								</label>
								<div className="relative">
									<input
										className="w-[300px] h-[40px] bg-white rounded-[5px] border-[2px] border-[#3E3E3E] py-[8px] pl-[4px] text-sm placeholder:text-gray-500"
										id="name"
										type="text"
										name="name"
										placeholder="Nome do usuário"
									/>
								</div>
							</div>
							<div className="flex flex-col gap-2">
								<label
									className={`${oswald.className} text-[#122144] text-[15px] font-medium block`}
									htmlFor="email"
								>
									Novo email
								</label>
								<div className="relative">
									<input
										className="w-[300px] h-[40px] bg-white rounded-[5px] border-[2px] border-[#3E3E3E] py-[8px] pl-[4px] text-sm placeholder:text-gray-500 flex justify-start"
										id="email"
										type="email"
										name="email"
										placeholder="Email do usuário"
									/>
								</div>
							</div>
						</div>
						<div className="flex flex-col gap-2">
							<div className="flex flex-col gap-2">
								<label
									className={`${oswald.className} text-[#122144] text-[15px] font-medium block`}
									htmlFor="password"
								>
									Nova senha
								</label>
								<div className="relative">
									<input
										className="w-[300px] h-[40px] bg-white rounded-[5px] border-[2px] border-[#3E3E3E] py-[8px] pl-[4px] text-sm placeholder:text-gray-500 flex justify-start"
										id="password"
										type="password"
										name="password"
										placeholder="Senha do usuário"
										minLength={8}
									/>
								</div>
							</div>
							<div className="flex flex-col gap-2">
								<label
									className={`${oswald.className} text-[#122144] text-[15px] font-medium block`}
									htmlFor="role"
								>
									Escolha a nova função do usuário:
								</label>
								<div className="relative">
									<select
										name="role"
										id="role"
										className="bg-white rounded-[5px] h-[40px] border-[2px] border-[#3E3E3E] py-[8px] pl-[4px] text-sm"
									>
										<option value="EDITOR">Editor</option>
										<option value="ADMIN">Administrador</option>
									</select>
								</div>
							</div>
						</div>
					</div>
					<div className="flex flex-col gap-2">
						<label
							className={`${oswald.className} text-[#122144] text-[15px] font-medium block`}
							htmlFor="password"
						>
							Sua Senha (Admin)
						</label>
						<input
							className="w-[300px] h-[40px] bg-white rounded-[5px] border-[2px] border-[#3E3E3E] py-[8px] pl-[4px] text-sm placeholder:text-gray-500"
							id="senha"
							type="password"
							name="senha"
							placeholder="Confirme sua senha para deletar"
							minLength={8}
						/>
					</div>
					<input type="hidden" name="redirectTo" value={callbackUrl} />
					<div className="w-max flex items-center justify-center ">
						<button
							type="submit"
							className={`bg-[#121A2B] rounded-[4px] border-[2px] border-[#2C52A4] ${oswald.className} text-[#91ADF4] text-[15px] font-medium w-fit p-2 hover:cursor-pointer hover:bg-[#2C52A4] hover:border-[#121A2B] hover:text-[#121A2B] transition-colors duration-300`}
							aria-disabled={isUpdating}
						>
							{isUpdating ? "Atualizando..." : `Atualizar`}
						</button>
					</div>
					{updateMessage && (
						<div className="text-red-500 text-sm mt-2">{updateMessage}</div>
					)}
				</form>
			)}
		</div>
	);
}
