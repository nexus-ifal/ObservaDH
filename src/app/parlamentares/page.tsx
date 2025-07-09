"use client";

import { JSX, Suspense, useMemo, useState } from "react";
import { MdOutlineFilterAlt } from "react-icons/md";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

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

import { legendas } from "@/content/content-parlamentares";
import {
	DadosIdeologiaGenero,
	DadosParaPesquisaParlamenta,
	DadosReligiaoRaca,
} from "@/core/domain/dtos/dados.dto";
import { ResponsePoliticoDTO } from "@/core/domain/dtos/politico.dto";
import { elemento } from "@/core/domain/types/elemento-dropdown";
import { PartidoModel } from "@/core/domain/types/partido";
import { useIdeologiaGenero } from "@/hooks/dados/use-ideologia-genero";
import { useReligiaoRaca } from "@/hooks/dados/use-religiao-raca";
import { useEstado } from "@/hooks/estado/use-estado";
import { usePartido } from "@/hooks/partido/use-partido";
import { usePoliticoFiltrados } from "@/hooks/politico/use-politico-filtrados";
import { useProfissao } from "@/hooks/profissao/use-profissao";
import { partidosMock } from "@/mocks/mock-projetos";
import UserError from "@/components/ui/user-erro";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";
import { ChevronsUpDown } from "lucide-react";

const Page = () => {
	return (
		<Suspense fallback={<Loading />}>
			<PageContent />
		</Suspense>
	);
};

