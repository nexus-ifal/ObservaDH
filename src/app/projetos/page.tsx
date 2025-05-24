"use client";

import { useEffect, useState } from "react";
import { MdOutlineFilterAlt } from "react-icons/md";

import { CarrosselPlsProps } from "@/domain/interfaces/carrossel-interface";
import { elemento } from "@/domain/graficos/types/elemento-dropdown";
import { ProjetoLei } from "@/domain/graficos/types/projeto-lei";

import Card from "@/components/ui/cards";
import Texto from "@/components/ui/componente-texto";
import DropdownButton from "@/components/ui/dropdown/dropdown-button";
import GraficoBarraEmpilhadaHorizontal from "@/components/ui/graficos/barra-empilhada-hoizontal";
import GraficoMapa from "@/components/ui/graficos/grafico-mapa";
import GraficoLinhaPontos from "@/components/ui/graficos/linha-pontos";
import MainLayout from "@/components/ui/layouts/main-layout";
import { Button } from "@/components/ui-shacnui/button";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui-shacnui/carousel";

import {
	apresentacao,
	legendas,
	projetosMock,
} from "../../mocks/mock-projetos";

import { DadosGraficoBarraEmpilhadaHorizontal } from "@/domain/graficos/types/barra-empilhada-horizontal";
import { DadosGraficoLinhaPontos } from "@/domain/graficos/types/linha-pontos";
import { buscarEsferas } from "@/infra/api/esfera";
import {
	buscarAnoProjeto,
	buscarPautasPorAno,
	buscarProjetosPorAno,
} from "@/infra/api/services/projeto";

import obterEstadosUnicos from "@/core/lib/web/mock-utils/projeto-utils/obter-estados-unico";
import obterPautasUnicas from "@/core/lib/web/mock-utils/projeto-utils/obter-pautas-unicas";
import { ResponseEsferaDTO } from "@/domain/dtos/esfera.dto";

const Page: React.FC = () => {
	const [esferas, setEsferas] = useState<ResponseEsferaDTO[]>([]);
	const [anos, setAnos] = useState<string[]>([]);
	const [dadosPlAno, setDadosPlAno] = useState<DadosGraficoLinhaPontos[]>();
	const [dadosPautas, setDadosPautas] =
		useState<DadosGraficoBarraEmpilhadaHorizontal[]>();

	const estados = obterEstadosUnicos({ projetos: projetosMock });
	const pautas = obterPautasUnicas({ projetos: projetosMock });

	useEffect(() => {
		const buscarDados = async () => {
			const esferas = await buscarEsferas();
			const anos = await buscarAnoProjeto();
			const projetosPorAno = await buscarProjetosPorAno();
			const projetosPorPauta = await buscarPautasPorAno();
			setDadosPlAno(projetosPorAno);
			setDadosPautas(projetosPorPauta);
			setEsferas(esferas);
			setAnos(anos);
		};
		buscarDados();
	}, []);

	const esferasElementos = esferas.map((esfera) => ({
		titulo: esfera.nome ?? "",
		value: esfera.id ?? "",
	}));

	const anosElementos = anos.map((ano) => ({
		titulo: ano ?? "",
		value: ano ?? "",
	}));

	const estadosElementos = estados.map((estado) => ({
		titulo: estado.titulo ?? "",
		value: estado.value ?? "",
	}));

	const pautasElementos = pautas.map((pauta) => ({
		titulo: pauta.titulo ?? "",
		value: pauta.value ?? "",
	}));

	const dropdownItems = [
		{
			titulo: "Esfera",
			elementos: esferasElementos,
		},
		{
			titulo: "Ano",
			elementos: anosElementos,
		},
		{
			titulo: "Estado",
			elementos: estadosElementos,
		},
		{
			titulo: "Pauta",
			elementos: pautasElementos,
		},
	];

	return (
		<MainLayout>
			<div className="flex h-full w-full flex-col gap-24 items-center px-11">
				<Apresentacao apresentacao={apresentacao} />
				<GraficoMapa />
				<Divisor />
				<PropostasDados
					items={dropdownItems}
					projetos={projetosMock}
					dadosPlAno={dadosPlAno ?? []}
					dadosPautas={dadosPautas ?? []}
				/>
			</div>
		</MainLayout>
	);
};

export default Page;

interface apresentacaoProps {
	apresentacao: {
		subtitulo: string;
		titulo: string;
		corTexto: string;
		texto: string;
	};
}

const Apresentacao = ({ apresentacao }: apresentacaoProps) => {
	return (
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
};

interface FiltroElementosProps {
	items: {
		elementos: elemento[];
		titulo: string;
	}[];
}

const Filtro = ({ items }: FiltroElementosProps) => {
	return (
		<section className="w-full flex items-center justify-start gap-24">
			<section className="flex gap-12 px-10">
				{items.map((item, index) => (
					<DropdownButton
						key={index}
						elementos={item.elementos}
						titulo={item.titulo}
						className="w-32 text-center"
					/>
				))}
			</section>
			<Button className="flex flex-row justify-center border-[#D974FD] text-[#D974FD] bg-transparent border-[1px] rounded-[3px] w-32 h-12 hover:bg-inherit active:text-white active:bg-[#D974FD] transition-colors duration-75">
				Filtrar <MdOutlineFilterAlt />
			</Button>
		</section>
	);
};

const CarrosselPls = ({ projetos }: CarrosselPlsProps) => {
	return (
		<section>
			<Carousel
				opts={{
					align: "start",
				}}
				className="w-[82rem]"
			>
				<CarouselContent className="">
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
};

const Divisor = () => {
	return (
		<span className="border-b-[1.5px] shadow-bottom shadow-[#AFC4F9] w-full" />
	);
};

const SubTitulo = () => {
	return (
		<Texto.Raiz className="text-7xl text-shadow-xl">
			<Texto.Pequeno.Titillium>Propostas</Texto.Pequeno.Titillium>
			<Texto.Espaco />
			<Texto.Forte.Oswald>e Dados Estatísticos</Texto.Forte.Oswald>
		</Texto.Raiz>
	);
};

interface numeroPlsProps {
	dados: DadosGraficoLinhaPontos[];
}
const NumeroPls = ({ dados }: numeroPlsProps) => {
	return (
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
};

interface numeroPautasProps {
	dados: DadosGraficoBarraEmpilhadaHorizontal[];
}

const NumeroPautas = ({ dados }: numeroPautasProps) => {
	return (
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
};

interface PropostasDadosProps {
	items: {
		elementos: elemento[];
		titulo: string;
	}[];
	projetos: ProjetoLei[];
	dadosPlAno: DadosGraficoLinhaPontos[];
	dadosPautas: DadosGraficoBarraEmpilhadaHorizontal[];
}

const PropostasDados = ({
	items,
	projetos,
	dadosPlAno,
	dadosPautas,
}: PropostasDadosProps) => {
	return (
		<>
			<SubTitulo />
			<Filtro items={items} />
			<CarrosselPls projetos={projetos} />
			<NumeroPls dados={dadosPlAno} />
			<NumeroPautas dados={dadosPautas} />
		</>
	);
};
