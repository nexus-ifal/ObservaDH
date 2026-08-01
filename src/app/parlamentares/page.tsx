/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { JSX, Suspense, useMemo, useState } from "react";
import { FaChevronDown, FaChevronUp, FaTrash } from "react-icons/fa6";
import { MdOutlineFilterAlt } from "react-icons/md";
import { motion } from "framer-motion";
import { ChevronsUpDown } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Button } from "@/components/external/ui-shacnui/button";
import Card from "@/components/ui/cards";
import CardLegenda from "@/components/ui/cards/card-legenda";
import DropdownButton from "@/components/ui/dropdown/dropdown-button";
import GraficoBarraEmpilhadaVertical from "@/components/ui/graficos/barra-empilhada-vertical";
import GraficoBarraMultiplas from "@/components/ui/graficos/barras-multiplas";
import MainLayout from "@/components/ui/layouts/main-layout";
import Loading from "@/components/ui/loading";
import Texto from "@/components/ui/texto";
import Titulo from "@/components/ui/titulo-pages";
import UserError from "@/components/ui/user-erro";

import { legendasGraficosParlamentares } from "@/content/content-parlamentares";
import { LegendaGrafico } from "@/content/models";
import {
	DadosIdeologiaGenero,
	DadosParaPesquisaParlamenta,
	DadosReligiaoRaca,
	PartidoRankingDTO,
} from "@/core/domain/dtos/dados.dto";
import { ResponsePoliticoDTO } from "@/core/domain/dtos/politico.dto";
import { elemento } from "@/core/domain/types/elemento-dropdown";
import { useIdeologiaGenero } from "@/hooks/dados/use-ideologia-genero";
import { useRankingPartidos } from "@/hooks/dados/use-ranking-partidos";
import { useReligiaoRaca } from "@/hooks/dados/use-religiao-raca";
import { useEstado } from "@/hooks/estado/use-estado";
import { usePartido } from "@/hooks/partido/use-partido";
import { usePoliticoFiltrados } from "@/hooks/politico/use-politico-filtrados";
import { useProfissao } from "@/hooks/profissao/use-profissao";

//render
const Page: React.FC = () => {
	return (
		<Suspense fallback={<Loading />}>
			<PageContent />
		</Suspense>
	);
};

export default Page;

