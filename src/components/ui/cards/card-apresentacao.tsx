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
		<section className="w-fit h-fit p-8 pho:p-10 tab:p-12 des:p-16 mx-6 des:mx-40 tab:mx-16 bg-gradient-to-b from-[#050B17] to-[#1A326E] border-[1px] border-[#87D9FF] rounded-[5px] shadow-lg shadow-[#87D9FF]">
			<article className="w-full h-full flex flex-col gap-2 tab:gap-4 des:gap-4">
				<h2
					className={`${oswald.className} text-[1.8rem] des:text-[5rem] tab:text-[3rem] text-white text-shadow-xl font-normal`}
				>
					{subtitulo}{" "}
					<span className={`${cor} ${titilliumWeb.className} font-extralight`}>
						{titulo}
					</span>
				</h2>
				<section className="h-[28rem] tab:h-[28rem] des:h-[30rem] w-full overflow-y-auto shadow-inner no-scrollbar">
					<div className="text-white text-base tab:text-xl des:text-2xl font-light text-justify ">
						{children}
					</div>
				</section>
			</article>
		</section>
	);
};
export default CardApresentacao;
