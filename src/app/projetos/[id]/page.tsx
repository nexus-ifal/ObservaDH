"use client";

import { use, useMemo } from "react";

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
					className={`h-full w-full flex flex-col items-center gap-24 border-[#87D9FF] px-11 ${oswald.className}`}
				>
					<section className="flex flex-row">
						<Titulo pequeno="Dados" grande="da Proposta" />
					</section>

					<article className="flex flex-col bg-gradient-to-t from-[#2C52A4]/45 to-[#050B17]/45 w-11/12 min-h-[30rem] py-16 px-[4.5rem] gap-12 border-2 border-[#87D9FF] rounded-[10px]">
						<section className="flex flex-row gap-16 flex-wrap">
							{infos.map((info, index) => (
								<Card.RenderizacaoItem
									key={index}
									titulo={info.titulo}
									valor={info.valor}
									className="text-4xl"
									corTexto="text-[#87D9FF]"
								/>
							))}
						</section>
						<Topico titulo="Ementa">{projeto?.ementa}</Topico>
						<Topico titulo="Justificativa">{projeto?.justificativa}</Topico>
						<Topico
							titulo={pluralDireitos ? "Direitos Violados" : "Direito Violado"}
						>
							{projeto?.direitosViolados?.map((v, i) => (
								<p key={i}>{v.nome}</p>
							))}
						</Topico>
						<Topico titulo={pluralIdeologias ? "Ideologias" : "Ideologia"}>
							{projeto?.ideologias?.map((i, j) => (
								<p key={j}>{i.nome}</p>
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
}

const Topico: React.FC<TopicoProps> = ({ titulo, children }) => (
	<section className="flex flex-col gap-4">
		<h3 className="text-4xl text-[#87D9FF]">{titulo}:</h3>
		<div className="text-[#CDDBFF] text-3xl text-justify">{children}</div>
	</section>
);

export default Page;
