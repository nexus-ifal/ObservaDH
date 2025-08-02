/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { Suspense, useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa6";
import { MdOutlineFilterAlt } from "react-icons/md";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Button } from "@/components/external/ui-shacnui/button";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/external/ui-shacnui/carousel";
import Card from "@/components/ui/cards";
import Texto from "@/components/ui/componente-texto";
import DropdownButton from "@/components/ui/dropdown/dropdown-button";
import GraficoBarraEmpilhadaHorizontal from "@/components/ui/graficos/barra-empilhada-hoizontal";
import GraficoMapa from "@/components/ui/graficos/grafico-mapa";
import GraficoLinhaPontos from "@/components/ui/graficos/linha-pontos";
import MainLayout from "@/components/ui/layouts/main-layout";
import Loading from "@/components/ui/loading";
import UserError from "@/components/ui/user-erro";

import { apresentacao } from "../../mocks/mock-projetos";

import TextoRaiz from "./../../components/ui/componente-texto/texto-raiz";

import { legendasGraficosProjetos } from "@/content/content-projetos";
import { LegendaGrafico } from "@/content/models";
import { ProjetoDTO } from "@/core/domain/dtos/dados.dto";
import { ResponseEsferaDTO } from "@/core/domain/dtos/esfera.dto";
import { DadosGraficoBarraEmpilhadaHorizontal } from "@/core/domain/types/barra-empilhada-horizontal";
import { elemento } from "@/core/domain/types/elemento-dropdown";
import { DadosGraficoLinhaPontos } from "@/core/domain/types/linha-pontos";
import { useAnos } from "@/hooks/dados/use-anos";
import { useParlamentarProjeto } from "@/hooks/dados/use-parlamentar-projeto-esfera";
import { usePautaEsfera } from "@/hooks/dados/use-pauta-esfera";
import { usePautaPorAno } from "@/hooks/dados/use-pauta-por-ano";
import { useProjetoEstado } from "@/hooks/dados/use-projeto-estado";
import { useProjetoPorAno } from "@/hooks/dados/use-projeto-por-ano";
import { useEstado } from "@/hooks/estado/use-estado";
import { usePauta } from "@/hooks/pauta/use-pauta";
import { useProjetosFiltrados } from "@/hooks/projeto/use-projetos-filtrados";
import { buscarEsferas } from "@/infra/api/esfera";
import Link from "next/link";
interface ApresentacaoProps {
	apresentacao: {
		texto: string;
		titulo: string;
		corTexto: string;
		subtitulo: string;
	};
}
interface FiltroElementosProps {
	items: {
		elementos: elemento[];
		titulo: string;
		param: string;
	}[];
	errorFiltros: any;
	isLoadingFiltros: boolean;
	aplicarFiltros: () => void;
	limparSearchParams: () => void;
	filtros: Record<string, string>;
	onFiltroChange: (param: string, value: string) => void;
}
interface NumeroPlsProps {
	error?: any;
	isLoading: boolean;
	legenda: LegendaGrafico;
	dados: DadosGraficoLinhaPontos[];
}
interface NumeroPautasProps {
	error?: any;
	isLoading: boolean;
	legenda: LegendaGrafico;
	dados: DadosGraficoBarraEmpilhadaHorizontal[];
}
interface PropostasDadosProps {
	errorPlAno?: any;
	errorFiltros: any;
	errorPautas?: any;
	errorProjetos?: any;
	projetos: ProjetoDTO[];
	isLoadingPlAno: boolean;
	isLoadingPautas: boolean;
	items: {
		elementos: elemento[];
		titulo: string;
		param: string;
	}[];
	isLoadingProjetos: boolean;
	aplicarFiltros: () => void;
	isLoadingFiltros: boolean;
	limparSearchParams: () => void;
	filtros: Record<string, string>;
	dadosPlAno: DadosGraficoLinhaPontos[];
	dadosPautas: DadosGraficoBarraEmpilhadaHorizontal[];
	onFiltroChange: (param: string, value: string) => void;
}

const Apresentacao = ({ apresentacao }: ApresentacaoProps) => (
	<section>
		<Card.Apresentacao
			cor={apresentacao.corTexto}
			titulo={apresentacao.titulo}
			subtitulo={apresentacao.subtitulo}
		>
			{apresentacao.texto}
		</Card.Apresentacao>
	</section>
);

