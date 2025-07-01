"use client";

import { Suspense } from "react";
import { MdOutlineFilterAlt } from "react-icons/md";

import { Button } from "@/components/external/ui-shacnui/button";
import Card from "@/components/ui/cards";
import CardLegenda from "@/components/ui/cards/card-legenda";
import Texto from "@/components/ui/componente-texto";
import DropdownButton from "@/components/ui/dropdown/dropdown-button";
import GraficoBarraEmpilhadaVertical from "@/components/ui/graficos/barra-empilhada-vertical";
import GraficoBarraMultiplas from "@/components/ui/graficos/barras-multiplas";
import MainLayout from "@/components/ui/layouts/main-layout";
import Loading from "@/components/ui/loading";
import Titulo from "@/components/ui/titulo-pages";

import {
	DadosIdeologiaGenero,
	DadosReligiaoRaca,
} from "@/core/domain/dtos/dados.dto";
import { elemento } from "@/core/domain/types/elemento-dropdown";
import { PartidoModel } from "@/core/domain/types/partido";
import { ProjetoLei } from "@/core/domain/types/projeto-lei";
import { useIdeologiaGenero } from "@/hooks/dados/use-ideologia-genero";
import { useReligiaoRaca } from "@/hooks/dados/use-religiao-raca";
import { legendas } from "@/content/content-parlamentares";
import { partidosMock, projetosMock } from "@/mocks/mock-projetos";
import contarPropostasPorParlamentar from "@/mocks/web/mock-utils/projeto-utils/contar-proposta-por-parlamentar";
import obterEsferasUnicas from "@/mocks/web/mock-utils/projeto-utils/obter-esferas-unicas";
import obterEstadosUnicos from "@/mocks/web/mock-utils/projeto-utils/obter-estados-unico";
import obterGeneroUnico from "@/mocks/web/mock-utils/projeto-utils/obter-genero-unico";
import obterIdeologiasUnica from "@/mocks/web/mock-utils/projeto-utils/obter-ideologias-unica";
import obterPartidosUnicos from "@/mocks/web/mock-utils/projeto-utils/obter-partidos-unicos";
import obterProfissoesUnicas from "@/mocks/web/mock-utils/projeto-utils/obter-profissoes-unicas";

const Page: React.FC = () => {
	const partidosOrdenados = [...partidosMock].sort(
		(a, b) => parseInt(b.propostas) - parseInt(a.propostas)
	);

	const esferas = obterEsferasUnicas({ projetos: projetosMock });
	const estados = obterEstadosUnicos({ projetos: projetosMock });
	const genero = obterGeneroUnico({ parlamentares: projetosMock });
	const partidos = obterPartidosUnicos({ projetos: projetosMock });
	const ideologias = obterIdeologiasUnica({ projetos: projetosMock });
	const profissoes = obterProfissoesUnicas({ projetos: projetosMock });

	const {
		ideologiaGenero,
		isLoadingIdeologiaGenero,
		error: errorIdeologiaGenero,
	} = useIdeologiaGenero();
	const {
		religiaoRaca,
		isLoadingReligiaoRaca,
		error: errorReligiaoRaca,
	} = useReligiaoRaca();

	const isLoading = isLoadingIdeologiaGenero || isLoadingReligiaoRaca;
	const error = !!(errorIdeologiaGenero || errorReligiaoRaca);

	const dropdownItems = [
		{ elementos: esferas, titulo: "Esfera" },
		{ elementos: estados, titulo: "Estado" },
		{ elementos: genero, titulo: "Gênero" },
		{ elementos: partidos, titulo: "Partidos" },
		{ elementos: ideologias, titulo: "Ideologia" },
		{ elementos: profissoes, titulo: "Profissão" },
	];

	return (
		<MainLayout>
			<div className="flex h-full w-full flex-col gap-24 items-center px-11">
				<Titulo pequeno={"Ranking"} grande={"dos Parlamentares"} />
				<RankingParlamentares
					projetos={projetosMock}
					itemsFiltro={dropdownItems}
				/>
				<RankingPartidos partidosOrdenados={partidosOrdenados} />
				<DadosEstatisticos
					error={error}
					isLoading={isLoading}
					religiaoPorRaca={religiaoRaca ?? []}
					legendas={legendas}
					ideologiaPorGenero={(ideologiaGenero as DadosIdeologiaGenero[]) ?? []}
				/>
			</div>
		</MainLayout>
	);
};

interface FiltroElementosProps {
	items: {
		elementos: elemento[];
		titulo: string;
	}[];
}

const Filtro = ({ items }: FiltroElementosProps) => (
	<section className="w-full flex items-center justify-start gap-24">
		<section className="flex gap-12 px-10">
			{items.map((item, index) => (
				<DropdownButton
					key={index}
					elementos={item.elementos}
					titulo={item.titulo}
					className="w-32"
				/>
			))}
		</section>
		<Button className="flex flex-row justify-center border-[#D974FD] text-[#D974FD] bg-transparent border-[1px] rounded-[3px] w-32 h-12 hover:bg-inherit active:text-white active:bg-[#D974FD] transition-colors duration-75">
			Filtrar <MdOutlineFilterAlt />
		</Button>
	</section>
);

interface RankingParlamentaresProps {
	projetos: ProjetoLei[];
	itemsFiltro: {
		elementos: elemento[];
		titulo: string;
	}[];
}

