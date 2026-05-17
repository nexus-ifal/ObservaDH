import React from "react";
import { BsArrowRight } from "react-icons/bs";
import Link from "next/link";

import { oswald, titilliumWeb } from "../../../fonts/fonts";

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
		<div className="flex flex-col justify-between w-fit h-[28rem] tab:w-fit tab:h-fit des:w-[26rem] des:h-[35rem] p-8 gap-2 tab:p-12 tab:gap-8 des:p-12 des:gap-10 bg-gradient-to-b from-[#050B17] to-[#122144] border border-white rounded-sm shadow-lg">
			<h1
				className={`${corTexto} ${oswald.className} text-[25px] tab:text-[35px] des:text-[2.5rem]  font-normal`}
			>
				{titulo}{" "}
				<span
					className={`${titilliumWeb.className} text-[25px] tab:text-[35px] des:text-[2.5rem] font-light`}
				>
					{isSubtitleHTML ? (
						<span dangerouslySetInnerHTML={{ __html: subtitulo }} />
					) : (
						subtitulo
					)}
				</span>
			</h1>
			<section className="text-base tab:text-lg des:text-xl min-h-64 text-white font-normal overflow-auto no-scrollbar scrollbar-none ">
				{texto}
			</section>
			<div className="w-full flex justify-end">
				<Link href={rota}>
					<div className="text-white text-[30px] tab:text-[34px] des:text-[32px]">
						<BsArrowRight />
					</div>
				</Link>
			</div>
		</div>
	);
};

export default CardInformativo;
