"use client";

import { useActionState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";

import { oswald } from "../../../fonts/fonts";

import { authenticate } from "@/app/actions/login-actions";

export default function LoginForm() {
	const searchParams = useSearchParams();
	const router = useRouter();
	const { status } = useSession();
	const callbackUrl = searchParams.get("callbackUrl");
	const [errorMessage, formAction, isPending] = useActionState(
		authenticate,
		undefined
	);

	useEffect(() => {
		if (status === "authenticated") {
		}
	}, [status, callbackUrl, router]);

	return (
		<form
			action={formAction}
			className="fundo-form flex flex-col p-8 w-fit h-fit rounded-[5px] border-[2px] border-[#1A326E] justify-start shadow-2xl shadow-[#2C52A4]/50"
		>
			<div className="overflow-auto no-scrollbar flex flex-col gap-8">
				<h1 className={`${oswald.className} text-[45px] text-[#122144]`}>
					Login
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
								className="bg-white w-[400px] h-[40px] rounded-[5px] border-[2px] border-[#3E3E3E] py-[8px] pl-[4px] text-sm placeholder:text-gray-500"
								id="email"
								type="email"
								name="email"
								placeholder="Seu email"
								required
								onChange={(e) => e.target.value}
								autoComplete="username"
							/>
						</div>
					</div>
					<div className="flex flex-col gap-4 justify-end">
						<div className="flex flex-col gap-2 justify-self-start">
							<label
								className={`${oswald.className} text-[#122144] text-[20px] font-medium block`}
								htmlFor="password"
							>
								Senha
							</label>
							<div className="relative">
								<input
									className="bg-white w-[400px] h-[40px] rounded-[5px] border-[2px] border-[#3E3E3E] py-[8px] pl-[4px] text-sm placeholder:text-gray-500 flex justify-start"
									id="password"
									type="password"
									name="password"
									placeholder="Sua senha"
									required
									minLength={6}
									onChange={(e) => e.target.value}
									autoComplete="current-password"
								/>
							</div>
						</div>
						<div className="flex justify-end">
							<Link
								href="/email-routes/solicitar-redefinicao"
								className="text-[14px] text-[#1A326E] hover:underline"
							>
								Esqueceu a senha?
							</Link>
						</div>
					</div>
				</div>
				<button
					type="submit"
					className={`bg-[#121A2B] rounded-[4px] border-[2px] border-[#2C52A4] ${oswald.className} text-[#91ADF4] text-[15px] font-medium w-fit p-2 hover:cursor-pointer hover:bg-[#2C52A4] hover:border-[#121A2B] hover:text-[#121A2B] transition-colors duration-300`}
					aria-disabled={isPending}
				>
					{isPending ? "Entrando..." : `Entrar`}
				</button>
				{errorMessage && (
					<div className="w-full flex justify-center">
						<div className="text-black text-[12px] mt-2">{errorMessage}</div>
					</div>
				)}
			</div>
		</form>
	);
}
