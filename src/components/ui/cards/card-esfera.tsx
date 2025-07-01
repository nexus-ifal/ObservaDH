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
		<article className="w-[47.125rem] h-[43rem] bg-brasil px-16 py-12 border-[1px] border-[#87D9FF] rounded-[5px] shadow-md shadow-[#87D9FF]">
			<section className="w-full h-full flex flex-col gap-12 content">
				<h2
					className={`text-[5rem] text-white text-shadow-xl font-normal ${oswald.className}`}
				>
					{subtitulo}
					<span className={`${cor} font-light ${titilliumWeb.className}`}>
						{titulo}
					</span>
				</h2>
				<section className="h-[21.45rem] w-full overflow-y-auto shadow-inner no-scrollbar">
					<div className="text-white text-2xl font-light text-justify ">
						{texto}
					</div>
				</section>
				<div className="w-full flex justify-end">
					<Link href={rota}>
						<BsArrowRight size={80} />
					</Link>
				</div>
			</section>
		</article>
	);
};
export default CardEsfera;