const Filtro = ({
	items,
	filtros,
	errorFiltros,
	onFiltroChange,
	aplicarFiltros,
	isLoadingFiltros,
	limparSearchParams,
}: FiltroElementosProps) => (
	<section className="w-full flex items-center justify-start gap-24">
		{isLoadingFiltros ? (
			<Loading />
		) : errorFiltros ? (
			<UserError error={errorFiltros} />
		) : (
			<>
				<section className="flex gap-12 px-10">
					{items.map((item, index) => (
						<DropdownButton
							key={index}
							className="w-32"
							autoApply={false}
							param={item.param}
							titulo={item.titulo}
							elementos={item.elementos}
							value={filtros[item.param] || ""}
							onChange={(v) => onFiltroChange(item.param, v)}
						/>
					))}
				</section>
				<div className="flex flex-row items-center gap-2">
					<Button
						className="flex flex-row justify-center border-[#D974FD] text-[#D974FD] bg-transparent border-[1px] rounded-[3px] w-32 h-12 hover:bg-inherit active:text-white active:bg-[#D974FD] transition-colors duration-75"
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
			</>
		)}
	</section>
);

const CarrosselPls = ({
	error,
	projetos,
	isLoading,
}: {
	projetos: ProjetoDTO[];
	isLoading: boolean;
	error?: any;
}) => (
	<section className="flex flex-col gap-14 justify-center text-center">
		{isLoading ? (
			<Loading />
		) : error ? (
			<UserError error={error} />
		) : (
			<>
				{projetos.length > 0 ? (
					<Carousel opts={{ align: "start" }} className="w-[82rem]">
						<CarouselContent>
							{projetos.map((item, i) => (
								<Link
									key={`${item.id} - ${i}`}
									href={`/projetos/${item.id}`}
									className="flex basis-1/2 justify-center"
								>
									<CarouselItem>
										<Card.Projeto projeto={item} />
									</CarouselItem>
								</Link>
							))}
						</CarouselContent>
						<CarouselPrevious />
						<CarouselNext />
					</Carousel>
				) : (
					<TextoRaiz className="text-center text-6xl text-shadow-xl">
						<Texto.Linha>
							<Texto.Pequeno.Titillium>
								Não há projetos disponíveis
							</Texto.Pequeno.Titillium>
							<Texto.Espaco />
							<Texto.Forte.Oswald>para exibição.</Texto.Forte.Oswald>
						</Texto.Linha>
					</TextoRaiz>
				)}
			</>
		)}
	</section>
);

const Divisor = () => (
	<span className="border-b-[1.5px] shadow-bottom shadow-[#AFC4F9] w-full" />
);

const SubTitulo = () => (
	<Texto.Raiz className="text-7xl text-shadow-xl">
		<Texto.Pequeno.Titillium>Propostas</Texto.Pequeno.Titillium>
		<Texto.Espaco />
		<Texto.Forte.Oswald>e Dados Estatísticos</Texto.Forte.Oswald>
	</Texto.Raiz>
);

const NumeroPls = ({ dados, isLoading, error, legenda }: NumeroPlsProps) => (
	<section className="w-full flex justify-center gap-[4.5rem]">
		<Card.Legenda legenda={legenda}>
			<Texto.Raiz className="text-6xl">
				<Texto.Linha>
					<Texto.Forte.Oswald>{"Número"}</Texto.Forte.Oswald>
					<Texto.Espaco />
					<Texto.Pequeno.Titillium>{"de"}</Texto.Pequeno.Titillium>
				</Texto.Linha>
				<Texto.Linha className="text-[#93F996]">
					<Texto.Pequeno.Titillium>{"PL's"}</Texto.Pequeno.Titillium>
					<Texto.Espaco />
					<Texto.Forte.Oswald>{"por ano"}</Texto.Forte.Oswald>
				</Texto.Linha>
			</Texto.Raiz>
		</Card.Legenda>
		{isLoading ? (
			<Loading />
		) : error ? (
			<UserError error={error} />
		) : (
			<GraficoLinhaPontos dados={dados} />
		)}
	</section>
);

const NumeroPautas = ({
	dados,
	isLoading,
	error,
	legenda,
}: NumeroPautasProps) => (
	<section className="w-full flex justify-center gap-[4.5rem]">
		{isLoading ? (
			<Loading />
		) : error ? (
			<UserError error={error} />
		) : (
			<GraficoBarraEmpilhadaHorizontal dados={dados} />
		)}
		<Card.Legenda legenda={legenda}>
			<div>
				<Texto.Raiz className="text-6xl w-[374px]">
					<Texto.Linha className="w-full">
						<Texto.Forte.Oswald>{"Número"}</Texto.Forte.Oswald>
						<Texto.Espaco />
						<Texto.Pequeno.Titillium>{"de"}</Texto.Pequeno.Titillium>
					</Texto.Linha>
					<Texto.Linha className="text-[#F693F9]">
						<Texto.Pequeno.Titillium>{"Pautas"}</Texto.Pequeno.Titillium>
						<Texto.Espaco />
						<Texto.Forte.Oswald>{"por ano"}</Texto.Forte.Oswald>
					</Texto.Linha>
				</Texto.Raiz>
			</div>
		</Card.Legenda>
	</section>
);

