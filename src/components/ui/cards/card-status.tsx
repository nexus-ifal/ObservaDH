import { titilliumWeb } from "../../../fonts/fonts";

import CardDivider from "./card-divider";
import CardStatusItem from "./card-status-item";

import {
	DadosParlamentarProjetosEsfera,
	DadosPautaEsfera,
} from "@/core/domain/dtos/dados.dto";

interface StatusCardProps {
	dadosParlamentarProjetosEsfera: DadosParlamentarProjetosEsfera;
	dadosPautaEsfera: DadosPautaEsfera[];
}

// ಠ_ಠ
const CardStatus: React.FC<StatusCardProps> = ({
	dadosParlamentarProjetosEsfera,
	dadosPautaEsfera,
}) => {
	const ambito =
		dadosParlamentarProjetosEsfera?.esfera === "nacional"
			? "Nacionais"
			: dadosParlamentarProjetosEsfera?.esfera === "federal"
				? "Federais"
				: "Estaduais";
	return (
		<article className="flex flex-col tab:gap-3 des:gap-4 border-l-[1px] border-white rounded-lg h-fit tab:p-6 des:p-8">
			<section className="flex items-center gap-4">
				<h1
					className={`${titilliumWeb.className} tab:text-2xl des:text-4xl font-semibold text-white`}
				>
					Dados {ambito}
				</h1>
				<CardDivider className="w-9" />
			</section>
			<section>
				<CardStatusItem
					titulo={"Parlamentares"}
					valor={dadosParlamentarProjetosEsfera?.parlamentares}
				/>
				<CardStatusItem
					titulo={"Projetos de Lei"}
					valor={dadosParlamentarProjetosEsfera?.projetosLei}
				/>
			</section>
			<section className="flex items-center gap-4">
				<h1
					className={`${titilliumWeb.className} tab:text-2xl des:text-4xl font-semibold text-white`}
				>
					Pautas
				</h1>
				<CardDivider className="w-9" />
			</section>
			<section>
				{dadosPautaEsfera.map((item) => (
					<CardStatusItem
						titulo={item.pauta}
						valor={item.valor}
						key={item.pauta}
					/>
				))}
			</section>
		</article>
	);
};

export default CardStatus;
