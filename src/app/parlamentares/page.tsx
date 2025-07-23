"use client";

import { JSX, Suspense, useMemo, useState } from "react";
import { FaChevronDown, FaChevronUp, FaTrash } from "react-icons/fa6";
import { MdOutlineFilterAlt } from "react-icons/md";
import { ChevronsUpDown } from "lucide-react";
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
// import { PartidoModel } from "@/core/domain/types/partido";
import { useIdeologiaGenero } from "@/hooks/dados/use-ideologia-genero";
import { useReligiaoRaca } from "@/hooks/dados/use-religiao-raca";
import { useEstado } from "@/hooks/estado/use-estado";
import { usePartido } from "@/hooks/partido/use-partido";
import { usePoliticoFiltrados } from "@/hooks/politico/use-politico-filtrados";
import { useProfissao } from "@/hooks/profissao/use-profissao";
import { useRankingPartidos } from "@/hooks/dados/use-ranking-partidos";

const Page = () => {
	return (
		<Suspense fallback={<Loading />}>
			<PageContent />
		</Suspense>
	);
};

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
			{
				elementos: generos,
				titulo: "Gênero",
				param: "generoId",
			},
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
		
	const { partidos: partidosOrdenados, isLoading, error: errorRankingPartidos } = useRankingPartidos();

	console.log("Partidos Ordenados:", partidosOrdenados);

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

		replace(`${pathname}?${params.toString()}`, { scroll: false });
	};
	return (
		<MainLayout>
			{error && (
				<UserError
					error={
						"Erro ao carregar os dados. Por favor, tente novamente mais tarde."
					}
				/>
			)}
			<div className="flex h-full w-full flex-col gap-24 items-center px-4 sm:px-11">
				<Titulo pequeno={"Ranking"} grande={"dos Parlamentares"} />
				<RankingParlamentares
					limparSearchParams={limparSearchParams}
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
				<RankingPartidos partidosOrdenados={partidosOrdenados ?? []} />
				<DadosEstatisticos
					errorIdeologiaGenero={errorIdeologiaGenero}
					errorReligiaoRaca={errorReligiaoRaca}
					isLoadingIdeologiaGenero={isLoadingIdeologiaGenero}
					isLoadingReligiaoRaca={isLoadingReligiaoRaca}
					religiaoPorRaca={religiaoRaca ?? []}
					legendas={legendasGraficosParlamentares}
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
	limparSearchParams: () => void;
}

const Filtro = ({
	items,
	isLoading,
	filtros,
	onFiltroChange,
	aplicarFiltros,
	limparSearchParams,
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
	limparSearchParams: () => void;
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
	limparSearchParams,
}: RankingParlamentaresProps) => (
	<article className="flex flex-col w-full gap-12 sm:gap-20">
		<Filtro
			items={itemsFiltro}
			isLoading={isLoadingFiltros}
			filtros={filtros}
			onFiltroChange={onFiltroChange}
			aplicarFiltros={aplicarFiltros}
			limparSearchParams={limparSearchParams}
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
				{isLoadingDados && <Loading />}
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
	partidosOrdenados: PartidoRankingDTO[];
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
	legendas: LegendaGrafico[];
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
						<Card.Legenda legenda={legendas[0]}>
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
						<CardLegenda legenda={legendas[1]}>
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