const PropostasDados = ({
	items,
	filtros,
	projetos,
	dadosPlAno,
	errorPlAno,
	errorPautas,
	dadosPautas,
	errorFiltros,
	errorProjetos,
	isLoadingPlAno,
	onFiltroChange,
	aplicarFiltros,
	isLoadingPautas,
	isLoadingFiltros,
	isLoadingProjetos,
	limparSearchParams,
}: PropostasDadosProps) => (
	<>
		<SubTitulo />
		<Filtro
			items={items}
			filtros={filtros}
			errorFiltros={errorFiltros}
			onFiltroChange={onFiltroChange}
			aplicarFiltros={aplicarFiltros}
			isLoadingFiltros={isLoadingFiltros}
			limparSearchParams={limparSearchParams}
		/>
		<CarrosselPls
			projetos={projetos}
			error={errorProjetos}
			isLoading={isLoadingProjetos}
		/>
		<Divisor />
		<NumeroPls
			dados={dadosPlAno}
			error={errorPlAno}
			isLoading={isLoadingPlAno}
			legenda={legendasGraficosProjetos[0]}
		/>
		<NumeroPautas
			dados={dadosPautas}
			error={errorPautas}
			isLoading={isLoadingPautas}
			legenda={legendasGraficosProjetos[1]}
		/>
	</>
);

const usePageData = ({
	filtrosAplicados,
}: {
	filtrosAplicados: Record<string, string>;
}) => {
	const searchParams = useSearchParams();
	const esfera = searchParams.get("esfera");
	const [esferas, setEsferas] = useState<ResponseEsferaDTO[]>([]);

	const { pautas, isLoadingPautas, error: errorPauta } = usePauta();
	const { estados, isLoadingEstados, error: errorEstado } = useEstado();
	const { anos, isLoading: isLoadingAnos, error: errorAnos } = useAnos();

	const {
		projetosPorAno,
		isLoadingProjetosPorAno,
		error: errorProjetoPorAno,
	} = useProjetoPorAno();

	const {
		pautaPorAno,
		isLoadingPautaPorAno,
		error: errorPautaPorAno,
	} = usePautaPorAno();

	const {
		projetosPorUF,
		isLoadingProjetosPorUF,
		error: errorProjetosEsfera,
	} = useProjetoEstado(esfera ?? undefined);

	const {
		parlamentarProjetoEsfera,
		isLoadingParlamentarProjetoEsfera,
		error: errorParlamentarProjeto,
	} = useParlamentarProjeto(esfera ?? undefined);

	const {
		pautaEsfera,
		isLoadingPautaEsfera,
		error: errorPautaEsfera,
	} = usePautaEsfera(esfera ?? undefined);

	const {
		projetos,
		isLoadingProjetos,
		error: errorProjetosFiltrados,
	} = useProjetosFiltrados({
		ano: filtrosAplicados.ano,
		pautaId: filtrosAplicados.pautaId,
		esferaId: filtrosAplicados.esferaId,
		estadoId: filtrosAplicados.estadoId,
	});

	useEffect(() => {
		const buscarDados = async () => {
			const esferasData = await buscarEsferas();
			setEsferas(esferasData);
		};
		buscarDados();
	}, []);

	return {
		anos,
		pautas,
		estados,
		esferas,
		projetos,
		errorAnos,
		errorPauta,
		errorEstado,
		pautaEsfera,
		pautaPorAno,
		projetosPorUF,
		isLoadingAnos,
		projetosPorAno,
		isLoadingPautas,
		isLoadingEstados,
		isLoadingProjetos,
		isLoadingPautaPorAno,
		isLoadingPautaEsfera,
		isLoadingProjetosPorAno,
		parlamentarProjetoEsfera,
		errorMapa: errorProjetosEsfera,
		isLoadingParlamentarProjetoEsfera,
		errorPautaPorAno: errorPautaPorAno,
		isLoadingMapa: isLoadingProjetosPorUF,
		errorProjetos: errorProjetosFiltrados,
		errorProjetosPorAno: errorProjetoPorAno,
		errorStatus: errorParlamentarProjeto || errorPautaEsfera,
	};
};

