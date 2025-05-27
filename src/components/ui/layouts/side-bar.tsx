"use client";
import React from "react";
import { FaChevronRight } from "react-icons/fa6";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { oswald, titilliumWeb } from "@/core/lib/fonts/fonts";

const sideBarOptions = [
	{ title: "Direito Violado", path: "/admin/dados/direito-violado" },
	{ title: "Estado", path: "/admin/dados/estado" },
	{ title: "Ideologia", path: "/admin/dados/ideologia" },
	{ title: "Partido", path: "/admin/dados/partido" },
	{ title: "Pauta", path: "/admin/dados/pauta" },
	{ title: "Parlamentar", path: "/admin/dados/parlamentar" },
	{ title: "Profissão", path: "/admin/dados/profissao" },
	{ title: "Projeto", path: "/admin/dados/projeto" },
];

const SideBar: React.FC = () => {
	const pathname = usePathname();

	return (
		<aside className="w-full h-full border-r-2 border-[#AFC4F9] text-white">
			<div className="flex flex-col items-center h-full p-4 overflow-auto no-scrollbar gap-4">
				<h2 className={`${oswald.className} text-7xl p-8`}>Dados</h2>

				<nav className="flex flex-col items-center gap-4 w-full flex-1">
					{sideBarOptions.map(({ title, path }) => (
						<SideBarButton
							key={path}
							title={title}
							path={path}
							isActive={pathname === path}
						/>
					))}
				</nav>
			</div>
		</aside>
	);
};

interface SideBarButtonProps {
	path: string;
	title: string;
	isActive: boolean;
}

const SideBarButton: React.FC<SideBarButtonProps> = ({
	path,
	title,
	isActive,
}) => {
	return (
		<Link
			href={path}
			className={clsx(
				"w-11/12 h-[10%] text-3xl bg-[#121A2B] flex justify-between items-center p-6 border-2 rounded-[5px] hover:bg-[#1A326E] duration-200",
				titilliumWeb.className,
				"border-[#AFC4F9]",
				{
					"bg-[#1A326E]": isActive,
				}
			)}
		>
			<span>{title}</span>
			<FaChevronRight />
		</Link>
	);
};

export default SideBar;
