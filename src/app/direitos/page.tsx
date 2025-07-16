/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

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
import { ProjetoDTO } from "@/core/domain/dtos/dados.dto";
import { DadosGraficoBarrasVertical } from "@/core/domain/types/barras-vertical";
import { CarrosselPlsProps } from "@/core/domain/types/carrossel-interface";
import { DadosRadial } from "@/core/domain/types/radial";
import { useProjetosDireitosIdeologias } from "@/hooks/dados/use-projetos-direitos-ideologias";
import { usePauta } from "@/hooks/pauta/use-pauta";

const Direitos: React.FC = () => {
	const { pautas, isLoadingPautas, error } = usePauta();

	const elementosDropdown =
		pautas?.map((pauta) => ({
			titulo: pauta.nome,
			value: pauta.id.toString(),
		})) || [];

	const legendaPadrao = legendas[0];

	const searchParams = useSearchParams();
	const pautaId = searchParams.get("pauta") || undefined;

	const {
		projetosDireitosIdeologias,
		isLoadingProjetosDireitosIdeologias,
		error: errorProjetosDireitosIdeologias,
	} = useProjetosDireitosIdeologias(pautaId);

	const [projetos, setProjetos] = useState<ProjetoDTO[]>([]);
	const [ideologias, setIdeologias] = useState<any[]>([]);
	const [direitosViolados, setDireitosViolados] = useState<any[]>([]);

	const isLoading = isLoadingPautas || isLoadingProjetosDireitosIdeologias;

	useEffect(() => {
		if (projetosDireitosIdeologias) {
			setProjetos(projetosDireitosIdeologias.projetos || []);
			setIdeologias(projetosDireitosIdeologias.ideologias_valores || []);
			setDireitosViolados(
				projetosDireitosIdeologias.direitos_violados_valores || []
			);
		}
	}, [projetosDireitosIdeologias]);

	return (
		<MainLayout>
			<div className="flex flex-col h-full w-full gap-24 px-10 justify-center items-center">
				<Titulo pequeno="Violações e Ideologias" grande="dos Projetos de Lei" />
				{error && (
					<div className="text-red-500">
						Erro ao carregar pautas: {error.toString()}
					</div>
				)}
				{isLoading ? (
					<Loading />
				) : (
					<DadosEstatisticos
						dadosGraficoVertical={ideologias}
						dadosRadial={direitosViolados}
						elementosDropdown={elementosDropdown}
						legendaPadrao={legendaPadrao}
					/>
				)}
				<Carrossel projetos={projetos} />
			</div>
		</MainLayout>
	);
};

interface DadosEstatisticosProps {
	elementosDropdown: { titulo: string; value: string }[];
	dadosRadial: any[];
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
		<section className="w-full h-full flex flex-col justify-center">
			<div className="w-full">
				<DropdownButton
					className="w-32"
					titulo="Pauta"
					param="pauta"
					elementos={elementosDropdown}
				/>
			</div>
			<div className="flex flex-row w-full items-center justify-center gap-2 h-full">
				<div className="flex gap-[4.5rem] justify-center">
					<div className="flex w-1/2 h-full justify-end ">
						<Radial dados={dadosRadial} />
					</div>
					<div className="flex  justify-end b items-end">
						<Card.Legenda
							corTexto="text-[#D974FD]"
							resumo={legendaPadrao.resumo}
							texto={legendaPadrao.texto}
						>
							<Texto.Raiz shadow className="text-6xl">
								<Texto.Linha>
									<Texto.Forte.Oswald>Direitos</Texto.Forte.Oswald>
								</Texto.Linha>
								<Texto.Linha className="text-[#D974FD]">
									<Texto.Pequeno.Titillium>Violados</Texto.Pequeno.Titillium>
								</Texto.Linha>
							</Texto.Raiz>
						</Card.Legenda>
					</div>
				</div>
			</div>
		</section>
		<section className="w-full flex flex-row gap-[4.5rem] justify-center">
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
					{projetos.map((item, i) => (
						<Link key={i} href={`/projetos/${item.id}`} className="flex basis-1/2 justify-center">
							<CarouselItem>
								<Card.Projeto projeto={item} />
							</CarouselItem>
						</Link>
					))}
				</CarouselContent>
				<CarouselPrevious />
				<CarouselNext />
			</Carousel>
		</section>
	</section>
);

export default Direitos;
