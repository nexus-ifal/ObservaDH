"use client";
import React from "react";
import { FaChevronRight } from "react-icons/fa6";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { oswald, titilliumWeb } from "../../../fonts/fonts";

const sideBarOptions = [
	{ title: "Direito Violado", path: "/user-routes/dados/direito-violado" },
	{ title: "Estado", path: "/user-routes/dados/estado" },
	{ title: "Ideologia", path: "/user-routes/dados/ideologia" },
	{ title: "Partido", path: "/user-routes/dados/partido" },
	{ title: "Pauta", path: "/user-routes/dados/pauta" },
	{ title: "Parlamentar", path: "/user-routes/dados/politico" },
	{ title: "Profissão", path: "/user-routes/dados/profissao" },
	{ title: "Projeto", path: "/user-routes/dados/projeto" },
];

const SideBar: React.FC = () => {
	const pathname = usePathname();

	return (
		<aside className="w-full h-full border-r-2 border-[#AFC4F9] text-white">
			<div className="flex flex-col items-center h-full p-4 overflow-auto no-scrollbar gap-4">
				<Link
					href={"/admin/home"}
					className={`${oswald.className} text-7xl p-8`}
				>
					Dados
				</Link>
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
