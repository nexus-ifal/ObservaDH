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
		<div className="flex flex-col w-11/12 h-28 gap-10 mt-5">
			<div className={`${oswald.className} flex flex-row w-full h-full`}>
				<section className="flex flex-row h-full w-1/2 ">
					<CardParlamentar parlamentar={parlamentar}>
						<section className="w-full items-center cursor-pointer imagem-hover text-white hover:text-[#93F996] h-full px-16 grid grid-cols-2">
							<div className="w-1/2">
								<div className="relative h-24 w-24">
									<Image
										src={
											parlamentar.foto ||
											"https://deepgrouplondon.com/wp-content/uploads/2019/06/person-placeholder-5.png"
										}
										alt={`${parlamentar.nome}-${parlamentar.genero}`}
										fill
										unoptimized
										className="rounded-full object-cover"
									/>
								</div>
							</div>
							<div className="w-1/2 text-start">
								<p className=" text-3xl font-medium text-nowrap ">
									{parlamentar.nome}
								</p>
							</div>
						</section>
					</CardParlamentar>
				</section>
				<div className="grid grid-cols-3 h-full w-1/2 px-16 justify-between items-center text-3xl text-white">
					<p className="">{parlamentar?.partido?.sigla}</p>
					<p className="">{parlamentar?.estado?.nome}</p>
					<p className="text-center">{propostas}</p>
				</div>
			</div>
			<CardDivider />
		</div>
	);
};

export default CardComponenteParlamentar;
