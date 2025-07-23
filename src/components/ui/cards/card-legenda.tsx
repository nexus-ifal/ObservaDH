import { titilliumWeb } from "../../../fonts/fonts";

import CardSaibaMais from "./card-saiba-mais";

import { LegendaGrafico } from "@/content/models";

interface legendaProps {
	legenda: LegendaGrafico;
	children?: React.ReactNode;
}

const CardLegenda: React.FC<legendaProps> = ({ children, legenda }) => {
	return (
		<div className="w-[21.5rem] flex flex-col gap-6">
			{children}
			<p className={`${titilliumWeb} text-white text-xl text-justify `}>
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
