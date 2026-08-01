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
		<article className="flex flex-col border-l border-white h-fit">
			<SectionBlock titulo={`Dados ${ambito}`}>
				<CardStatusItem
					titulo="Parlamentares"
					valor={dadosParlamentarProjetosEsfera?.parlamentares}
				/>
				<CardStatusItem
					titulo="Projetos de Lei"
					valor={dadosParlamentarProjetosEsfera?.projetosLei}
				/>
			</SectionBlock>

			<div className="border-t border-white/15" />

			<SectionBlock titulo="Pautas">
				{dadosPautaEsfera.map((item) => (
					<CardStatusItem
						titulo={item.pauta}
						valor={item.valor}
						key={item.pauta}
					/>
				))}
			</SectionBlock>
		</article>
	);
};

function SectionBlock({
	titulo,
	children,
}: {
	titulo: string;
	children: React.ReactNode;
}) {
	return (
		<section className="flex flex-col gap-3 tab:gap-4 p-4 tab:p-6 des:p-8">
			<header className="flex items-center gap-3">
				<h2
					className={`${titilliumWeb.className} text-xl tab:text-2xl des:text-3xl font-semibold text-white leading-none`}
				>
					{titulo}
				</h2>
				<CardDivider className="w-9" />
			</header>
			<div className="flex flex-col">{children}</div>
		</section>
	);
}

export default CardStatus;
