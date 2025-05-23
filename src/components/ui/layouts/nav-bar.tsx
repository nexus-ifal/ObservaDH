"use client";

import { useCallback, useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import Header from "./header";

import useDescobertaCabecalho from "@/lib/web/mock-utils/cabecalho-utils";

interface Cabecalho {
	titulo: string;
	text: string;
}

const navBar: React.FC = () => {
	const [title, setTitle] = useState<Cabecalho>({
		titulo: "",
		text: "",
	});
	const router = usePathname();
	const { buscarCabecalhoPorLink } = useDescobertaCabecalho();
	const buscarCabecalho = useCallback(
		() => buscarCabecalhoPorLink(router),
		[buscarCabecalhoPorLink, router]
	);

	useEffect(() => {
		const item = buscarCabecalho();
		if (item) {
			setTitle(item);
		} else {
			setTitle({
				titulo: "Projeto de Lei",
				text: "",
			});
		}
	}, [router, buscarCabecalho]);

	return (
		<div className="w-full h-full flex flex-col items-center bg-senado bg-cover bg-center border-b-2 border-[#001745]">
			<nav className="p-8 w-full items-center flex flex-col gap-40">
				<Header />
				<div className="w-full flex flex-col px-14">
					{router === "/" ? (
						<div className="gap-8 flex flex-col">
							<span className="logo text-8xl text-white text-shadow-xl"></span>
							<p className="text-white text-3xl font-normal text-shadow-xl">
								{title?.text}
							</p>
						</div>
					) : (
						<div className="gap-8 flex flex-col">
							<h1 className="text-8xl text-white text-shadow-xl">
								{title?.titulo}
							</h1>
							<p className="text-white text-3xl font-normal">{title?.text}</p>
						</div>
					)}
				</div>
			</nav>
		</div>
	);
};

export default navBar;
