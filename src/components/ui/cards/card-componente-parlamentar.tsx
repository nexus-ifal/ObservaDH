import Image from "next/image";

import { oswald } from "../../../fonts/fonts";

import CardDivider from "./card-divider";
import CardParlamentar from "./card-parlamentar";

import { ResponsePoliticoDTO } from "@/core/domain/dtos/politico.dto";

interface componentePros {
	parlamentar: ResponsePoliticoDTO;
	propostas: number;
}

const CardComponenteParlamentar: React.FC<componentePros> = ({
	parlamentar,
	propostas,
}) => {
	return (
		<div className="flex flex-col w-full h-full gap-4 tab:mt-2 des:gap-10 px-2 des:px-5">
			<div
				className={`${oswald.className} flex flex-row w-full h-full gap-6 tab:gap-12 des:gap-40 items-center`}
			>
				<section className="flex flex-row h-full w-1/2 ">
					<CardParlamentar parlamentar={parlamentar}>
						<section className="flex w-full h-full items-itemscursor-pointer imagem-hover items-center text-white hover:text-[#93F996] gap-2 pl-4 tab:gap-24 tab:pl-6 des:gap-40 des:pl-26 ">
							<div className="w-fit">
								<div className="relative w-6 h-6 tab:h-12 tab:w-12 des:h-24 des:w-24">
									<Image
										src={
											parlamentar.foto ||
											"https://deepgrouplondon.com/wp-content/uploads/2019/06/person-placeholder-5.png"
										}
										alt={`${parlamentar.nome}-${parlamentar.genero}`}
										fill
										unoptimized
										className="rounded-full object-cover text-[4.8px] tab:text-sm"
									/>
								</div>
							</div>
							<div className="w-fit h-fit text-start">
								<p className="text-[9.8px] tab:text-[17.5px] des:text-[26.7px] font-medium text-nowrap ">
									{parlamentar.nome}
								</p>
							</div>
						</section>
					</CardParlamentar>
				</section>
				<section className="flex flex-row h-full w-1/2 ">
					<div className="flex h-full w-full mr-4 tab:mr-18 des:mr-50 gap-4 des:gap-0 justify-between items-center text-[10px] tab:text-[17px] des:text-2xl text-white">
						<p className="">{parlamentar?.partido?.sigla}</p>
						<p className="">{parlamentar?.estado?.nome}</p>
						<p className="text-center">{propostas}</p>
					</div>
				</section>
			</div>
			<CardDivider />
		</div>
	);
};

export default CardComponenteParlamentar;
