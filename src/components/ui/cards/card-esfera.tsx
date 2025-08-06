import { BsArrowRight } from "react-icons/bs";
import Link from "next/link";

import { oswald, titilliumWeb } from "../../../fonts/fonts";

interface CardEsferaProps {
	titulo: string;
	subtitulo: string;
	texto: string;
	rota: string;
	cor: string;
}

const CardEsfera: React.FC<CardEsferaProps> = ({
	cor,
	rota,
	texto,
	titulo,
	subtitulo,
}) => {
	return (
		<article className="w-[18.75rem] tab:w-[32rem] des:w-[48rem] h-[18.75rem] tab:h-[32rem] des:h-[48rem] bg-brasil px-8 py-4 tab:px-10 tab:py-8 des:px-14 des:py-10 border-[1px] border-[#87D9FF] rounded-[5px] shadow-md shadow-[#87D9FF]">
			<section className="w-full h-full flex flex-col gap-4 pho:gap-4 tab:gap-6 des:gap-12 content">
				<h2
					className={`text-[2rem] pho:text-[3rem] tab-[4rem] des:text-[5rem] text-white text-shadow-xl font-normal ${oswald.className}`}
				>
					{subtitulo}
					<span className={`${cor} font-light ${titilliumWeb.className}`}>
						{titulo}
					</span>
				</h2>
				<section className="h-[15rem] tab:h-[19rem] des:h-[21.45rem] w-fit overflow-y-auto shadow-inner no-scrollbar">
					<div className="text-white text-base pho:text-lg tab:text-xl des:text-2xl font-light text-justify ">
						{texto}
					</div>
				</section>
				<div className="w-full flex justify-end">
					<Link href={rota}>
						<div className="text-[25px] tab:text-[65px] des:text-[80px]">
							<BsArrowRight />
						</div>
					</Link>
				</div>
			</section>
		</article>
	);
};
export default CardEsfera;
