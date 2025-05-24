import React from "react";

import { oswald, titilliumWeb } from "../../../core/lib/fonts/fonts";

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
		<section className="w-[75.75rem] h-[43.4375rem] bg-gradient-to-b from-[#050B17] to-[#1A326E]  border-[1px] border-[#87D9FF] p-16 rounded-[5px] shadow-lg shadow-[#87D9FF]">
			<article className="w-full h-full flex flex-col gap-4">
				<h2
					className={`${oswald.className} text-[5rem] text-white text-shadow-xl font-normal`}
				>
					{subtitulo}{" "}
					<span className={`${cor} ${titilliumWeb.className} font-extralight`}>
						{titulo}
					</span>
				</h2>
				<section className="h-[28rem] w-full overflow-y-auto shadow-inner no-scrollbar">
					<div className="text-white text-2xl font-light text-justify ">
						{children}
					</div>
				</section>
			</article>
		</section>
	);
};
export default CardApresentacao;
