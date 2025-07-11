"use client";

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
import GraficoBarrasVertical from "@/components/ui/graficos/barras-vertical";
import { Radial } from "@/components/ui/graficos/radial";
import MainLayout from "@/components/ui/layouts/main-layout";
import Loading from "@/components/ui/loading";
import Titulo from "@/components/ui/titulo-pages";

import { legendas } from "@/content/content-parlamentares";
import { DadosGraficoBarrasVertical } from "@/core/domain/types/barras-vertical";
import { CarrosselPlsProps } from "@/core/domain/types/carrossel-interface";
import { DadosRadial } from "@/core/domain/types/radial";
import { usePauta } from "@/hooks/pauta/use-pauta";
import { graficoBarrasVerticalDadosMock } from "@/mocks/mock-direitos";
import { projetosMock } from "@/mocks/mock-projetos";

const Direitos: React.FC = () => {
	const { pautas, isLoadingPautas, error } = usePauta();

	const elementosDropdown =
		pautas?.map((pauta) => ({
			titulo: pauta.nome,
			value: pauta.id.toString(),
		})) || [];

	const legendaPadrao = legendas[0];

	const chartData: DadosRadial[] = [
		{ direito: "lieg", projetos: 275, fill: "#FDFF78" },
		{ direito: "educacao", projetos: 200, fill: "#87D9FF" },
		{ direito: "saude", projetos: 187, fill: "#FF977A" },
		{ direito: "lib", projetos: 173, fill: "#F693F9" },
	];

	const dadosRadial = chartData;
	return (
		<MainLayout>
			<div className="flex flex-col h-full w-full gap-24 px-11 justify-center items-center">
				<Titulo pequeno="Violações e Ideologias" grande="dos Projetos de Lei" />
				{error && (
					<div className="text-red-500">
						Erro ao carregar pautas: {error.toString()}
					</div>
				)}
				{isLoadingPautas ? (
					<Loading />
				) : (
					<DadosEstatisticos
						dadosGraficoVertical={graficoBarrasVerticalDadosMock}
						dadosRadial={dadosRadial}
						elementosDropdown={elementosDropdown}
						legendaPadrao={legendaPadrao}
					/>
				)}
				<Carrossel projetos={projetosMock} />
			</div>
		</MainLayout>
	);
};

interface DadosEstatisticosProps {
	elementosDropdown: { titulo: string; value: string }[];
	dadosRadial: DadosRadial[];
	dadosGraficoVertical: DadosGraficoBarrasVertical[];
	legendaPadrao: { resumo: string; texto: string };
}

const DadosEstatisticos = ({
	elementosDropdown,
	dadosRadial,
	dadosGraficoVertical,
	legendaPadrao,
}: DadosEstatisticosProps) => (
	<>
		<section className="w-full flex flex-col justify-center">
			<div className="w-full">
				<DropdownButton
					className="w-32"
					titulo="Pauta"
					param="pauta"
					elementos={elementosDropdown}
				/>
			</div>
			<div className="flex flex-row w-full items-center  gap-2">
				<Radial dados={dadosRadial} />
				<div className="flex w-1/2 justify-center">
					<Card.Legenda
						corTexto="text-[#D974FD]"
						resumo={legendaPadrao.resumo}
						texto={legendaPadrao.texto}
					>
						<Titulo pequeno="Projetos de" grande="Lei" />
					</Card.Legenda>
				</div>
			</div>
		</section>
		<section className="w-full flex flex-row gap-[4.5rem] justify-center ">
			<Card.Legenda
				corTexto="text-[#FDFF78]"
				resumo={legendaPadrao.resumo}
				texto={legendaPadrao.texto}
			>
				<Texto.Raiz shadow className="text-5xl">
					<Texto.Linha>
						<Texto.Forte.Oswald>Ideologia dos</Texto.Forte.Oswald>
					</Texto.Linha>
					<Texto.Linha className="text-[#FDFF78]">
						<Texto.Pequeno.Titillium>Projetos de Lei</Texto.Pequeno.Titillium>
					</Texto.Linha>
				</Texto.Raiz>
			</Card.Legenda>
			<GraficoBarrasVertical dados={dadosGraficoVertical} />
		</section>
	</>
);

const Carrossel = ({ projetos }: CarrosselPlsProps) => (
	<section className="flex flex-col gap-14 justify-center text-center">
		<Texto.Raiz className="text-6xl" shadow>
			<Texto.Pequeno.Titillium>Projetos</Texto.Pequeno.Titillium>
			<Texto.Espaco />
			<Texto.Forte.Oswald className="text-[#87D9FF]">de Lei</Texto.Forte.Oswald>
		</Texto.Raiz>
		<section>
			<Carousel opts={{ align: "start" }} className="w-[82rem]">
				<CarouselContent>
					{projetos.map((item) => (
						<CarouselItem
							key={item.id}
							className="basis-1/2 flex justify-center"
						>
							<Card.Projeto projeto={item} />
						</CarouselItem>
					))}
				</CarouselContent>
				<CarouselPrevious />
				<CarouselNext />
			</Carousel>
		</section>
	</section>
);

export default Direitos;
