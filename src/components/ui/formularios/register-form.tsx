"use client";

import { useActionState, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import { registerUser } from "@/core/lib/actions/register-actions";
import { oswald } from "@/core/lib/fonts/fonts";

export default function RegisterForm() {
	const searchParams = useSearchParams();
	const callbackUrl =
		searchParams.get("callbackUrl") || "/admin-routes/acoes-usuario";
	const [state, formAction, isPending] = useActionState(registerUser, {
		message: undefined,
		emailSent: false,
	});

	const [successMessage, setSuccessMessage] = useState<string | undefined>(
		undefined
	);

	useEffect(() => {
		if (state?.emailSent) {
			setSuccessMessage(
				"Usuário criado! Um e-mail de verificação foi enviado para o endereço fornecido."
			);
		} else if (state?.message) {
			setSuccessMessage(undefined);
		}
	}, [state]);

	return (
		<form
			action={formAction}
			className="fundo-form flex flex-col p-10 w-fit h-fit rounded-[5px] border-[2px] border-[#1A326E] shadow-2xl shadow-[#2C52A4]/50"
		>
			<div className="overflow-auto no-scrollbar flex flex-col gap-6 items-center">
				<h1 className={`${oswald.className} text-[45px] text-[#122144]`}>
					Cadastro
				</h1>
				<div className="flex flex-col gap-4">
					<div className="flex flex-col gap-2">
						<label
							className={`${oswald.className} text-[#122144] text-[20px] font-medium block`}
							htmlFor="name"
						>
							Nome
						</label>
						<div className="relative">
							<input
								className="w-[400px] h-[40px] bg-white rounded-[5px] border-[2px] border-[#3E3E3E] py-[8px] pl-[4px] text-sm placeholder:text-gray-500"
								id="name"
								type="text"
								name="name"
								placeholder="Nome do usuário"
								required
							/>
						</div>
					</div>
					<div className="flex flex-col gap-2">
						<label
							className={`${oswald.className} text-[#122144] text-[20px] font-medium block`}
							htmlFor="email"
						>
							Email
						</label>
						<div className="relative">
							<input
								className="w-[400px] h-[40px] bg-white rounded-[5px] border-[2px] border-[#3E3E3E] py-[8px] pl-[4px] text-sm placeholder:text-gray-500 flex justify-start"
								id="email"
								type="email"
								name="email"
								placeholder="Email do usuário"
								required
							/>
						</div>
					</div>
					<div className="flex flex-col gap-2">
						<label
							className={`${oswald.className} text-[#122144] text-[20px] font-medium block`}
							htmlFor="password"
						>
							Senha
						</label>
						<div className="relative">
							<input
								className="w-[400px] h-[40px] bg-white rounded-[5px] border-[2px] border-[#3E3E3E] py-[8px] pl-[4px] text-sm placeholder:text-gray-500 flex justify-start"
								id="password"
								type="text"
								name="password"
								placeholder="Senha do usuário"
								required
								minLength={8}
							/>
						</div>
					</div>
					<div className="flex flex-col gap-2">
						<label
							className={`${oswald.className} text-[#122144] text-[20px] font-medium block`}
							htmlFor="role"
						>
							Escolha a função do usuário:
						</label>
						<div className="relative">
							<select
								name="role"
								id="role"
								required
								className="bg-white rounded-[5px] h-[40px] border-[2px] border-[#3E3E3E] py-[8px] pl-[4px] text-sm"
							>
								<option value="EDITOR">Editor</option>
								<option value="ADMIN">Administrador</option>
							</select>
						</div>
					</div>
				</div>
				<input type="hidden" name="redirectTo" value={callbackUrl} />
				<button
					type="submit"
					className={`bg-[#121A2B] rounded-[4px] border-[2px] border-[#2C52A4] ${oswald.className} text-[#91ADF4] text-[15px] font-medium w-fit p-2 hover:cursor-pointer hover:bg-[#2C52A4] hover:border-[#121A2B] hover:text-[#121A2B] transition-colors duration-300`}
					aria-disabled={isPending}
				>
					{isPending ? "Cadastrando..." : `Cadastrar`}
				</button>
				{state?.message && (
					<div className="text-black text-sm mt-2">{state.message}</div>
				)}
				{successMessage && (
					<div className="text-green-600 text-sm mt-2">{successMessage}</div>
				)}
			</div>
		</form>
	);
}
