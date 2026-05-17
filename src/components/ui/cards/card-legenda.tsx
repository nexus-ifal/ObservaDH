import { titilliumWeb } from "../../../fonts/fonts";

import CardSaibaMais from "./card-saiba-mais";

import { LegendaGrafico } from "@/content/models";

interface legendaProps {
	legenda: LegendaGrafico;
	children?: React.ReactNode;
}

const CardLegenda: React.FC<legendaProps> = ({ children, legenda }) => {
	return (
		<div className="w-full tab:w-[45rem] des:w-[21.5rem] flex flex-col gap-2 tab:gap-6 px-4 tab:px-8 des:px-[0px]">
			{children}
			<p
				className={`${titilliumWeb} text-white text-sm tab:text-xl text-justify `}
			>
				{legenda.conteudo ? legenda.conteudo : ""}
			</p>
			<CardSaibaMais	
				corTexto={legenda.cor}
				texto={legenda.aprofundamento ? legenda.aprofundamento : ""}
			/>
		</div>
	);
};

export default CardLegenda;
