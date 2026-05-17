"use client";

import { oswald, titilliumWeb } from "../../../fonts/fonts";

import CardRenderizarTexto from "./card-renderizar-texto";

import { ProjetoDTO } from "@/core/domain/dtos/dados.dto";
interface CardProjetosProps {
	projeto: ProjetoDTO;
}

const CardProjeto: React.FC<CardProjetosProps> = ({ projeto }) => {
	return (
		<div className="bg-gradient-to-t from-[#050B17] to-[#1A326E] w-[19.75rem] h-[15rem] tab:h-[27.625rem] tab:w-[38.125rem] border-[#AFC4F9] border-2 rounded-sm px-3 tab:px-8 py-6 tab:py-12 flex flex-col gap-2 tab:gap-4 select-none justify-center">
			<section className="flex gap-2 tab:gap-6">
				<CardRenderizarTexto conteudo={projeto.ano} titulo="Ano" />
				<CardRenderizarTexto
					conteudo={projeto.numeroPl}
					titulo="Número do PL"
				/>
			</section>
			<section className="flex gap-2 tab:gap-6">
				<CardRenderizarTexto conteudo={projeto.pauta} titulo="Pauta" />
				<h3 className="text-white flex flex-row items-center gap-4">
					<span
						className={`${oswald.className} font-normal text-sm tab:text-3xl text-[#AFC4F9]`}
					>
						{projeto.parlamentar.length > 1 ? "Estados:" : "Estado:"}
					</span>
					<span
						className={`${titilliumWeb.className} font-normal text-[12px] tab:text-xl text-white`}
					>
						{projeto.estado.join(", ")}
					</span>
				</h3>
			</section>
			<section>
				<h3 className="flex flex-row items-center gap-1 tab:gap-4">
					<span
						className={`${oswald.className} font-normal text-sm tab:text-3xl text-[#AFC4F9]`}
					>
						{projeto.parlamentar.length > 1 ? "Parlamentares:" : "Parlamentar:"}
					</span>
					{projeto.parlamentar.map((parlamentar, index) => (
						<span
							key={index}
							className={`${titilliumWeb.className} font-normal text-[12px] tab:text-xl text-white`}
						>
							{parlamentar}
						</span>
					))}
				</h3>
			</section>
			<section>
				<h3 className={`flex flex-col gap-1 tab:gap-4 items-start`}>
					<span
						className={`${oswald.className} font-normal text-sm tab:text-3xl text-[#AFC4F9]`}
					>
						Ementa:
					</span>
					<p
						className={`${titilliumWeb.className} h-24 overflow-auto no-scrollbar scrollbar-none font-normal text-[12px] tab:text-xl text-white text-justify`}
					>
						{projeto.ementa}
					</p>
				</h3>
			</section>
		</div>
	);
};

export default CardProjeto;
