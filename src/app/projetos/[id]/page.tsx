"use client";

import { use, useMemo } from "react";
import { LuMousePointerClick } from "react-icons/lu";

import Card from "@/components/ui/cards";
import MainLayout from "@/components/ui/layouts/main-layout";
import Loading from "@/components/ui/loading";
import Titulo from "@/components/ui/titulo-pages";
import UserError from "@/components/ui/user-erro";

import { oswald } from "../../../fonts/fonts";

import { useProjetoFetch } from "@/hooks/projeto/use-projeto-fetch";

interface PageProps {
	params: Promise<{ id: string }>;
}

const Page: React.FC<PageProps> = ({ params }) => {
	const { id } = use(params);
	const { projeto, isLoadingProjeto, error } = useProjetoFetch(id);

	const parlamentarNomes = useMemo(
		() => projeto?.autores?.map((p) => p.nome).join(", ") || "Desconhecido",
		[projeto?.autores]
	);

	const partidos = useMemo(() => {
		if (!projeto?.autores?.length) return "Desconhecido";
		const partidosUnicos = projeto.autores
			.map((p) =>
				p.partido && p.partido.sigla && p.partido.nome
					? `${p.partido.sigla} (${p.partido.nome})`
					: null
			)
			.filter(Boolean);

		return [...new Set(partidosUnicos)].join(", ") || "Desconhecido";
	}, [projeto?.autores]);

	const esfera = projeto?.esfera?.nome || "Desconhecida";
	const pluralAutores = (projeto?.autores?.length ?? 0) > 1;
	const pluralDireitos = (projeto?.direitosViolados?.length ?? 0) > 1;
	const pluralIdeologias = (projeto?.ideologias?.length ?? 0) > 1;

	const infos = useMemo(
		() => [
			{ titulo: "Número", valor: projeto?.numeroPl },
			{ titulo: "Ano", valor: projeto?.ano },
			{ titulo: "Esfera", valor: esfera },
			{ titulo: "Pauta", valor: projeto?.pauta?.nome },
			{
				titulo: pluralAutores ? "Proponentes" : "Proponente",
				valor: parlamentarNomes,
			},
			{
				titulo: pluralAutores ? "Partidos" : "Partido",
				valor: partidos,
			},
		],
		[projeto, esfera, partidos, parlamentarNomes, pluralAutores]
	);

	return (
		<MainLayout>
			{error && <UserError error={error} />}
			{isLoadingProjeto ? (
				<Loading />
			) : (
				<div
					className={`h-fit w-fit flex flex-col justify-center items-center gap-8 tab:gap-16 des:gap-24 border-white mx-2 tab:mx-8 des:mx-14 ${oswald.className}`}
				>
					<section className="flex flex-row text-center">
						<Titulo pequeno="Dados" grande="da Proposta" />
					</section>

					<article className="flex flex-col bg-gradient-to-t from-[#2C52A4]/45 to-[#050B17]/45 w-full min-h-[30rem] p-4 tab:p-12 des:py-16 des:px-[4.5rem] gap-4 tab:gap-8 des:gap-12 border-2 border-white rounded-sm">
						<section className="grid grid-cols-2 des:grid-cols-3 gap-4 tab:gap-8 des:gap-16 flex-wrap">
							{infos.map((info, index) => (
								<Card.RenderizacaoItem
									key={index}
									titulo={info.titulo}
									valor={info.valor}
									className="text-sm tab:text-xl des:text-4xl"
									corTexto="text-[#87D9FF]"
								/>
							))}
						</section>
						<Topico titulo="Ementa">{projeto?.ementa}</Topico>
						<Topico titulo="Justificativa" className="flex flex-row gap-4">
							<a
								href={projeto?.justificativa}
								className="text-sky-500 underline transition-colors duration-200 hover:text-[#93F996] flex gap-1"
							>
								{"Justificativa"}
								<LuMousePointerClick />
							</a>
						</Topico>
						<Topico
							titulo={pluralDireitos ? "Direitos Violados" : "Direito Violado"}
						>
							{projeto?.direitosViolados?.map((v, i) => (
								<p className="after:content-['+'] after:text-[#93F996]" key={i}>
									{v.nome}{" "}
								</p>
							))}
						</Topico>
						<Topico titulo={pluralIdeologias ? "Ideologias" : "Ideologia"}>
							{projeto?.ideologias?.map((i, j) => (
								<p key={j} className="after:content-['+'] after:text-[#93F996]">
									{i.nome}{" "}
								</p>
							))}
						</Topico>
					</article>
				</div>
			)}
		</MainLayout>
	);
};

interface TopicoProps {
	titulo: string;
	children?: React.ReactNode;
	className?: string;
}
const Topico: React.FC<TopicoProps> = ({ titulo, children }) => (
	<section className="flex flex-col gap-1 tab:gap-2 des:gap-4">
		<h3 className="text-sm tab:text-xl des:text-4xl text-[#87D9FF]">
			{titulo}:
		</h3>
		<div className="text-[#CDDBFF] text-sm tab:text-lg des:text-3xl text-justify w-[300px] tab:w-[600px] des:w-full">
			{children}
		</div>
	</section>
);

export default Page;
