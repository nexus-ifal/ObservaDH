import React from "react";
import { BsArrowRight } from "react-icons/bs";
import Link from "next/link";

import { oswald, titilliumWeb } from "../../../core/lib/fonts/fonts";

interface CardInformativoProps {
	titulo: string;
	subtitulo: string;
	isSubtitleHTML?: boolean;
	texto: string;
	rota: string;
	corTexto: string;
}
//Ô-Ô

const CardInformativo: React.FC<CardInformativoProps> = ({
	rota,
	subtitulo,
	isSubtitleHTML = false,
	texto,
	titulo,
	corTexto,
}) => {
	return (
		<div className="flex flex-col justify-between min-w-[22.5rem] h-[35rem] bg-gradient-to-b from-[#050B17] to-[#122144] border-[3px] p-12 gap-10 border-[#2C52A4] rounded-[5px] shadow-lg shadow-[#87D9FF]">
			<h1
				className={`${corTexto} ${oswald.className} text-[2.5rem] text-shadow-lg font-normal`}
			>
				{titulo}{" "}
				<span className={`${titilliumWeb.className} text-[2.5rem] font-light`}>
					{isSubtitleHTML ? (
						<span dangerouslySetInnerHTML={{ __html: subtitulo }} />
					) : (
						subtitulo
					)}
				</span>
			</h1>
			<section className="text-xl min-h-64 text-white font-normal overflow-auto no-scrollbar">
				{texto}
			</section>
			<div className="w-full flex justify-end">
				<Link href={rota}>
					<BsArrowRight size={32} color="white" />
				</Link>
			</div>
		</div>
	);
};

export default CardInformativo;
