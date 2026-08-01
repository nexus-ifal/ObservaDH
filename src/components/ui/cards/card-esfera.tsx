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
		<article className="w-[18rem] h-[26rem] tab:w-[30rem] tab:h-[38rem] des:w-[38rem] des:h-[46rem] bg-black/30 px-8 py-4 tab:px-10 tab:py-8 des:px-14 des:py-10 border border-white rounded-sm">
			<section className="w-full h-full flex flex-col gap-4 pho:gap-4 tab:gap-6 des:gap-12 content">
				<h2
					className={`text-[2rem] pho:text-[3rem] tab:text-[4rem] des:text-[5rem] text-white font-normal ${oswald.className}`}
				>
					{subtitulo}
					<span className={`${cor} font-light ${titilliumWeb.className}`}>
						{titulo}
					</span>
				</h2>
				<section className="h-[15rem] tab:h-[19rem] des:h-[21.45rem] w-fit overflow-y-auto shadow-inner no-scrollbar scrollbar-none">
					<div className="text-white text-sm pho:text-base tab:text-lg des:text-xl font-light text-justify ">
						{texto}
					</div>
				</section>
				<div className="w-full flex justify-end ">
					<Link href={rota}>
						<div className="text-[30px] tab:text-[40px] des:text-[50px]">
							<BsArrowRight />
						</div>
					</Link>
				</div>
			</section>
		</article>
	);
};
export default CardEsfera;
