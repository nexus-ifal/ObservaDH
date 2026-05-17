"use client";

import { useActionState } from "react";

import { oswald } from "../../../fonts/fonts";

import { RequisicaoDeRedefinicaoDeSenha } from "@/app/actions/requisicao-reset-senha-actions";

export default function SolicitarRedefinicaoForm() {
	const [message, formAction, isPending] = useActionState(
		RequisicaoDeRedefinicaoDeSenha,
		undefined
	);

	return (
		<form
			action={formAction}
			className="fundo-form flex flex-col p-8 w-fit h-fit rounded-sm border-[2px] border-[#1A326E] justify-center shadow-2xl shadow-[#2C52A4]/50"
		>
			<div className="overflow-auto no-scrollbar scrollbar-none flex flex-col gap-8">
				<h1 className={`${oswald.className} text-[45px] text-[#122144]`}>
					Redefinir Senha
				</h1>
				<div className="flex flex-col gap-6">
					<div className="flex flex-col gap-2">
						<label
							className={`${oswald.className} text-[#122144] text-[20px] font-medium block`}
							htmlFor="email"
						>
							Email
						</label>
						<div className="relative">
							<input
								className="bg-white w-[400px] h-[40px] rounded-sm border-[2px] border-[#3E3E3E] py-[8px] pl-[4px] text-sm placeholder:text-gray-500"
								id="email"
								type="email"
								name="email"
								placeholder="Seu email"
								required
							/>
						</div>
					</div>
				</div>
				<button
					type="submit"
					className={`bg-[#121A2B] rounded-sm border-[2px] border-[#2C52A4] ${oswald.className} text-[#91ADF4] text-[15px] font-medium w-fit p-2 hover:cursor-pointer hover:bg-[#2C52A4] hover:border-[#121A2B] hover:text-[#121A2B] transition-colors duration-300`}
					aria-disabled={isPending}
				>
					{isPending ? "Enviando..." : "Enviar link de redefinição"}
				</button>
				{message && (
					<div className="w-full flex justify-center">
						<div className="text-black text-[12px] mt-2">{message}</div>
					</div>
				)}
			</div>
		</form>
	);
}
