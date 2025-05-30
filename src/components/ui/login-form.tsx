"use client";

//import { ArrowRightIcon } from "@heroicons/react/20/solid";
/*import {
	AtSymbolIcon,
	ExclamationCircleIcon,
	KeyIcon,
} from "@heroicons/react/24/outline";*/
import { useActionState } from "react";
import { useSearchParams } from "next/navigation";

import { autenticar } from "@/core/lib/actions";
//import { Button } from "@/app/ui/button";
import { oswald } from "@/core/lib/fonts/fonts";

export default function LoginForm() {
	const searchParams = useSearchParams();
	const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";
	const [errorMessage, formAction, isPending] = useActionState(
		autenticar,
		undefined
	);

	return (
		<form action={formAction} className="space-y-3">
			<div className="login overflow-auto no-scrollbar flex flex-col gap-16">
				<h1 className={`${oswald.className} mb-3 text-2xl`}>Login</h1>
				<div className="w-full">
					<div>
						<label
							className="mb-3 mt-5 block text-xs font-medium text-gray-900"
							htmlFor="email"
						>
							Email
						</label>
						<div className="relative">
							<input
								className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
								id="email"
								type="email"
								name="email"
								placeholder="Seu email"
								required
							/>
						</div>
					</div>
					<div className="mt-4">
						<label
							className="mb-3 mt-5 block text-xs font-medium text-gray-900"
							htmlFor="password"
						>
							Senha
						</label>
						<div className="relative">
							<input
								className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
								id="password"
								type="password"
								name="password"
								placeholder="Sua senha"
								required
								minLength={6}
							/>
						</div>
					</div>
				</div>
				<input type="hidden" name="redirectTo" value={callbackUrl} />
				<button className="mt-4 w-full" aria-disabled={isPending}>
					Log in
				</button>
				{errorMessage && (
					<div className="text-red-500 text-sm mt-2">{errorMessage}</div>
				)}
			</div>
		</form>
	);
}
