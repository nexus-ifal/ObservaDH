"use client";

import { useRouter } from "next/navigation";

import CardItemRenderizacao from "./card-item-renderizacao";

import { miniProjeto } from "@/core/domain/types/mini-projeto";

interface miniCardProjetosProps {
	miniProjeto: miniProjeto;
}

const CardMiniProjetos: React.FC<miniCardProjetosProps> = ({ miniProjeto }) => {
	const router = useRouter();

	const handleClick = () => {
		router.push(`/projetos/${miniProjeto.id}`);
	};
	return (
		<div
			className="flex items-center gap-4 w-[41.75rem] justify-between h-16 rounded-[10px] bg-[#4568BE] border-2 border-[#1A326E] cursor-pointer px-6 py-4 text-white font-medium"
			onClick={handleClick}
		>
			{["Número", "Ano", "Pauta"].map((titulo, index) => (
				<CardItemRenderizacao
					key={index}
					titulo={titulo}
					valor={
						titulo === "Número"
							? miniProjeto.ano
							: titulo === "Ano"
								? miniProjeto.numero
								: miniProjeto.pauta
					}
					corTexto="text-[#050B17]"
					corSegundoTexto="text-[#1A326E] text-xl"
					className="font-semibold"
				/>
			))}
		</div>
	);
};

export default CardMiniProjetos;
