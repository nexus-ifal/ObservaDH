"use client";

import { ProjetoLei } from "@/domain/graficos/types/projeto-lei";

import { oswald, titilliumWeb } from "../../../core/lib/fonts/fonts";

import CardRenderizarTexto from "./card-renderizar-texto";

interface CardProjetosProps {
	projeto: ProjetoLei;
}

const CardProjeto: React.FC<CardProjetosProps> = ({ projeto }) => {
	return (
		<div className="bg-gradient-to-t from-[#050B17] to-[#1A326E] h-[27.625rem] w-[38.125rem] border-[#AFC4F9] border-2 rounded-[10px] px-8 py-12 flex flex-col gap-4 select-none">
			<section className="flex gap-6">
				<CardRenderizarTexto conteudo={projeto.ano} titulo="Ano" />
				<CardRenderizarTexto
					conteudo={projeto.numeroPl}
					titulo="Número do PL"
				/>
			</section>

			<section className="flex gap-6">
				<CardRenderizarTexto conteudo={projeto.pauta} titulo="Pauta" />
				<h3 className="text-white flex flex-row items-center gap-4">
					<span
						className={`${oswald.className} font-normal text-3xl text-[#AFC4F9]`}
					>
						{projeto.parlamentares.length > 1 ? "Estados:" : "Estado:"}
					</span>
					{projeto.parlamentares.map((parlamentar, index) => (
						<span
							key={index}
							className={`${titilliumWeb.className} font-normal text-xl text-white`}
						>
							{parlamentar.estado}
						</span>
					))}
				</h3>
			</section>

			<section>
				<h3 className="flex flex-row items-center gap-4">
					<span
						className={`${oswald.className} font-normal text-3xl text-[#AFC4F9]`}
					>
						{projeto.parlamentares.length > 1
							? "Parlamentares:"
							: "Parlamentar:"}
					</span>
					{projeto.parlamentares.map((parlamentar, index) => (
						<span
							key={index}
							className={`${titilliumWeb.className} font-normal text-xl text-white`}
						>
							{parlamentar.nome} - {parlamentar.partido}
						</span>
					))}
				</h3>
			</section>

			<section>
				<h3 className={`flex flex-col gap-4 items-start`}>
					<span
						className={`${oswald.className} font-normal text-3xl text-[#AFC4F9]`}
					>
						Ementa:
					</span>
					<p
						className={`${titilliumWeb.className} font-normal text-xl text-white`}
					>
						{projeto.ementa}
					</p>
				</h3>
			</section>
		</div>
	);
};

export default CardProjeto;
