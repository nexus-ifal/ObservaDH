/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Suspense, useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa6";
import Link from "next/link";
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
import GraficoBarrasVertical from "@/components/ui/graficos/barras-vertical";
import { Radial } from "@/components/ui/graficos/radial";
import MainLayout from "@/components/ui/layouts/main-layout";
import Loading from "@/components/ui/loading";
import Titulo from "@/components/ui/titulo-pages";
import UserError from "@/components/ui/user-erro";

import { legendasGraficosDireitos } from "@/content/legenda-direitos";
import { LegendaGrafico } from "@/content/models";
import { ProjetoDTO } from "@/core/domain/dtos/dados.dto";
import { DadosGraficoBarrasVertical } from "@/core/domain/types/barras-vertical";
import { useProjetosDireitosIdeologias } from "@/hooks/dados/use-projetos-direitos-ideologias";
import { usePauta } from "@/hooks/pauta/use-pauta";

interface DadosEstatisticosProps {
	elementosDropdown: { titulo: string; value: string }[];
	dadosRadial: DadosRadial[];
	dadosGraficoVertical: DadosGraficoBarrasVertical[];
	legenda: LegendaGrafico[];
	isPautaSelecionada: boolean;
	limparSearchParams: () => void;
}

interface DadosRadial {
	label: string;
	value: number;
}
interface CarrosselProps {
	projetos: ProjetoDTO[];
	isProjetosLoading: boolean;
}

interface FiltroPautaProps {
	elementosDropdown: { titulo: string; value: string }[];
	isPautaSelecionada: boolean;
	limparSearchParams: () => void;
}

interface SecaoDireitosVioladosProps {
	dadosRadial: any[];
	legenda: LegendaGrafico;
}

const FiltroPauta: React.FC<FiltroPautaProps> = ({
	elementosDropdown,
	isPautaSelecionada,
	limparSearchParams,
}) => (
	<div className="flex flex-row items-center gap-2">
		<DropdownButton
			className="w-32"
			titulo="Pauta"
			param="pauta"
			elementos={elementosDropdown}
		/>
		{isPautaSelecionada && (
			<Button
				variant="outline"
				className="h-12 w-12 rounded-se-xl rounded-es-xl hover:bg-red-600 duration-200 bg-white"
				onClick={limparSearchParams}
			>
				<FaTrash />
			</Button>
		)}
	</div>
);

const SecaoDireitosViolados: React.FC<SecaoDireitosVioladosProps> = ({
	dadosRadial,
	legenda,
}) => (
	<div className="flex gap-[4.5rem] justify-center">
		<div className="flex w-1/2 h-full justify-end">
			<Radial dados={dadosRadial} />
		</div>
		<div className="flex justify-end items-end">
			<Card.Legenda legenda={legenda}>
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
);

interface SecaoIdeologiasProps {
	dadosGraficoVertical: DadosGraficoBarrasVertical[];
	legenda: LegendaGrafico;
}

const SecaoIdeologias: React.FC<SecaoIdeologiasProps> = ({
	dadosGraficoVertical,
	legenda,
}) => (
	<section className="w-full flex flex-row gap-[4.5rem] justify-center">
		<Card.Legenda legenda={legenda}>
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
);

const DadosEstatisticos: React.FC<DadosEstatisticosProps> = ({
	elementosDropdown,
	dadosRadial,
	dadosGraficoVertical,
	legenda,
	isPautaSelecionada,
	limparSearchParams,
}) => (
	<>
		<section className="w-full h-full flex flex-col justify-center">
			<div className="w-full">
				<FiltroPauta
					elementosDropdown={elementosDropdown}
					isPautaSelecionada={isPautaSelecionada}
					limparSearchParams={limparSearchParams}
				/>
			</div>
			<div className="flex flex-row w-full items-center justify-center gap-2 h-full">
				<SecaoDireitosViolados dadosRadial={dadosRadial} legenda={legenda[0]} />
			</div>
		</section>
		<SecaoIdeologias
			dadosGraficoVertical={dadosGraficoVertical}
			legenda={legenda[1]}
		/>
	</>
);

const Carrossel: React.FC<CarrosselProps> = ({
	projetos,
	isProjetosLoading,
}) => (
	<section className="flex flex-col gap-14 justify-center text-center">
		<Texto.Raiz className="text-6xl" shadow>
			<Texto.Pequeno.Titillium>Projetos</Texto.Pequeno.Titillium>
			<Texto.Espaco />
			<Texto.Forte.Oswald className="text-[#87D9FF]">de Lei</Texto.Forte.Oswald>
		</Texto.Raiz>
		{isProjetosLoading ? (
			<Loading />
		) : (
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
		)}
	</section>
);

const Direitos: React.FC = () => {
	const { pautas, isLoadingPautas, error } = usePauta();
	const searchParams = useSearchParams();
	const { replace } = useRouter();
	const pathName = usePathname();

	const pautaId = searchParams.get("pauta") || undefined;
	const isPautaSelecionada = !!pautaId;

	const {
		isLoading: isLoadingProjetosDireitosIdeologias,
		direitos_violados_valores,
		ideologias_valores,
		projetos_carrosel,
		error: errorProjetosDireitosIdeologias,
	} = useProjetosDireitosIdeologias(pautaId);

	const [projetos, setProjetos] = useState<any[]>([]);
	const [ideologias, setIdeologias] = useState<any[]>([]);
	const [direitosViolados, setDireitosViolados] = useState<any[]>([]);

	const elementosDropdown =
		pautas?.map((pauta) => ({
			titulo: pauta.nome,
			value: pauta.id.toString(),
		})) || [];

	const isLoading = isLoadingPautas || isLoadingProjetosDireitosIdeologias;

	useEffect(() => {
		if (!isLoadingProjetosDireitosIdeologias) {
			setProjetos(projetos_carrosel || []);
			setIdeologias(ideologias_valores || []);
			setDireitosViolados(direitos_violados_valores || []);
		}
	}, [
		isLoadingProjetosDireitosIdeologias,
		projetos_carrosel,
		ideologias_valores,
		direitos_violados_valores,
	]);

	const limparSearchParams = () => {
		const params = new URLSearchParams(searchParams.toString());
		params.delete("pauta");
		replace(`${pathName}?${params.toString()}`, { scroll: false });
	};

	const renderContent = () => {
		if (error) {
			return (
				<div className="text-red-500">
					Erro ao carregar pautas: {error.toString()}
				</div>
			);
		}

		if (errorProjetosDireitosIdeologias) {
			return <UserError error={errorProjetosDireitosIdeologias} />;
		}

		if (isLoading) {
			return <Loading />;
		}

		return (
			<>
				<DadosEstatisticos
					limparSearchParams={limparSearchParams}
					isPautaSelecionada={isPautaSelecionada}
					dadosGraficoVertical={ideologias}
					dadosRadial={direitosViolados}
					elementosDropdown={elementosDropdown}
					legenda={legendasGraficosDireitos}
				/>
				<Carrossel
					projetos={projetos}
					isProjetosLoading={isLoadingProjetosDireitosIdeologias}
				/>
			</>
		);
	};

	return (
		<MainLayout>
			<div className="flex flex-col h-full w-full gap-24 px-10 justify-center items-center">
				<Titulo pequeno="Violações e Ideologias" grande="dos Projetos de Lei" />
				{renderContent()}
			</div>
		</MainLayout>
	);
};

const Page: React.FC = () => (
	<Suspense fallback={<Loading />}>
		<Direitos />
	</Suspense>
);

export default Page;