const PageContent = () => {
	const pathName = usePathname();
	const { replace } = useRouter();
	const searchParams = useSearchParams();

	const anoURL = searchParams.get("ano") || "";
	const pautaURL = searchParams.get("pautaId") || "";
	const estadoURL = searchParams.get("estadoId") || "";
	const esferaURL = searchParams.get("esferaId") || "";

	const [filtros, setFiltros] = useState({
		anoId: anoURL,
		pautaId: pautaURL,
		estadoId: estadoURL,
		esferaId: esferaURL,
	});
	const [filtrosAplicados, setFiltrosAplicados] = useState({
		anoId: anoURL,
		pautaId: pautaURL,
		estadoId: estadoURL,
		esferaId: esferaURL,
	});

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
		replace(`${pathName}?${params.toString()}`, { scroll: false });
	}

	const limparSearchParams = () => {
		const params = new URLSearchParams(searchParams.toString());
		params.delete("ano");
		params.delete("pautaId");
		params.delete("esferaId");
		params.delete("estadoId");
		replace(`${pathName}?${params.toString()}`, { scroll: false });
		setFiltros({
			anoId: "",
			pautaId: "",
			estadoId: "",
			esferaId: "",
		});
		setFiltrosAplicados({
			anoId: "",
			pautaId: "",
			estadoId: "",
			esferaId: "",
		});
	};

	const {
		anos,
		pautas,
		esferas,
		estados,
		projetos,
		errorMapa,
		errorAnos,
		errorPauta,
		errorEstado,
		pautaPorAno,
		errorStatus,
		pautaEsfera,
		isLoadingMapa,
		projetosPorUF,
		errorProjetos,
		isLoadingAnos,
		projetosPorAno,
		isLoadingPautas,
		isLoadingEstados,
		errorPautaPorAno,
		isLoadingProjetos,
		errorProjetosPorAno,
		isLoadingPautaPorAno,
		isLoadingPautaEsfera,
		isLoadingProjetosPorAno,
		parlamentarProjetoEsfera,
		isLoadingParlamentarProjetoEsfera,
	} = usePageData({ filtrosAplicados });

	const esferasElementos = esferas.map((esfera) => ({
		value: esfera.id ?? "",
		titulo: esfera.nome ?? "",
	}));

	const anosElementos = anos?.map((ano: { ano: string }) => ({
		value: ano.ano ?? "",
		titulo: ano.ano ?? "",
	}));

	const estadosElementos = estados?.map((estado) => ({
		value: estado.id ?? "",
		titulo: estado.nome ?? "",
	}));

	const pautasElementos = pautas?.map((pauta) => ({
		value: pauta.id ?? "",
		titulo: pauta.nome ?? "",
	}));

	const dropdownItems = [
		{ titulo: "Ano", elementos: anosElementos ?? [], param: "ano" },
		{ titulo: "Pauta", elementos: pautasElementos ?? [], param: "pautaId" },
		{ titulo: "Estado", elementos: estadosElementos ?? [], param: "estadoId" },
		{ titulo: "Esfera", elementos: esferasElementos ?? [], param: "esferaId" },
	];

	return (
		<MainLayout>
			<div className="flex h-full w-full flex-col gap-24 items-center px-11">
				<Apresentacao apresentacao={apresentacao} />

				{/* Gráfico Mapa */}
				{isLoadingMapa ||
				isLoadingParlamentarProjetoEsfera ||
				isLoadingPautaEsfera ? (
					<Loading />
				) : errorMapa || errorStatus ? (
					<UserError error={errorMapa || errorStatus} />
				) : (
					<GraficoMapa
						errorMapa={errorMapa ?? ""}
						errorStatus={errorStatus ?? ""}
						isLoadingDadosMapa={false}
						isLoadingDadosStatus={false}
						dadosMapa={projetosPorUF ?? []}
						dadosStatus={{
							dadosPautaEsfera: pautaEsfera ?? [],
							dadosProjetoPoliticoPorEsfera: parlamentarProjetoEsfera ?? {
								esfera: "",
								projetosLei: 0,
								parlamentares: 0,
							},
						}}
					/>
				)}

				<Divisor />

				<Suspense fallback={<div>Carregando filtros...</div>}>
					<PropostasDados
						filtros={filtros}
						projetos={projetos ?? []}
						items={dropdownItems ?? []}
						errorProjetos={errorProjetos}
						errorPautas={errorPautaPorAno}
						dadosPautas={pautaPorAno ?? []}
						aplicarFiltros={aplicarFiltros}
						errorPlAno={errorProjetosPorAno}
						dadosPlAno={projetosPorAno ?? []}
						onFiltroChange={handleFiltroChange}
						isLoadingProjetos={isLoadingProjetos}
						isLoadingPautas={isLoadingPautaPorAno}
						limparSearchParams={limparSearchParams}
						isLoadingPlAno={isLoadingProjetosPorAno}
						errorFiltros={errorEstado || errorPauta || errorAnos}
						isLoadingFiltros={
							isLoadingAnos || isLoadingPautas || isLoadingEstados
						}
					/>
				</Suspense>
			</div>
		</MainLayout>
	);
};

const Page: React.FC = () => (
	<Suspense fallback={<div>Carregando página...</div>}>
		<PageContent />
	</Suspense>
);

export default Page;
