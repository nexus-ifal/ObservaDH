import React from "react";

import { oswald, titilliumWeb } from "../../../fonts/fonts";

interface CardApresentacaoProps {
	titulo: string;
	subtitulo: string;
	children?: React.ReactNode;
	cor: string;
}

const CardApresentacao: React.FC<CardApresentacaoProps> = ({
	children,
	cor,
	titulo,
	subtitulo,
}) => {
	return (
		<section className="w-full h-fit p-5 pho:p-10 tab:p-12 des:p-16 bg-gradient-to-br from-[#050B17] to-[#1A326E] border	border-white rounded-lg shadow-xl hover:shadow-2xl transition-transform duration-300 ">
			<article className="w-full h-full flex flex-col gap-2 ">
				<h2
					className={`${oswald.className} text-[2rem] des:text-[5rem] tab:text-[3rem] text-white  font-normal`}
				>
					{subtitulo}{" "}
					<span className={`${cor} ${titilliumWeb.className} font-extralight`}>
						{titulo}
					</span>
				</h2>
				<section className="h-[28rem] w-full overflow-y-auto no-scrollbar scrollbar-none">
					<div className="text-white text-xl font-normal text-justify ">
						{children}
					</div>
				</section>
			</article>
		</section>
	);
};
export default CardApresentacao;