const PageContent: React.FC = () => {
	const searchParams = useSearchParams();

	const esferaURL = searchParams.get("esferaId") || "";
	const estadoURL = searchParams.get("estadoId") || "";
	const generoURL = searchParams.get("generoId") || "";
	const partidoURL = searchParams.get("partidoId") || "";
	const ideologiaURL = searchParams.get("ideologiaId") || "";
	const profissaoURL = searchParams.get("profissaoId") || "";
	const ordenacaoProjetosURL = searchParams.get("ordenacaoProjetosId") || "";

	const [filtros, setFiltros] = useState({
		esferaId: esferaURL,
		estadoId: estadoURL,
		generoId: generoURL,
		partidoId: partidoURL,
		ideologiaId: ideologiaURL,
		profissaoId: profissaoURL,
		ordenacaoProjetosId: ordenacaoProjetosURL,
	});

	const [filtrosAplicados, setFiltrosAplicados] = useState({
		esferaId: esferaURL,
		estadoId: estadoURL,
		generoId: generoURL,
		partidoId: partidoURL,
		ideologiaId: ideologiaURL,
		profissaoId: profissaoURL,
		ordenacaoProjetosId: ordenacaoProjetosURL,
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
		if (!filtros.ordenacaoProjetosId) {
			nextOrd = "asc";
		} else if (filtros.ordenacaoProjetosId === "asc") {
			nextOrd = "desc";
		} else {
			nextOrd = "";
		}

		const novosFiltros = {
			...filtros,
			ordenacaoProjetosId: nextOrd,
		};

		setFiltros(novosFiltros);
		aplicarFiltros(novosFiltros);
	}

	function getSortIcon() {
		const current = searchParams.get("ordenacaoProjetosId");
		if (current === "asc") {
			return <FaChevronDown className="w-5" />;
		} else if (current === "desc") {
			return <FaChevronUp className="w-5" />;
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
		esfera: filtrosAplicados.esferaId,
		estado: filtrosAplicados.estadoId,
		genero: filtrosAplicados.generoId,
		partido: filtrosAplicados.partidoId,
		ideologia: filtrosAplicados.ideologiaId,
		profissao: filtrosAplicados.profissaoId,
		ordenacaoProjetos: filtrosAplicados.ordenacaoProjetosId,
	} as DadosParaPesquisaParlamenta);

	const esferas = useMemo(
		() => [
			{ titulo: "Federal", value: "federal" },
			{ titulo: "Estadual", value: "estadual" },
		],
		[]
	);

	const generos = useMemo(
		() => [
			{ titulo: "Masculino", value: "Masculino" },
			{ titulo: "Feminino", value: "Feminino" },
		],
		[]
	);

	const dropdownItems = useMemo(
		() => [
			{ elementos: esferas, titulo: "Esfera", param: "esferaId" },
			{
				elementos:
					estados?.map((estado) => ({
						titulo: estado.nome,
						value: estado.id,
					})) ?? [],
				titulo: "Estado",
				param: "estadoId",
			},
			{ elementos: generos, titulo: "Gênero", param: "generoId" },
			{
				elementos:
					partidos?.map((partido) => ({
						titulo: partido.nome,
						value: partido.id,
					})) ?? [],
				titulo: "Partidos",
				param: "partidoId",
			},
			{
				elementos:
					profissoes?.map((profissao) => ({
						titulo: profissao.nome,
						value: profissao.id,
					})) ?? [],
				titulo: "Profissão",
				param: "profissaoId",
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

	const {
		partidos: partidosOrdenados,
		isLoading: isLoadingPartidosFiltrados,
		error: errorRankingPartidos,
	} = useRankingPartidos();

	const error = [
		errorEstado,
		errorPartido,
		errorProfissao,
		errorReligiaoRaca,
		errorIdeologiaGenero,
		errorPoliticoFiltrados,
	].some(Boolean);

	const { replace } = useRouter();

	const limparSearchParams = () => {
		const params = new URLSearchParams(searchParams.toString());

		params.delete("esferaId");
		params.delete("estadoId");
		params.delete("generoId");
		params.delete("partidoId");
		params.delete("profissaoId");
		params.delete("ideologiaId");

		const filtrosVazios = {
			esferaId: "",
			estadoId: "",
			generoId: "",
			partidoId: "",
			ideologiaId: "",
			profissaoId: "",
			ordenacaoProjetosId: "",
		};

		setFiltros(filtrosVazios);
		setFiltrosAplicados(filtrosVazios);

		replace(`${pathname}?${params.toString()}`, { scroll: false });
	};

	return (
		<MainLayout>
			{error && (
				<UserError error="Erro ao carregar os dados. Por favor, tente novamente mais tarde." />
			)}
			<main className="flex h-full w-full flex-col gap-6 tab:gap-12 des:gap-24 items-center px-4 des:px-11 py-10">
				<motion.header
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
				>
					<Titulo pequeno="Ranking" grande="dos Parlamentares" />
				</motion.header>

				<RankingParlamentares
					filtros={filtros}
					getSortIcon={getSortIcon}
					handleClick={handleClick}
					itemsFiltro={dropdownItems}
					aplicarFiltros={aplicarFiltros}
					onFiltroChange={handleFiltroChange}
					isLoadingFiltros={isLoadingFiltros}
					limparSearchParams={limparSearchParams}
					isLoadingDados={isLoadingPoliticosFiltrados}
					dadosParlamentares={politicosFiltrados ?? []}
				/>

				<RankingPartidos
					isLoadingPartidos={isLoadingPartidosFiltrados}
					error={errorRankingPartidos}
					partidosOrdenados={partidosOrdenados ?? []}
				/>

				<DadosEstatisticos
					religiaoPorRaca={religiaoRaca ?? []}
					errorReligiaoRaca={errorReligiaoRaca}
					legendas={legendasGraficosParlamentares}
					errorIdeologiaGenero={errorIdeologiaGenero}
					isLoadingReligiaoRaca={isLoadingReligiaoRaca}
					isLoadingIdeologiaGenero={isLoadingIdeologiaGenero}
					ideologiaPorGenero={(ideologiaGenero as DadosIdeologiaGenero[]) ?? []}
				/>
			</main>
		</MainLayout>
	);
};

interface FiltroElementosProps {
	items: { elementos: elemento[]; titulo: string; param: string }[];
	isLoading?: boolean;
	filtros: Record<string, string>;
	onFiltroChange: (param: string, value: string) => void;
	aplicarFiltros: () => void;
	limparSearchParams: () => void;
}

const SkeletonFiltro: React.FC = () => (
	<section className="w-fit tab:w-full flex flex-col des:flex-row items-start justify-center tab:justify-start gap-4 tab:gap-6 des:gap-24 px-2">
		<nav className="grid grid-cols-3 tab:grid-cols-5 gap-2 tab:gap-6 des:gap-12 des:px-10">
			{Array.from({ length: 5 }).map((_, i) => (
				<div
					key={`skel-dropdown-${i}`}
					className="w-22 h-10 tab:h-12 des:h-12 tab:w-26 des:w-32 bg-[#122144]/50 border border-[#87D9FF]/20 rounded animate-pulse"
				/>
			))}
		</nav>
		<div className="flex flex-row gap-2 tab:gap-4 des:gap-6">
			<div className="w-20 h-12 tab:w-24 des:w-32 bg-[#122144]/50 border border-[#87D9FF]/20 rounded-[3px] animate-pulse" />
			<div className="h-12 w-12 bg-[#122144]/50 border border-[#87D9FF]/20 rounded-se-xl rounded-es-xl animate-pulse" />
		</div>
	</section>
);

const Filtro: React.FC<FiltroElementosProps> = ({
	items,
	isLoading,
	filtros,
	onFiltroChange,
	aplicarFiltros,
	limparSearchParams,
}) => (
	<>
		{isLoading ? (
			<SkeletonFiltro />
		) : (
			<motion.section
				initial={{ opacity: 0, scale: 0.98 }}
				whileInView={{ opacity: 1, scale: 1 }}
				transition={{ duration: 0.5 }}
				viewport={{ once: true }}
				className="w-fit tab:w-full flex flex-col des:flex-row items-start justify-center tab:justify-start gap-4 tab:gap-6 des:gap-24 px-2"
			>
				<nav className="grid grid-cols-3 tab:grid-cols-5 gap-2 tab:gap-6 des:gap-12 des:px-10">
					{items.map((item, index) => (
						<DropdownButton
							className="w-22 text-[11px] tab:text-[15px] des:text-[18px] tab:w-26 des:w-32"
							autoApply={false}
							param={item.param}
							titulo={item.titulo}
							key={item.param + index}
							elementos={item.elementos}
							classNameContent="min-h-40"
							value={filtros[item.param] || ""}
							onChange={(v) => onFiltroChange(item.param, v)}
						/>
					))}
				</nav>
				<div className="flex flex-row gap-2 tab:gap-4 des:gap-6">
					<Button
						className="flex flex-row justify-center border-[#D974FD] text-[12px] tab:text-[15px] des:text-[18px] text-[#D974FD] bg-transparent border rounded-[3px] w-20 h-12 tab:w-24 des:w-32 hover:bg-inherit active:text-white active:bg-[#D974FD] transition-colors duration-75"
						onClick={() => aplicarFiltros()}
					>
						Filtrar <MdOutlineFilterAlt />
					</Button>
					<Button
						variant="outline"
						className="h-12 w-12 border-[#4568BE] rounded-se-xl rounded-es-xl hover:bg-red-600 duration-200 text-[#4568BE] hover:text-white"
						onClick={() => limparSearchParams()}
					>
						<FaTrash color="" />
					</Button>
				</div>
			</motion.section>
		)}
	</>
);

interface RankingParlamentaresProps {
	isLoadingDados: boolean;
	handleClick: () => void;
	itemsFiltro: { elementos: elemento[]; titulo: string; param: string }[];
	isLoadingFiltros: boolean;
	aplicarFiltros: () => void;
	limparSearchParams: () => void;
	getSortIcon: () => JSX.Element;
	filtros: Record<string, string>;
	dadosParlamentares: ResponsePoliticoDTO[];
	onFiltroChange: (param: string, value: string) => void;
}

const SkeletonParlamentar: React.FC = () => (
	<div className="flex flex-col w-full h-full gap-4 tab:mt-2 des:gap-10 px-2 des:px-5 animate-pulse">
		<div className="flex flex-row w-full h-full gap-6 tab:gap-12 des:gap-40 items-center py-2">
			<section className="flex flex-row h-full w-1/2">
				<section className="flex w-full h-full items-center gap-2 pl-4 tab:gap-24 tab:pl-6 des:gap-40 des:pl-26">
					<div className="w-fit">
						<div className="w-6 h-6 tab:h-12 tab:w-12 des:h-24 des:w-24 bg-slate-600 rounded-full" />
					</div>
					<div className="w-fit h-fit text-start">
						<div className="w-20 h-3 tab:w-32 tab:h-5 des:w-48 des:h-8 bg-slate-600 rounded" />
					</div>
				</section>
			</section>
			<section className="flex flex-row h-full w-1/2">
				<div className="flex h-full w-full mr-4 tab:mr-18 des:mr-50 gap-4 des:gap-0 justify-between items-center">
					<div className="w-6 h-3 tab:w-10 tab:h-5 des:w-16 des:h-8 bg-slate-600 rounded" />
					<div className="w-6 h-3 tab:w-10 tab:h-5 des:w-12 des:h-8 bg-slate-600 rounded" />
					<div className="w-4 h-3 tab:w-6 tab:h-5 des:w-8 des:h-8 bg-slate-600 rounded" />
				</div>
			</section>
		</div>
		<div className="w-full h-[1px] bg-white/20" />
	</div>
);

const RankingParlamentares: React.FC<RankingParlamentaresProps> = ({
	dadosParlamentares,
	itemsFiltro,
	isLoadingFiltros,
	getSortIcon,
	handleClick,
	isLoadingDados,
	filtros,
	onFiltroChange,
	aplicarFiltros,
	limparSearchParams,
}) => (
	<motion.article
		initial={{ opacity: 0, y: 30 }}
		whileInView={{ opacity: 1, y: 0 }}
		transition={{ duration: 0.6 }}
		viewport={{ once: true }}
		className="flex flex-col w-full gap-12 des:gap-20"
	>
		<Filtro
			filtros={filtros}
			items={itemsFiltro}
			isLoading={isLoadingFiltros}
			onFiltroChange={onFiltroChange}
			aplicarFiltros={aplicarFiltros}
			limparSearchParams={limparSearchParams}
		/>
		<section className="flex flex-col gap-6 des:gap-10 justify-center">
			<header className="flex flex-row w-full px-2 des:px-16 h-14 des:h-[4.25rem] bg-[#122144] border border-b-0 border-white rounded-t-[5px] font-semibold text-[10px] tab:text-lg des:text-2xl text-[#87D9FF]">
				<section className="w-1/2 h-full px-2 des:px-16 grid grid-cols-2 gap-2 des:gap-4 items-center">
					<p>{"Deputado(a)"}</p>
					<p>{"Nome"}</p>
				</section>
				<section className="w-1/2 h-full px-2 des:px-12 grid grid-cols-3 gap-2 des:gap-4 items-center">
					<p>{"Partido"}</p>
					<p>{"Estado"}</p>
					<FiltrarPropostas
						handleClick={() => handleClick()}
						getSortIcon={() => getSortIcon()}
					/>
				</section>
			</header>
			<section className="min-h-96 max-h-96 des:min-h-[400px] des:max-h-[800px] w-full rounded-md flex flex-col items-center gap-6 des:gap-10 overflow-auto">
				{isLoadingDados &&
					Array.from({ length: 5 }).map((_, i) => (
						<SkeletonParlamentar key={i} />
					))}

				{!isLoadingDados && dadosParlamentares.length === 0 && (
					<p className="text-white text-lg sm:text-2xl">{"sem resultados."}</p>
				)}

				{!isLoadingDados &&
					dadosParlamentares.map((parlamentar, i) => (
						<Card.ComponenteParlamentar
							key={`${i}`}
							parlamentar={parlamentar}
							propostas={parlamentar.numeroProjetos || 0}
						/>
					))}
			</section>
		</section>
	</motion.article>
);

interface RankingPartidosProps {
	isLoadingPartidos: boolean;
	error: Error | string | null;
	partidosOrdenados: PartidoRankingDTO[];
}

const SkeletonPartido: React.FC = () => (
	<div className="flex flex-col w-full h-full gap-4 tab:mt-2 des:gap-10 px-2 des:px-5 animate-pulse">
		<div className="flex flex-row w-full h-full gap-6 tab:gap-12 des:gap-40 items-center py-2">
			<section className="flex flex-row h-full w-1/2 ">
				<section className="flex w-full h-full items-center gap-2 pl-4 tab:gap-24 tab:pl-6 des:gap-40 des:pl-26 ">
					<div className="w-fit">
						<div className="w-6 h-6 tab:h-12 tab:w-12 des:h-24 des:w-24 bg-slate-600 rounded-full" />
					</div>
					<div className="w-fit h-fit text-start">
						<div className="w-16 h-3 tab:w-24 tab:h-5 des:w-40 des:h-8 bg-slate-600 rounded" />
					</div>
				</section>
			</section>
			<section className="flex flex-row h-full w-1/2 ">
				<div className="flex h-full w-full mr-4 tab:mr-18 des:mr-50 gap-4 des:gap-0 justify-between items-center">
					<div className="w-8 h-3 tab:w-12 tab:h-5 des:w-16 des:h-8 bg-slate-600 rounded" />
					<div className="w-4 h-3 tab:w-8 tab:h-5 des:w-10 des:h-8 bg-slate-600 rounded" />
					<div className="w-4 h-3 tab:w-8 tab:h-5 des:w-10 des:h-8 bg-slate-600 rounded" />
				</div>
			</section>
		</div>
		<div className="w-full h-[1px] bg-white/20" />
	</div>
);

const RankingPartidos: React.FC<RankingPartidosProps> = ({
	partidosOrdenados,
	isLoadingPartidos,
	error,
}) => (
	<motion.article
		initial={{ opacity: 0, y: 40 }}
		whileInView={{ opacity: 1, y: 0 }}
		transition={{ duration: 0.6 }}
		viewport={{ once: true }}
		className="flex flex-col w-full gap-6 tab:gap-12 des:gap-20"
	>
		{error && <UserError error={error} />}

		<header className="w-full text-3xl tab:text-5xl des:text-7xl text-white text-center">
			<Texto.Raiz>
				<Texto.Pequeno.Titillium>Ranking</Texto.Pequeno.Titillium>
				<Texto.Espaco />
				<Texto.Forte.Oswald>dos Partidos</Texto.Forte.Oswald>
			</Texto.Raiz>
		</header>

		<section className="flex flex-col gap-2 tab:gap-6 des:gap-10 justify-center">
			<header className="flex flex-row w-full px-2 des:px-16 h-14 des:h-[4.25rem] bg-[#122144] border border-b-0 border-white rounded-t-[5px] font-semibold text-[9.8px] tab:text-lg des:text-2xl text-[#87D9FF]">
				<section className="w-1/2 h-full tab:px-2 des:px-16 grid grid-cols-2 gap-2 des:gap-4 items-center">
					<p>{"Partido"}</p>
					<p>{"Nome"}</p>
				</section>
				<section className="w-1/2 h-full tab:px-2 des:px-12 grid grid-cols-3 justify-between tab:gap-4 items-center text-[9px] tab:text-lg des:text-2xl">
					<p className="text-center">{"Sigla"}</p>
					<p>
						<span className="hidden des:inline">Parlamentares</span>
						<span className="des:hidden">Parl.</span>
					</p>
					<p>{"Propostas"}</p>
				</section>
			</header>

			<section className="h-96 des:h-[800px] w-full rounded-md flex flex-col items-center gap-6 des:gap-10 overflow-auto">
				{isLoadingPartidos ? (
					Array.from({ length: 5 }).map((_, i) => (
						<SkeletonPartido key={`skel-partido-${i}`} />
					))
				) : (
					<>
						{partidosOrdenados?.length === 0 && (
							<p className="text-white text-lg sm:text-2xl">
								{"Nenhum partido encontrado."}
							</p>
						)}
						{partidosOrdenados.map((item) => (
							<Card.ComponentePartido
								key={`${item.nome}-${item.sigla}`}
								partido={item}
							/>
						))}
					</>
				)}
			</section>
		</section>
	</motion.article>
);

interface DadosEstatisticosProps {
	legendas: LegendaGrafico[];
	isLoadingReligiaoRaca: boolean;
	isLoadingIdeologiaGenero: boolean;
	religiaoPorRaca: DadosReligiaoRaca[];
	errorReligiaoRaca: Error | string | null;
	ideologiaPorGenero: DadosIdeologiaGenero[];
	errorIdeologiaGenero: Error | string | null;
}

const SkeletonGrafico: React.FC = () => (
	<div className="w-[21.875rem] h-[16.25rem] tab:w-[45rem] tab:h-[25rem] des:w-[52rem] des:h-[29rem] bg-[#121A2B]/60 animate-pulse rounded-xl border border-white/10 flex flex-col items-center justify-end p-4 tab:p-8 gap-4">
		<div className="w-full h-full border-l border-b border-white/20 flex items-end justify-around pb-0 px-2 tab:px-8 gap-2 tab:gap-6">
			<div className="w-6 tab:w-16 h-[30%] bg-slate-600 rounded-t-sm" />
			<div className="w-6 tab:w-16 h-[70%] bg-slate-600 rounded-t-sm" />
			<div className="w-6 tab:w-16 h-[40%] bg-slate-600 rounded-t-sm" />
			<div className="w-6 tab:w-16 h-[90%] bg-slate-600 rounded-t-sm" />
			<div className="w-6 tab:w-16 h-[50%] bg-slate-600 rounded-t-sm" />
		</div>
		<div className="w-3/4 tab:w-1/2 h-3 tab:h-4 bg-slate-600 rounded" />
	</div>
);

const DadosEstatisticos: React.FC<DadosEstatisticosProps> = ({
	legendas,
	religiaoPorRaca,
	errorReligiaoRaca,
	ideologiaPorGenero,
	errorIdeologiaGenero,
	isLoadingReligiaoRaca,
	isLoadingIdeologiaGenero,
}) => (
	<motion.article
		initial={{ opacity: 0, y: 50 }}
		whileInView={{ opacity: 1, y: 0 }}
		transition={{ duration: 0.6 }}
		viewport={{ once: true }}
		className="flex flex-col justify-center gap-6 tab:gap-12 des:gap-20 w-full"
	>
		<header className="text-2xl tab:text-5xl des:text-7xl text-white text-center">
			<Texto.Raiz>
				<Texto.Pequeno.Oswald>Dados Estatísticos</Texto.Pequeno.Oswald>
			</Texto.Raiz>
		</header>

		<section className="flex flex-col gap-6 tab:gap-12 des:gap-20">
			<section className="flex flex-col des:flex-row justify-center gap-4 tab:gap-10 des:gap-20">
				{errorIdeologiaGenero && <UserError error={errorIdeologiaGenero} />}
				{isLoadingIdeologiaGenero ? (
					<SkeletonGrafico />
				) : (
					<GraficoBarraMultiplas dados={ideologiaPorGenero ?? []} />
				)}
				<Card.Legenda legenda={legendas[0]}>
					<Texto.Raiz className="text-3xl des:text-5xl w-full">
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

			<section className="flex flex-col-reverse des:flex-row justify-center gap-4 tab:gap-10 des:gap-20">
				{errorReligiaoRaca && <UserError error={errorReligiaoRaca} />}
				<CardLegenda legenda={legendas[1]}>
					<Texto.Raiz className="text-3xl des:text-5xl w-full">
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
				{isLoadingReligiaoRaca ? (
					<SkeletonGrafico />
				) : (
					<GraficoBarraEmpilhadaVertical dados={religiaoPorRaca ?? []} />
				)}
			</section>
		</section>
	</motion.article>
);

interface FiltrarPropostasProps {
	getSortIcon: () => JSX.Element;
	handleClick: () => void;
}

const FiltrarPropostas: React.FC<FiltrarPropostasProps> = ({
	getSortIcon,
	handleClick,
}) => (
	<button onClick={() => handleClick()} className="w-fit">
		<p className="text-center flex gap-2 items-center">
			{"Propostas"}
			{getSortIcon()}
		</p>
	</button>
);
