"use client";

import { useActionState } from "react";
import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useSearchParams } from "next/navigation";

import { oswald } from "../../../fonts/fonts";

import { ResetSenha } from "@/app/actions/reset-senha-actions";

export default function RedefinirSenhaForm() {
	const searchParams = useSearchParams();
	const token = searchParams.get("token");

	const [message, formAction, isPending] = useActionState(
		ResetSenha,
		undefined
	);

	const [resetToken, setResetToken] = useState<string | null>(null);
	const [showPassword, setShowPassword] = useState(false);

	useEffect(() => {
		if (token) {
			setResetToken(token);
		} else {
		}
	}, [token]);

	const handleShowPassword = () => {
		setShowPassword(!showPassword);
	};

	return (
		<form
			action={formAction}
			className="fundo-form flex flex-col p-8 w-fit h-fit rounded-sm border-[2px] border-[#1A326E] justify-center shadow-2xl shadow-[#2C52A4]/50"
		>
			<div className="overflow-auto no-scrollbar scrollbar-none flex flex-col gap-8">
				<h1 className={`${oswald.className} text-[45px] text-[#122144]`}>
					Nova Senha
				</h1>
				{resetToken ? (
					<div className="flex flex-col gap-6">
						<div className="flex flex-col gap-2">
							<label
								className={`${oswald.className} text-[#122144] text-[20px] font-medium block`}
								htmlFor="password"
							>
								Nova Senha
							</label>
							<div className="relative">
								<input
									className="bg-white w-[400px] h-[40px] rounded-sm border-[2px] border-[#3E3E3E] py-[8px] pl-[4px] pr-10 text-sm placeholder:text-gray-500"
									id="password"
									type={showPassword ? "text" : "password"}
									name="password"
									placeholder="Sua nova senha"
									required
									minLength={6}
								/>
								<button
									type="button"
									onClick={handleShowPassword}
									className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
								>
									{showPassword ? (
										<FaEyeSlash className="text-gray-500" />
									) : (
										<FaEye className="text-gray-500" />
									)}
								</button>
							</div>
						</div>
						<input type="hidden" name="token" value={resetToken} />
						<button
							type="submit"
							className={`bg-[#121A2B] rounded-sm border-[2px] border-[#2C52A4] ${oswald.className} text-[#91ADF4] text-[15px] font-medium w-fit p-2 hover:cursor-pointer hover:bg-[#2C52A4] hover:border-[#121A2B] hover:text-[#121A2B] transition-colors duration-300`}
							aria-disabled={isPending}
						>
							{isPending ? "Redefinindo..." : "Redefinir Senha"}
						</button>
					</div>
				) : (
					<p className="text-red-600">
						Token de redefinição inválido ou ausente. Por favor, solicite um
						novo link.
					</p>
				)}
				{message && (
					<div className="w-full flex justify-center">
						<div className="text-black text-[12px] mt-2">{message}</div>
					</div>
				)}
			</div>
		</form>
	);
}
