import React from "react";
import { IoMdClose } from "react-icons/io";
import Image from "next/image";

import {
	AlertDialog,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogTrigger,
} from "@/components/external/ui-shacnui/alert-dialog";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/external/ui-shacnui/carousel";

import Texto from "../componente-texto";

import CardItemRenderizacao from "./card-item-renderizacao";
import CardMiniProjetos from "./card-mini-projeto";

import { ResponsePoliticoDTO } from "@/core/domain/dtos/politico.dto";

interface saibaMaisProps {
	parlamentar: ResponsePoliticoDTO;
	children: React.ReactNode;
}

const CardParlamentar: React.FC<saibaMaisProps> = ({
	children,
	parlamentar,
}) => {
	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<button className={`text-xl items-center gap-4 w-full`}>
					{children}
				</button>
			</AlertDialogTrigger>
			<AlertDialogContent className="flex-col h-fit w-fit p-6 tab:p-10 des:p-12 flex bg-gradient-to-t from-[#050B17] to-[#121A2B] border-[#4568BE] shadow-lg shadow-[#4568BE] rounded-lg">
				<AlertDialogDescription className="flex flex-col w-full h-full gap-4 tab:gap-6">
					<article className="flex flex-col gap-4 tab:gap-8">
						<section className="flex flex-row w-full justify-between items-start">
							<div className="flex flex-col tab:flex-row items-start tab:items-center gap-2 tab:gap-10">
								<div className="relative h-24 w-24 tab:h-44 tab:w-44">
									<Image
										src={
											parlamentar.foto ||
											"https://deepgrouplondon.com/wp-content/uploads/2019/06/person-placeholder-5.png"
										}
										alt={`${parlamentar.nome}-${parlamentar.genero}`}
										fill
										unoptimized
										className="rounded-full border-2 border-white object-cover"
									/>
								</div>
								<p className="text-2xl tab:text-5xl text-shadow-xl font-normal text-white truncate">
									{parlamentar.nome}
								</p>
							</div>
							<AlertDialogCancel className="">
								<IoMdClose size={26} color="white" />
							</AlertDialogCancel>
						</section>
						<section className="text-white text-sm tab:text-xl grid grid-cols-2 tab:grid-cols-3 gap-1 tab:gap-4">
							{[
								["Gênero", parlamentar.genero],
								["Religião", parlamentar.religiao],
								["Raça", parlamentar.raca],
								["Esfera", parlamentar?.esfera?.nome],
								["Estado", parlamentar?.estado?.nome],
								["Profissão", parlamentar?.profissao?.nome],
								["Partido", parlamentar?.partido?.sigla],
								["Ideologia Política", parlamentar.ideologia],
							].map(([titulo, valor], index) => (
								<CardItemRenderizacao
									key={index}
									titulo={titulo || ""}
									valor={valor || ""}
								/>
							))}
						</section>
						<div className="w-full bg-white/50 h-[2px]" />
					</article>
					<section className="flex flex-col w-full items-center gap-4 tab:gap-8">
						<div>
							<Texto.Linha className="text-lg tab:text-4xl text-white text-shadow-xl text-center ">
								<Texto.Forte.Oswald>{"Projetos"}</Texto.Forte.Oswald>
								<Texto.Espaco />
								<Texto.Pequeno.Titillium className={`text-[#F693F9]`}>
									{"de Lei"}
								</Texto.Pequeno.Titillium>
							</Texto.Linha>
						</div>
						<div>
							<Carousel
								opts={{
									align: "start",
								}}
								className="w-[16rem] tab:w-[40rem]"
							>
								<CarouselContent className="">
									{parlamentar?.projetos?.map((item, index) => (
										<CarouselItem key={index} className="flex justify-center">
											<CardMiniProjetos
												miniProjeto={{
													id: item.id,
													numero: item.numeroPl,
													ano: item.ano,
													pauta: item.pauta,
												}}
											/>
										</CarouselItem>
									))}
								</CarouselContent>
								<CarouselPrevious />
								<CarouselNext />
							</Carousel>
						</div>
					</section>
				</AlertDialogDescription>
			</AlertDialogContent>
		</AlertDialog>
	);
};

export default CardParlamentar;
