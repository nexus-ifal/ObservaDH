import { titilliumWeb } from "../../../fonts/fonts";

import CardSaibaMais from "./card-saiba-mais";

interface legendaProps {
	corTexto?: string;
	children?: React.ReactNode;
	resumo?: string;
	texto?: string;
}

const CardLegenda: React.FC<legendaProps> = ({
	corTexto,
	texto,
	children,
	resumo,
}) => {
	return (
		<div className="w-[21.5rem] flex flex-col gap-6">
			{children}
			<p className={`${titilliumWeb} text-white text-xl text-justify `}>
				{resumo ? resumo : ""}
			</p>
			<CardSaibaMais corTexto={corTexto} texto={texto ? texto : ""} />
		</div>
	);
};

export default CardLegenda;