const RankingParlamentares = ({
	projetos,
	itemsFiltro,
}: RankingParlamentaresProps) => (
	<article className="flex flex-col w-full gap-20">
		<Suspense fallback={<div>Carregando filtros...</div>}>
			<Filtro items={itemsFiltro} />
		</Suspense>
		<div className="flex flex-col gap-10 justify-center">
			<div className="flex flex-row w-full px-16 h-[4.25rem] bg-[#122144] border border-b-0 border-[#87D9FF] rounded-t-[5px] font-semibold text-2xl text-[#87D9FF]">
				<section className="w-1/2 h-full px-16 grid grid-cols-2 gap-4 items-center">
					<p>{"Deputado(a)"}</p>
					<p>{"Nome"}</p>
				</section>
				<section className="w-1/2 h-full px-12 grid grid-cols-3 gap-4 items-center">
					<p>{"Partido"}</p>
					<p>{"Estado"}</p>
					<p>{"Propostas"}</p>
				</section>
			</div>
			<div
				className="h-[800px] w-full rounded-md flex flex-col items-center gap-10 overflow-auto"
				color="black"
			>
				{projetos.map((item) =>
					item.parlamentares.map((parlamentar) => (
						<Card.ComponenteParlamentar
							key={`${item.numeroPl}-${parlamentar.nome}`}
							parlamentar={parlamentar}
							propostas={contarPropostasPorParlamentar(
								projetos,
								parlamentar.nome
							)}
						/>
					))
				)}
			</div>
		</div>
	</article>
);

interface RankingPartidosProps {
	partidosOrdenados: PartidoModel[];
}

const RankingPartidos = ({ partidosOrdenados }: RankingPartidosProps) => (
	<article className="flex flex-col w-full gap-20">
		<div className="w-full text-shadow-xl text-7xl text-white text-center">
			<Texto.Raiz>
				<Texto.Pequeno.Titillium>Ranking</Texto.Pequeno.Titillium>
				<Texto.Espaco />
				<Texto.Forte.Oswald>dos Partidos</Texto.Forte.Oswald>
			</Texto.Raiz>
		</div>
		<div className="flex flex-col gap-10 justify-center">
			<div className="flex flex-row w-full px-16 h-[4.25rem] bg-[#122144] border border-b-0 border-[#87D9FF] rounded-t-[5px] font-semibold text-2xl text-[#87D9FF]">
				<section className="w-1/2 h-full px-16 grid grid-cols-2 gap-4 items-center">
					<p>{"Partido"}</p>
					<p>{"Nome"}</p>
				</section>
				<section className="w-1/2 h-full px-12 grid grid-cols-3 gap-4 items-center">
					<p className="text-center">{"Sigla"}</p>
					<p>{"Parlamentares"}</p>
					<p>{"Propostas"}</p>
				</section>
			</div>
			<div
				className="h-[800px] w-full rounded-md flex flex-col items-center gap-10 overflow-auto"
				color="black"
			>
				{partidosOrdenados.map((item) => (
					<Card.ComponentePartido
						key={`${item.nome}-${item.sigla}`}
						partido={item}
					/>
				))}
			</div>
		</div>
	</article>
);

interface DadosEstatisticosProps {
	error: boolean;
	religiaoPorRaca: DadosReligiaoRaca[];
	ideologiaPorGenero: DadosIdeologiaGenero[];
	isLoading: boolean;
	legendas: {
		texto: string;
		corTexto: string;
		resumo: string;
	}[];
}

const DadosEstatisticos = ({
	error,
	isLoading,
	religiaoPorRaca,
	ideologiaPorGenero,
	legendas,
}: DadosEstatisticosProps) => (
	<article className="flex flex-col justify-center gap-20">
		<Texto.Raiz className="text-7xl text-shadow-xl text-white text-center">
			<Texto.Pequeno.Oswald>Dados Estatísticos</Texto.Pequeno.Oswald>
		</Texto.Raiz>
		{error && (
			<Texto.Raiz className="text-2xl text-red-500 text-center">
				Ocorreu um erro ao carregar os dados.
			</Texto.Raiz>
		)}
		{isLoading ? (
			<Loading />
		) : (
			<div className="flex flex-col gap-20">
				<section className="flex justify-center gap-20">
					<GraficoBarraMultiplas dados={ideologiaPorGenero ?? []} />
					<Card.Legenda
						texto={legendas[0].texto}
						corTexto={legendas[0].corTexto}
						resumo={legendas[0].resumo}
					>
						<Texto.Raiz className="text-5xl w-full">
							<Texto.Linha>
								<Texto.Forte.Oswald>{"Ideologia Política"}</Texto.Forte.Oswald>
							</Texto.Linha>
							<Texto.Linha>
								<Texto.Pequeno.Titillium className="text-[#D974FD]">
									{"x Gênero"}
								</Texto.Pequeno.Titillium>
							</Texto.Linha>
						</Texto.Raiz>
					</Card.Legenda>
				</section>
				<section className="flex justify-center gap-20">
					<CardLegenda
						texto={legendas[1].texto}
						corTexto={legendas[1].corTexto}
						resumo={legendas[1].resumo}
					>
						<Texto.Raiz className="text-5xl w-full">
							<Texto.Linha>
								<Texto.Forte.Oswald>{"Religião"}</Texto.Forte.Oswald>
							</Texto.Linha>
							<Texto.Linha>
								<Texto.Pequeno.Titillium className="text-[#FF977A]">
									{"x Raça"}
								</Texto.Pequeno.Titillium>
							</Texto.Linha>
						</Texto.Raiz>
					</CardLegenda>
					<GraficoBarraEmpilhadaVertical dados={religiaoPorRaca ?? []} />
				</section>
			</div>
		)}
	</article>
);

export default Page;
