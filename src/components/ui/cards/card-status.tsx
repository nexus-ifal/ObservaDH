import React from "react";

import { StatusType } from "@/domain/graficos/types/status";

import { titilliumWeb } from "../../../core/lib/fonts/fonts";

import CardDivider from "./card-divider";
import CardStatusItem from "./card-status-item";

interface StatusCardProps {
	status: StatusType;
}

const CardStatus: React.FC<StatusCardProps> = ({ status }) => {
	return (
		<article className="flex flex-col gap-4 border-l-[1px] border-white rounded-lg h-[20.75rem] p-8">
			<section className="flex items-center justify-center gap-4">
				<h1
					className={`${titilliumWeb.className} text-4xl font-semibold text-white`}
				>
					Dados Nacionais
				</h1>
				<CardDivider className="w-9" />
			</section>
			<section>
				{status.dados.dados.map((item) => (
					<CardStatusItem
						titulo={item.titulo}
						valor={item.valor}
						key={item.titulo}
					/>
				))}
			</section>
			<section className="flex items-center gap-4">
				<h1
					className={`${titilliumWeb.className} text-4xl font-semibold text-white`}
				>
					Pautas
				</h1>
				<CardDivider className="w-9" />
			</section>
			<section>
				{status.pautas.pautas.map((item) => (
					<CardStatusItem
						titulo={item.titulo}
						valor={item.valor}
						key={item.titulo}
					/>
				))}
			</section>
		</article>
	);
};

export default CardStatus;
