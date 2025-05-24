"use client";

import { useParams } from "next/navigation";

import Card from "@/components/ui/cards";
import MainLayout from "@/components/ui/layouts/main-layout";
import Titulo from "@/components/ui/titulo-pages";

import { oswald } from "@/core/lib/fonts/fonts";
import { buscarProjetoPorId } from "@/core/lib/web/mock-utils/busca";
import { ProjetoLei } from "@/core/domain/graficos/types/projeto-lei";

const page = () => {
	const { id } = useParams();

	const projeto = buscarProjetoPorId(
		Array.isArray(id) ? (id[0] ?? "") : (id ?? "")
	) as ProjetoLei;

	const parlamentarNomes = projeto.parlamentares.map((p) => p.nome).join(", ");
	const partidos = projeto.parlamentares.map((p) => p.partido).join(", ");
	const esfera = projeto.parlamentares[0].esfera;

	const infos = [
		{
			titulo: "Número",
			valor: projeto.numeroPl,
		},
		{ titulo: "Ano", valor: projeto.ano },
		{
			titulo: "Esfera",
			valor: esfera,
		},
		{
			titulo: "Pauta",
			valor: projeto.pauta,
		},
		{
			titulo: projeto.parlamentares.length > 1 ? "Proponentes" : "Proponente",
			valor: parlamentarNomes,
		},
		{
			titulo: projeto.parlamentares.length > 1 ? "Partidos" : "Partido",
			valor: partidos,
		},
	];

	//render
	return (
		<MainLayout>
			<div
				className={`h-full w-full flex flex-col items-center gap-24 border-[#87D9FF] px-11 ${oswald.className}`}
			>
				<section>
					<Titulo pequeno={"Dados"} grande={"da Proposta"} />
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
					<Topico titulo="Ementa">{projeto.ementa}</Topico>
					<Topico titulo="Justificativa">{projeto.justificativa}</Topico>
					<Topico
						titulo={
							projeto.violacoes.length > 1
								? "Direitos Violados"
								: "Direito Violado"
						}
					>
						{projeto.violacoes.map((v, i) => (
							<p key={i}>{v}</p>
						))}
					</Topico>
					<Topico
						titulo={projeto.ideologia.length > 1 ? "Ideologias" : "Ideologia"}
					>
						{projeto.ideologia.map((i, j) => (
							<p key={j}>{i}</p>
						))}
					</Topico>
				</article>
			</div>
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

export default page;
