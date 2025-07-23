"use client";

import { signOut } from "next-auth/react";

import { titilliumWeb } from "@/fonts/fonts";

export function LogoutButton() {
	const handleLogout = async () => {
		await signOut({
			redirect: true,
			callbackUrl: "/",
		});
	};

	return (
		<button
			onClick={handleLogout}
			className={`flex items-center justify-center p-2 w-[85px] bg-[#121A2B] rounded-[4px] border-[2px] border-[#AFC4F9] ${titilliumWeb.className} text-white text-[20px] font-medium shadow-lg shadow-[#2C52A4]/40 hover:cursor-pointer hover:bg-[#1A326E] hover:text-white transition-colors duration-300`}
		>
			Sair
		</button>
	);
}