const PageContent: React.FC = () => {
	const partidosOrdenados = useMemo(
		() =>
			[...partidosMock].sort(
				(a, b) => parseInt(b.propostas) - parseInt(a.propostas)
			),
		[]
	);

	const searchParams = useSearchParams();

	const esferaURL = searchParams.get("esfera") || "";
	const estadoURL = searchParams.get("estado") || "";
	const generoURL = searchParams.get("genero") || "";
	const partidoURL = searchParams.get("partido") || "";
	const ideologiaURL = searchParams.get("ideologia") || "";
	const profissaoURL = searchParams.get("profissao") || "";
	const ordenacaoProjetosURL = searchParams.get("ordenacaoProjetos") || "";

	const [filtros, setFiltros] = useState({
		esfera: esferaURL,
		estado: estadoURL,
		genero: generoURL,
		partido: partidoURL,
		ideologia: ideologiaURL,
		profissao: profissaoURL,
		ordenacaoProjetos: ordenacaoProjetosURL,
	});

	const [filtrosAplicados, setFiltrosAplicados] = useState({
		esfera: esferaURL,
		estado: estadoURL,
		genero: generoURL,
		partido: partidoURL,
		ideologia: ideologiaURL,
		profissao: profissaoURL,
		ordenacaoProjetos: ordenacaoProjetosURL,
	});

	const router = useRouter();
	const pathname = usePathname();

	function handleFiltroChange(param: string, value: string) {
		setFiltros((prev) => ({
			...prev,
			[param]: value,
		}));
	}

	function aplicarFiltros(filtrosNovos = filtros) {
		setFiltrosAplicados(filtrosNovos);
		const params = new URLSearchParams();
		Object.entries(filtrosNovos).forEach(([key, value]) => {
			if (value && value !== "geral") {
				params.set(key, value);
			}
		});
		router.replace(`${pathname}?${params.toString()}`, { scroll: false });
	}

	function handleClick() {
		let nextOrd: string;
		if (!filtros.ordenacaoProjetos) {
			nextOrd = "asc";
		} else if (filtros.ordenacaoProjetos === "asc") {
			nextOrd = "desc";
		} else {
			nextOrd = "";
		}

		const novosFiltros = {
			...filtros,
			ordenacaoProjetos: nextOrd,
		};
		setFiltros(novosFiltros);
		aplicarFiltros(novosFiltros);
	}

	function getSortIcon() {
		const current = searchParams.get("ordenacaoProjetos");
		if (current === "asc") {
			return <FaChevronDown className="w-5" />;
		} else if (current === "desc") {
			return <FaChevronUp  className="w-5" />;
		} else {
			return <ChevronsUpDown className="w-6 h-8" />;
		}
	}
	const { estados, isLoadingEstados, error: errorEstado } = useEstado();
	const { partidos, isLoadingPartidos, error: errorPartido } = usePartido();
	const {
		profissoes,
		isLoadingProfissoes,
		error: errorProfissao,
	} = useProfissao();
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

	const {
		politicosFiltrados,
		isLoadingPoliticosFiltrados,
		error: errorPoliticoFiltrados,
	} = usePoliticoFiltrados({
		esfera: filtrosAplicados.esfera,
		estado: filtrosAplicados.estado,
		genero: filtrosAplicados.genero,
		partido: filtrosAplicados.partido,
		ideologia: filtrosAplicados.ideologia,
		profissao: filtrosAplicados.profissao,
		ordenacaoProjetos: filtrosAplicados.ordenacaoProjetos,
	} as DadosParaPesquisaParlamenta);

	const esferas = useMemo(
		() => [
			{
				titulo: "Federal",
				value: "federal",
			},
			{
				titulo: "Estadual",
				value: "estadual",
			},
		],
		[]
	);

	const generos = useMemo(
		() => [
			{
				titulo: "Masculino",
				value: "Masculino",
			},
			{
				titulo: "Feminino",
				value: "Feminino",
			},
		],
		[]
	);

	const dropdownItems = useMemo(
		() => [
			{ elementos: esferas, titulo: "Esfera", param: "esfera" },
			{
				elementos:
					estados?.map((estado) => ({
						titulo: estado.nome,
						value: estado.sigla,
					})) ?? [],
				titulo: "Estado",
				param: "estado",
			},
			{ elementos: generos, titulo: "Gênero", param: "genero" },
			{
				elementos:
					partidos?.map((partido) => ({
						titulo: partido.nome,
						value: partido.sigla,
					})) ?? [],
				titulo: "Partidos",
				param: "partido",
			},
			{
				elementos:
					profissoes?.map((profissao) => ({
						titulo: profissao.nome,
						value: profissao.nome,
					})) ?? [],
				titulo: "Profissão",
				param: "profissao",
			},
		],
		[esferas, estados, generos, partidos, profissoes]
	);

	const isLoadingFiltros =
		isLoadingEstados ||
		isLoadingPartidos ||
		isLoadingProfissoes ||
		isLoadingReligiaoRaca ||
		isLoadingIdeologiaGenero;

	const error = [
		errorEstado,
		errorPartido,
		errorProfissao,
		errorReligiaoRaca,
		errorIdeologiaGenero,
		errorPoliticoFiltrados,
	].some(Boolean);

	return (
		<MainLayout>
			<div className="flex h-full w-full flex-col gap-24 items-center px-4 sm:px-11">
				<Titulo pequeno={"Ranking"} grande={"dos Parlamentares"} />
				<RankingParlamentares
					handleClick={handleClick}
					dadosParlamentares={politicosFiltrados ?? []}
					itemsFiltro={dropdownItems}
					isLoadingFiltros={isLoadingFiltros}
					isLoadingDados={isLoadingPoliticosFiltrados}
					filtros={filtros}
					onFiltroChange={handleFiltroChange}
					aplicarFiltros={aplicarFiltros}
					getSortIcon={getSortIcon}
				/>
				<RankingPartidos partidosOrdenados={partidosOrdenados} />
				<DadosEstatisticos
					errorIdeologiaGenero={errorIdeologiaGenero}
					errorReligiaoRaca={errorReligiaoRaca}
					isLoadingIdeologiaGenero={isLoadingIdeologiaGenero}
					isLoadingReligiaoRaca={isLoadingReligiaoRaca}
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
		param: string;
	}[];
	isLoading?: boolean;
	filtros: Record<string, string>;
	onFiltroChange: (param: string, value: string) => void;
	aplicarFiltros: () => void;
}

