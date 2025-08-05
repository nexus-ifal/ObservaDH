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
		<section className="w-fit h-fit p-8 pho:p-10 tab:p-12 des:p-16 mx-8 pho:mx-10 des:mx-40 tab:mx-16 bg-gradient-to-b from-[#050B17] to-[#1A326E] border-[1px] border-[#87D9FF] rounded-[5px] shadow-lg shadow-[#87D9FF]">
			<article className="w-full h-full flex flex-col gap-2 tab:gap-4 des:gap-4">
				<h2
					className={`${oswald.className} text-[2rem] pho:text-[3rem] des:text-[5rem] tab:text-[4rem] text-white text-shadow-xl font-normal`}
				>
					{subtitulo}{" "}
					<span
						className={`${cor} ${titilliumWeb.className} font-extralight pho:font-extralight tab:font-extralight des:font-extralight`}
					>
						{titulo}
					</span>
				</h2>
				<section className="h-[19rem] pho:h-[22rem] tab:h-[25rem] des:h-[28rem] w-full overflow-y-auto shadow-inner no-scrollbar">
					<div className="text-white text-base pho:text-lg tab:text-xl des:text-2xl font-light text-justify ">
						{children}
					</div>
				</section>
			</article>
		</section>
	);
};
export default CardApresentacao;
