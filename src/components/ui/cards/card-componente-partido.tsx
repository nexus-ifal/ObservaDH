import Image from "next/image";

import { oswald } from "../../../core/lib/fonts/fonts";

import CardDivider from "./card-divider";

import { PartidoModel } from "@/core/domain/graficos/types/partido";

interface cardComponentePartidoProps {
	partido: PartidoModel;
}

const CardComponentePartido: React.FC<cardComponentePartidoProps> = ({
	partido,
}) => {
	return (
		<div className="flex flex-col w-11/12 h-28 gap-10 mt-5">
			<div className={` ${oswald.className} flex flex-row w-full h-full`}>
				<section className="flex flex-row h-full w-1/2 ">
					<section className="w-full items-center text-white h-full px-16 grid grid-cols-2">
						<div className="w-1/2">
							<div className="relative h-24 w-24">
								<Image
									src={partido.urlImagem}
									alt={`${partido.nome} – ${partido.sigla}`}
									fill
									className="rounded-full object-cover select-none"
								/>
							</div>
						</div>
						<div className="w-1/2">
							<p className=" text-3xl font-medium text-nowrap">
								{partido.nome}
							</p>
						</div>
					</section>
				</section>
				<div className="grid grid-cols-3 h-full w-1/2 px-16 justify-between items-center text-3xl text-white">
					<p className="text-center">{partido.sigla}</p>
					<p className="text-center">{partido.parlamentares}</p>
					<p className="text-center">{partido.propostas}</p>
				</div>
			</div>
			<CardDivider />
		</div>
	);
};

export default CardComponentePartido;