const Filtro = ({
	items,
	isLoading,
	filtros,
	onFiltroChange,
	aplicarFiltros,
}: FiltroElementosProps) => (
	<>
		{isLoading ? (
			<Loading />
		) : (
			<section className="w-full flex flex-col sm:flex-row items-center justify-start gap-8 sm:gap-24">
				<section className="flex flex-wrap gap-4 sm:gap-12 px-0 sm:px-10">
					{items.map((item, index) => (
						<DropdownButton
							key={item.param + index}
							param={item.param}
							elementos={item.elementos}
							titulo={item.titulo}
							className="w-40"
							classNameContent="min-h-40"
							value={filtros[item.param] || ""}
							onChange={(v) => onFiltroChange(item.param, v)}
							autoApply={false}
						/>
					))}
				</section>
				<Button
					className="flex flex-row justify-center border-[#D974FD] text-[#D974FD] bg-transparent border-[1px] rounded-[3px] w-32 h-12 hover:bg-inherit active:text-white active:bg-[#D974FD] transition-colors duration-75 mt-4 sm:mt-0"
					onClick={aplicarFiltros}
				>
					Filtrar <MdOutlineFilterAlt />
				</Button>
			</section>
		)}
	</>
);

interface RankingParlamentaresProps {
	dadosParlamentares: ResponsePoliticoDTO[];
	isLoadingFiltros: boolean;
	isLoadingDados: boolean;
	filtros: Record<string, string>;
	onFiltroChange: (param: string, value: string) => void;
	aplicarFiltros: () => void;
	getSortIcon: () => JSX.Element;
	handleClick: () => void;
	itemsFiltro: {
		elementos: elemento[];
		titulo: string;
		param: string;
	}[];
}

const RankingParlamentares = ({
	dadosParlamentares,
	itemsFiltro,
	isLoadingFiltros,
	getSortIcon,
	handleClick,
	isLoadingDados,
	filtros,
	onFiltroChange,
	aplicarFiltros,
}: RankingParlamentaresProps) => (
	<article className="flex flex-col w-full gap-12 sm:gap-20">
		<Filtro
			items={itemsFiltro}
			isLoading={isLoadingFiltros}
			filtros={filtros}
			onFiltroChange={onFiltroChange}
			aplicarFiltros={aplicarFiltros}
		/>
		<div className="flex flex-col gap-6 sm:gap-10 justify-center">
			<div className="flex flex-row w-full px-2 sm:px-16 h-14 sm:h-[4.25rem] bg-[#122144] border border-b-0 border-[#87D9FF] rounded-t-[5px] font-semibold text-lg sm:text-2xl text-[#87D9FF]">
				<section className="w-1/2 h-full px-2 sm:px-16 grid grid-cols-2 gap-2 sm:gap-4 items-center">
					<p>{"Deputado(a)"}</p>
					<p>{"Nome"}</p>
				</section>
				<section className="w-1/2 h-full px-2 sm:px-12 grid grid-cols-3 gap-2 sm:gap-4 items-center">
					<p>{"Partido"}</p>
					<p>{"Estado"}</p>
					<FiltrarPropostas
						handleClick={handleClick}
						getSortIcon={getSortIcon}
					/>
				</section>
			</div>
			<div
				className="min-h-96 max-h-96 sm:min-h-[400px] sm:max-h-[800px] w-full rounded-md flex flex-col items-center gap-6 sm:gap-10 overflow-auto"
				color="black"
			>
				{dadosParlamentares.map((parlamentar, i) => (
					<Card.ComponenteParlamentar
						key={`${i}`}
						parlamentar={parlamentar}
						propostas={parlamentar.numeroProjetos || 0}
					/>
				))}
			</div>
		</div>
	</article>
);

interface RankingPartidosProps {
	partidosOrdenados: PartidoModel[];
}

