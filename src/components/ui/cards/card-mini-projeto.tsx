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
			className="flex flex-row items-center gap-1 tab:gap-4 w-[16rem] tab:w-[41.75rem] justify-between h-fit tab:h-16 rounded-sm bg-[#4568BE] border-2 border-[#1A326E] cursor-pointer p-4 tab:px-6 tab:py-4 text-sm text-white font-medium"
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
					corSegundoTexto="text-[#1A326E] text-sm tab:text-xl"
					className="font-semibold"
				/>
			))}
		</div>
	);
};

export default CardMiniProjetos;
