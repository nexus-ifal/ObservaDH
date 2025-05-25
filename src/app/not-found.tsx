"use client";

import { useRouter } from "next/navigation";

import FooterBar from "@/components/ui/layouts/footer-bar";
import Header from "@/components/ui/layouts/header";

import { oswald } from "@/core/lib/fonts/fonts";

const NotFoundPage: React.FC = () => {
	const router = useRouter();
	const retornar = () => {
		router.push("/");
	};
	return (
		<div className="fundo-404 overflow-auto no-scrollbar flex flex-col gap-16">
			<div
				className={`flex flex-col p-8 gap-40 text-white text-shadow-xl ${oswald.className}`}
			>
				<Header />
				<div className="flex flex-col gap-16 pl-20">
					<h2 className={`text-8xl`}>{"Perdido no espaço :("}</h2>
					<p className="text-7xl">{"404 - Página não Encontrada"}</p>
					<button
						onClick={retornar}
						className="rounded-[5px] bg-[#2C52A4] border-[#87D9FF] border-2 h-12 w-48 text-center text-[#91ADF4] text-xl hover:bg-[#122144]	duration-300 shadow-sm shadow-white"
					>
						{"Voltar a página inicial"}
					</button>
				</div>
			</div>
			<FooterBar />
		</div>
	);
};
export default NotFoundPage;