const RankingPartidos = ({ partidosOrdenados }: RankingPartidosProps) => (
	<article className="flex flex-col w-full gap-12 sm:gap-20">
		<div className="w-full text-shadow-xl text-5xl sm:text-7xl text-white text-center">
			<Texto.Raiz>
				<Texto.Pequeno.Titillium>Ranking</Texto.Pequeno.Titillium>
				<Texto.Espaco />
				<Texto.Forte.Oswald>dos Partidos</Texto.Forte.Oswald>
			</Texto.Raiz>
		</div>
		<div className="flex flex-col gap-6 sm:gap-10 justify-center">
			<div className="flex flex-row w-full px-2 sm:px-16 h-14 sm:h-[4.25rem] bg-[#122144] border border-b-0 border-[#87D9FF] rounded-t-[5px] font-semibold text-lg sm:text-2xl text-[#87D9FF]">
				<section className="w-1/2 h-full px-2 sm:px-16 grid grid-cols-2 gap-2 sm:gap-4 items-center">
					<p>{"Partido"}</p>
					<p>{"Nome"}</p>
				</section>
				<section className="w-1/2 h-full px-2 sm:px-12 grid grid-cols-3 gap-2 sm:gap-4 items-center">
					<p className="text-center">{"Sigla"}</p>
					<p>{"Parlamentares"}</p>
					<p>{"Propostas"}</p>
				</section>
			</div>
			<div
				className="h-96 sm:h-[800px] w-full rounded-md flex flex-col items-center gap-6 sm:gap-10 overflow-auto"
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
	errorIdeologiaGenero: Error | string | null;
	errorReligiaoRaca: Error | string | null;
	religiaoPorRaca: DadosReligiaoRaca[];
	ideologiaPorGenero: DadosIdeologiaGenero[];
	isLoadingReligiaoRaca: boolean;
	isLoadingIdeologiaGenero: boolean;
	legendas: {
		texto: string;
		corTexto: string;
		resumo: string;
	}[];
}

const DadosEstatisticos = ({
	errorIdeologiaGenero,
	errorReligiaoRaca,
	isLoadingIdeologiaGenero,
	isLoadingReligiaoRaca,
	religiaoPorRaca,
	ideologiaPorGenero,
	legendas,
}: DadosEstatisticosProps) => (
	<article className="flex flex-col justify-center gap-12 sm:gap-20">
		<Texto.Raiz className="text-5xl sm:text-7xl text-shadow-xl text-white text-center">
			<Texto.Pequeno.Oswald>Dados Estatísticos</Texto.Pequeno.Oswald>
		</Texto.Raiz>
		<div className="flex flex-col gap-12 sm:gap-20">
			<section className="flex flex-col sm:flex-row justify-center gap-12 sm:gap-20">
				{errorIdeologiaGenero && <UserError error={errorIdeologiaGenero} />}
				{isLoadingIdeologiaGenero ? (
					<Loading />
				) : (
					<>
						<GraficoBarraMultiplas dados={ideologiaPorGenero ?? []} />
						<Card.Legenda
							texto={legendas[0].texto}
							corTexto={legendas[0].corTexto}
							resumo={legendas[0].resumo}
						>
							<Texto.Raiz className="text-3xl sm:text-5xl w-full">
								<Texto.Linha>
									<Texto.Forte.Oswald>
										{"Ideologia Política"}
									</Texto.Forte.Oswald>
								</Texto.Linha>
								<Texto.Linha>
									<Texto.Pequeno.Titillium className="text-[#D974FD]">
										{"x Gênero"}
									</Texto.Pequeno.Titillium>
								</Texto.Linha>
							</Texto.Raiz>
						</Card.Legenda>
					</>
				)}
			</section>

			<section className="flex flex-col sm:flex-row justify-center gap-12 sm:gap-20">
				{errorReligiaoRaca && <UserError error={errorReligiaoRaca} />}
				{isLoadingReligiaoRaca ? (
					<Loading />
				) : (
					<>
						<CardLegenda
							texto={legendas[1].texto}
							corTexto={legendas[1].corTexto}
							resumo={legendas[1].resumo}
						>
							<Texto.Raiz className="text-3xl sm:text-5xl w-full">
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
					</>
				)}
			</section>
		</div>
	</article>
);

export default Page;

interface FiltrarPropostasProps {
	getSortIcon: () => JSX.Element;
	handleClick: () => void;
}

const FiltrarPropostas: React.FC<FiltrarPropostasProps> = ({
	getSortIcon,
	handleClick,
}) => (
	<button onClick={() => handleClick()}>
		<p className="text-center flex gap-2 items-center">
			{"Propostas"}
			{getSortIcon()}
		</p>
	</button>
);
