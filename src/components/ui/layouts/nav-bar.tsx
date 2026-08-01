"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import Header from "./header";

import {
	buscarCabecalhoPorLink,
	Cabecalho,
} from "@/content/content-navbar-utils";

const NavBar: React.FC = () => {
	const [title, setTitle] = useState<Omit<Cabecalho, "link">>({
		titulo: "",
		text: "",
	});
	const currentPath = usePathname();

	useEffect(() => {
		const item = buscarCabecalhoPorLink(currentPath);
		if (item) {
			setTitle({ titulo: item.titulo, text: item.text });
		} else {
			setTitle({
				titulo: "Projeto de Lei",
				text: "",
			});
		}
	}, [currentPath]);

	return (
		<div className="w-full h-full flex flex-col items-center bg-senado bg-cover bg-center border-b-2 border-[#001745]">
			<nav className="p-4 tab:p-6 des:p-8 w-full items-center flex flex-col gap-40 des:gap-40 tab:gap-54">
				<Header />
				<div className="w-full flex flex-col px-6 tab:px-10 des:px-12">
					{currentPath === "/" ? (
						<div className="gap-4 tab:gap-6 des:gap-6 flex flex-col">
							<span className="logo text-5xl tab:text-7xl des:text-8xl text-white "></span>
							<p className="text-white text-[20px] tab:text-xl des:text-2xl font-normal ">
								{title.text}
							</p>
						</div>
					) : (
						<div className="gap-4 tab:gap-6 des:gap-8 flex flex-col">
							<h1 className="text-5xl tab:text-7xl des:text-8xl text-white ">
								{title.titulo}
							</h1>
							<p className="text-white text-[20px] tab:text-2xl des:text-3xl font-normal">
								{title.text}
							</p>
						</div>
					)}
				</div>
			</nav>
		</div>
	);
};

export default NavBar;
