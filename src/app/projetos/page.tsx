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

import { apresentacao, legendas } from "../../mocks/mock-projetos";

import { ProjetoDTO } from "@/core/domain/dtos/dados.dto";
import { ResponseEsferaDTO } from "@/core/domain/dtos/esfera.dto";
import { DadosGraficoBarraEmpilhadaHorizontal } from "@/core/domain/types/barra-empilhada-horizontal";
import { CarrosselPlsProps } from "@/core/domain/types/carrossel-interface";
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
import { buscarEsferas } from "@/infra/api/esfera";
interface ApresentacaoProps {
	apresentacao: {
		subtitulo: string;
		titulo: string;
		corTexto: string;
		texto: string;
	};
}

interface FiltroElementosProps {
	items: {
		elementos: elemento[];
		titulo: string;
		param: string;
	}[];
	limparSearchParams: () => void;
}

interface NumeroPlsProps {
	dados: DadosGraficoLinhaPontos[];
}

interface NumeroPautasProps {
	dados: DadosGraficoBarraEmpilhadaHorizontal[];
}

interface PropostasDadosProps {
	items: {
		elementos: elemento[];
		titulo: string;
		param: string;
	}[];
	projetos: ProjetoDTO[];
	dadosPlAno: DadosGraficoLinhaPontos[];
	dadosPautas: DadosGraficoBarraEmpilhadaHorizontal[];
	limparSearchParams: () => void;
}

const Apresentacao = ({ apresentacao }: ApresentacaoProps) => (
	<section>
		<Card.Apresentacao
			subtitulo={apresentacao.subtitulo}
			titulo={apresentacao.titulo}
			cor={apresentacao.corTexto}
		>
			{apresentacao.texto}
		</Card.Apresentacao>
	</section>
);

const Filtro = ({ items, limparSearchParams }: FiltroElementosProps) => (
	<section className="w-full flex items-center justify-start gap-24">
		<section className="flex gap-12 px-10">
			{items.map((item, index) => (
				<DropdownButton
					param={item.param}
					key={index}
					elementos={item.elementos}
					titulo={item.titulo}
					className="w-32"
				/>
			))}
		</section>
		<div className="flex flex-row items-center gap-2">
			<Button className="flex flex-row justify-center border-[#D974FD] text-[#D974FD] bg-transparent border-[1px] rounded-[3px] w-32 h-12 hover:bg-inherit active:text-white active:bg-[#D974FD] transition-colors duration-75">
				Filtrar <MdOutlineFilterAlt />
			</Button>
			<Button
				variant="outline"
				className="h-12 w-12 border-[#4568BE] rounded-se-xl rounded-es-xl hover:bg-red-600 duration-200 text-[#4568BE] hover:text-white"
				onClick={limparSearchParams}
			>
				<FaTrash color="" />
			</Button>
		</div>
	</section>
);

const CarrosselPls = ({ projetos }: CarrosselPlsProps) => (
	<section>
		<Carousel opts={{ align: "start" }} className="w-[82rem]">
			<CarouselContent>
				{projetos.map((item, index) => (
					<CarouselItem key={index} className="basis-1/2 flex justify-center">
						<Card.Projeto projeto={item} />
					</CarouselItem>
				))}
			</CarouselContent>
			<CarouselPrevious />
			<CarouselNext />
		</Carousel>
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

const NumeroPls = ({ dados }: NumeroPlsProps) => (
	<section className="w-full flex justify-center gap-[4.5rem]">
		<Card.Legenda
			corTexto={legendas.find((item) => item.titulo === "PL's")?.cor}
			texto={legendas.find((item) => item.titulo === "PL's")?.texto}
			resumo={legendas.find((item) => item.titulo === "PL's")?.resumo}
		>
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
		<GraficoLinhaPontos dados={dados} />
	</section>
);

const NumeroPautas = ({ dados }: NumeroPautasProps) => (
	<section className="w-full flex justify-center gap-[4.5rem]">
		<GraficoBarraEmpilhadaHorizontal dados={dados} />
		<Card.Legenda
			corTexto={legendas.find((item) => item.titulo === "Pautas")?.cor}
			texto={legendas.find((item) => item.titulo === "Pautas")?.texto}
			resumo={legendas.find((item) => item.titulo === "Pautas")?.resumo}
		>
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
	projetos,
	dadosPlAno,
	dadosPautas,
	limparSearchParams,
}: PropostasDadosProps) => (
	<>
		<SubTitulo />
		<Filtro items={items} limparSearchParams={limparSearchParams} />
		<CarrosselPls projetos={projetos} />
		<NumeroPls dados={dadosPlAno} />
		<NumeroPautas dados={dadosPautas} />
	</>
);

const usePageData = () => {
	const [esferas, setEsferas] = useState<ResponseEsferaDTO[]>([]);

	const searchParams = useSearchParams();
	const esfera = searchParams.get("esfera");

	const { estados, isLoadingEstados, error: errorEstado } = useEstado();
	const { pautas, isLoadingPautas, error: errorPauta } = usePauta();
	const { anos, isLoading: isLoadingAnos, error: errorAnos } = useAnos();

	console.log("ANOS: ", anos);

	const {
		projetosPorAno,
		isLoadingProjetosPorAno,
		error: projetoPorAnoError,
	} = useProjetoPorAno();

	const {
		pautaPorAno,
		isLoadingPautaPorAno,
		error: pautaPorAnoError,
	} = usePautaPorAno();

	const {
		projetosPorUF,
		isLoadingProjetosPorUF,
		error: projetoPorEstadoError,
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

	const isLoading =
		isLoadingProjetosPorUF ||
		isLoadingProjetosPorAno ||
		isLoadingPautaPorAno ||
		isLoadingPautas ||
		isLoadingEstados ||
		isLoadingParlamentarProjetoEsfera ||
		isLoadingPautaEsfera ||
		isLoadingAnos;

	const error =
		projetoPorEstadoError ||
		projetoPorAnoError ||
		pautaPorAnoError ||
		errorEstado ||
		errorPauta ||
		errorPautaEsfera ||
		errorParlamentarProjeto ||
		errorAnos;

	//TODO: trazer dados do backend
	useEffect(() => {
		const buscarDados = async () => {
			//GAMBIARRA: buscar esferas e anos apenas uma vez
			const esferasData = await buscarEsferas();
			setEsferas(esferasData);
		};

		buscarDados();
	}, []);

	return {
		esferas,
		anos,
		estados,
		pautas,
		projetosPorAno,
		pautaPorAno,
		projetosPorUF,
		parlamentarProjetoEsfera,
		pautaEsfera,
		isLoading,
		error,
	};
};

const PageContent = () => {
	const {
		esferas,
		anos,
		estados,
		pautas,
		projetosPorAno,
		pautaPorAno,
		projetosPorUF,
		parlamentarProjetoEsfera,
		pautaEsfera,
		isLoading,
		error,
	} = usePageData();

	const { replace } = useRouter();
	const pathName = usePathname();
	const searchParams = useSearchParams();

	//? Transformar dados para dropdowns
	const esferasElementos = esferas.map((esfera) => ({
		titulo: esfera.nome ?? "",
		value: esfera.id ?? "",
	}));

	const anosElementos = anos?.map((ano: { ano: string }) => ({
		titulo: ano.ano ?? "",
		value: ano.ano ?? "",
	}));

	const estadosElementos = estados?.map((estado) => ({
		titulo: estado.nome ?? "",
		value: estado.id ?? "",
	}));

	const pautasElementos = pautas?.map((pauta) => ({
		titulo: pauta.nome ?? "",
		value: pauta.id ?? "",
	}));

	const dropdownItems = [
		{ titulo: "Esfera", elementos: esferasElementos ?? [], param: "esferaId" },
		{ titulo: "Ano", elementos: anosElementos ?? [], param: "anoId" },
		{ titulo: "Estado", elementos: estadosElementos ?? [], param: "estadoId" },
		{ titulo: "Pauta", elementos: pautasElementos ?? [], param: "pautaId" },
	];

	const limparSearchParams = () => {
		const params = new URLSearchParams(searchParams.toString());
		params.delete("pautaId");
		params.delete("estadoId");
		params.delete("anoId");
		params.delete("esferaId");
		replace(`${pathName}?${params.toString()}`, { scroll: false });
	};

	//? Renderizações condicionais
	if (error) {
		return (
			<MainLayout>
				<div className="flex h-full w-full flex-col gap-24 items-center px-11">
					<Apresentacao apresentacao={apresentacao} />
					<UserError error={error} />
				</div>
			</MainLayout>
		);
	}

	if (isLoading) {
		return (
			<MainLayout>
				<div className="flex h-full w-full flex-col gap-24 items-center px-11">
					<Apresentacao apresentacao={apresentacao} />
					<Loading />
				</div>
			</MainLayout>
		);
	}

	return (
		<MainLayout>
			<div className="flex h-full w-full flex-col gap-24 items-center px-11">
				<Apresentacao apresentacao={apresentacao} />

				<GraficoMapa
					dadosMapa={projetosPorUF ?? []}
					dadosStatus={{
						dadosProjetoPoliticoPorEsfera: parlamentarProjetoEsfera ?? {
							esfera: "",
							parlamentares: 0,
							projetosLei: 0,
						},
						dadosPautaEsfera: pautaEsfera ?? [],
					}}
					isLoadingDadosMapa={false}
					isLoadingDadosStatus={false}
					errorMapa={undefined}
					errorStatus={undefined}
				/>

				<Divisor />

				<Suspense fallback={<div>Carregando filtros...</div>}>
					<PropostasDados
						limparSearchParams={limparSearchParams}
						items={dropdownItems ?? []}
						projetos={[]}
						dadosPlAno={projetosPorAno ?? []}
						dadosPautas={pautaPorAno ?? []}
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
