/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Suspense } from "react";
import { FaTrash } from "react-icons/fa6";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";

import { Button } from "@/components/external/ui-shacnui/button";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/external/ui-shacnui/carousel";
import Card from "@/components/ui/cards";
import Texto from "@/components/ui/texto";
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

// render
const Page: React.FC = () => (
	<Suspense fallback={<Loading />}>
		<Direitos />
	</Suspense>
);

export default Page;

interface DadosEstatisticosProps {
	elementosDropdown: { titulo: string; value: string }[];
	dadosRadial: any[];
	dadosGraficoVertical: any[];
	legenda: LegendaGrafico[];
	isPautaSelecionada: boolean;
	limparSearchParams: () => void;
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

interface SecaoIdeologiasProps {
	dadosGraficoVertical: DadosGraficoBarrasVertical[];
	legenda: LegendaGrafico;
}


const FiltroPauta: React.FC<FiltroPautaProps> = ({
	elementosDropdown,
	isPautaSelecionada,
	limparSearchParams,
}) => (
	<nav className="flex flex-row items-center ml-6 mb-4 gap-2">
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
	</nav>
);

const SecaoDireitosViolados: React.FC<SecaoDireitosVioladosProps> = ({
	dadosRadial,
	legenda,
}) => (
	<motion.article
		initial={{ opacity: 0, x: -40 }}
		whileInView={{ opacity: 1, x: 0 }}
		transition={{ duration: 0.6 }}
		viewport={{ once: true }}
		className="flex flex-col des:flex-row gap-4 tab:gap-10 des:gap-[4.5rem] justify-center items-center w-full"
	>
		<figure className="flex w-1/2 h-full justify-center des:justify-end">
			<Radial dados={dadosRadial} />
		</figure>
		<header className="flex justify-end items-end">
			<Card.Legenda legenda={legenda}>
				<Texto.Raiz shadow className="text-3xl des:text-6xl">
					<Texto.Linha>
						<Texto.Forte.Oswald>Direitos</Texto.Forte.Oswald>
					</Texto.Linha>
					<Texto.Linha className="text-[#D974FD]">
						<Texto.Pequeno.Titillium>Violados</Texto.Pequeno.Titillium>
					</Texto.Linha>
				</Texto.Raiz>
			</Card.Legenda>
		</header>
	</motion.article>
);

const SecaoIdeologias: React.FC<SecaoIdeologiasProps> = ({
	dadosGraficoVertical,
	legenda,
}) => (
	<motion.section
		initial={{ opacity: 0, y: 40 }}
		whileInView={{ opacity: 1, y: 0 }}
		transition={{ duration: 0.6 }}
		viewport={{ once: true }}
		className="w-full flex flex-col-reverse des:flex-row gap-6 des:gap-[4.5rem] justify-center items-center"
	>
		<Card.Legenda legenda={legenda}>
			<Texto.Raiz shadow className="text-3xl des:text-5xl">
				<Texto.Linha>
					<Texto.Forte.Oswald>Ideologia dos</Texto.Forte.Oswald>
				</Texto.Linha>
				<Texto.Linha className="text-[#FDFF78]">
					<Texto.Pequeno.Titillium>Projetos de Lei</Texto.Pequeno.Titillium>
				</Texto.Linha>
			</Texto.Raiz>
		</Card.Legenda>
		<figure>
			<GraficoBarrasVertical dados={dadosGraficoVertical} />
		</figure>
	</motion.section>
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
			<header>
				<FiltroPauta
					elementosDropdown={elementosDropdown}
					isPautaSelecionada={isPautaSelecionada}
					limparSearchParams={limparSearchParams}
				/>
			</header>
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
	<motion.section
		initial={{ opacity: 0, scale: 0.95 }}
		whileInView={{ opacity: 1, scale: 1 }}
		transition={{ duration: 0.5 }}
		viewport={{ once: true }}
		className="flex flex-col gap-4 tab:gap-8 des:gap-14 justify-center text-center"
	>
		<header>
			<Texto.Raiz className="text-3xl tab:text-5xl des:text-6xl" shadow>
				<Texto.Pequeno.Titillium>Projetos</Texto.Pequeno.Titillium>
				<Texto.Espaco />
				<Texto.Forte.Oswald className="text-[#87D9FF]">de Lei</Texto.Forte.Oswald>
			</Texto.Raiz>
		</header>
		{isProjetosLoading ? (
			<article className="w-[20rem] tab:w-[39rem] des:w-[82rem] mx-auto flex gap-4 overflow-hidden justify-center px-4">
				<SkeletonProjeto />
				<div className="hidden des:block">
					<SkeletonProjeto />
				</div>
			</article>
		) : (
			<Carousel
				opts={{ align: "start" }}
				className="w-[20rem] tab:w-[39rem] des:w-[82rem]"
			>
				<CarouselContent>
					{(projetos || []).map((item, i) => (
						<div key={item.id || i}>
							<CarouselItem className="flex basis-[100%] des:basis-1/2 justify-center">
								<Card.Projeto projeto={item} />
							</CarouselItem>
						</div>
					))}
				</CarouselContent>
				<CarouselPrevious />
				<CarouselNext />
			</Carousel>
		)}
	</motion.section>
);


const SkeletonRadial: React.FC = () => (
	<div className="relative flex items-center justify-center w-[15rem] h-[15rem] tab:w-[22rem] tab:h-[22rem] bg-[#122144]/30 rounded-full animate-pulse border-[1.5rem] border-[#121A2B]/50">
		<div className="w-[60%] h-[60%] bg-[#121A2B] rounded-full" />
	</div>
);

const SkeletonGraficoVertical: React.FC = () => (
	<div className="w-[21.875rem] h-[16.25rem] tab:w-[45rem] tab:h-[25rem] des:w-[52rem] des:h-[29rem] bg-[#121A2B]/60 animate-pulse rounded-xl border border-white/10 flex items-end justify-around p-4 tab:p-8 gap-2 tab:gap-6">
		{Array.from({ length: 6 }).map((_, i) => (
			<div
				key={`skel-v-${i}`}
				className="w-6 tab:w-16 bg-slate-600 rounded-t-sm"
				style={{ height: `${Math.floor(Math.random() * 60) + 30}%` }}
			/>
		))}
	</div>
);

const SkeletonProjeto: React.FC = () => (
	<div className="w-[18rem] tab:w-[22rem] h-[25rem] bg-[#122144]/50 rounded-xl animate-pulse flex flex-col p-6 gap-6 border border-[#87D9FF]/20">
		<div className="h-6 w-3/4 bg-slate-600 rounded" />
		<div className="h-4 w-1/2 bg-slate-600 rounded" />
		<div className="mt-auto space-y-3">
			<div className="h-3 w-full bg-slate-600 rounded" />
			<div className="h-3 w-full bg-slate-600 rounded" />
			<div className="h-3 w-4/5 bg-slate-600 rounded" />
		</div>
	</div>
);


const Direitos: React.FC = () => {
	const { pautas, isLoadingPautas, error: errorPautas } = usePauta();
	const searchParams = useSearchParams();
	const { replace } = useRouter();
	const pathName = usePathname();

	const pautaId = searchParams.get("pauta") || undefined;
	const isPautaSelecionada = !!pautaId;

	const {
		isLoading: isLoadingProjetos,
		direitos_violados_valores,
		ideologias_valores,
		projetos_carrosel,
		error: errorProjetos,
	} = useProjetosDireitosIdeologias(pautaId);

	const elementosDropdown =
		pautas?.map((pauta) => ({
			titulo: pauta.nome,
			value: pauta.id.toString(),
		})) || [];

	const isLoading = isLoadingPautas || isLoadingProjetos;

	const limparSearchParams = () => {
		const params = new URLSearchParams(searchParams.toString());
		params.delete("pauta");
		replace(`${pathName}?${params.toString()}`, { scroll: false });
	};

	const renderContent = () => {
		if (errorPautas) {
			return (
				<article className="text-red-500">
					Erro ao carregar pautas: {errorPautas.toString()}
				</article>
			);
		}

		if (errorProjetos) {
			return <UserError error={errorProjetos} />;
		}

		if (isLoading) {
			return (
				<>
					<section className="w-full h-full flex flex-col justify-center">
						<nav className="flex flex-row items-center ml-6 mb-4 gap-2">
							<div className="w-32 h-10 tab:h-12 bg-[#122144]/50 animate-pulse rounded border border-white/20" />
						</nav>
						<div className="flex flex-row w-full items-center justify-center gap-2 h-full">
							<article className="flex flex-col des:flex-row gap-4 tab:gap-10 des:gap-[4.5rem] justify-center items-center">
								<figure className="flex w-1/2 h-full justify-center des:justify-end">
									<SkeletonRadial />
								</figure>
								<header className="flex justify-end items-end">
									<Card.Legenda legenda={legendasGraficosDireitos[0]}>
										<Texto.Raiz shadow className="text-3xl des:text-6xl">
											<Texto.Linha>
												<Texto.Forte.Oswald>Direitos</Texto.Forte.Oswald>
											</Texto.Linha>
											<Texto.Linha className="text-[#D974FD]">
												<Texto.Pequeno.Titillium>Violados</Texto.Pequeno.Titillium>
											</Texto.Linha>
										</Texto.Raiz>
									</Card.Legenda>
								</header>
							</article>
						</div>
					</section>

					<section className="w-full flex flex-col-reverse des:flex-row gap-6 des:gap-[4.5rem] justify-center items-center">
						<Card.Legenda legenda={legendasGraficosDireitos[1]}>
							<Texto.Raiz shadow className="text-3xl des:text-5xl">
								<Texto.Linha>
									<Texto.Forte.Oswald>Ideologia dos</Texto.Forte.Oswald>
								</Texto.Linha>
								<Texto.Linha className="text-[#FDFF78]">
									<Texto.Pequeno.Titillium>Projetos de Lei</Texto.Pequeno.Titillium>
								</Texto.Linha>
							</Texto.Raiz>
						</Card.Legenda>
						<figure>
							<SkeletonGraficoVertical />
						</figure>
					</section>

					<Carrossel projetos={[]} isProjetosLoading={true} />
				</>
			);
		}

		return (
			<>
				<DadosEstatisticos
					limparSearchParams={limparSearchParams}
					isPautaSelecionada={isPautaSelecionada}
					dadosRadial={direitos_violados_valores}
					dadosGraficoVertical={ideologias_valores}
					elementosDropdown={elementosDropdown}
					legenda={legendasGraficosDireitos}
				/>
				<Carrossel
					projetos={projetos_carrosel || []}
					isProjetosLoading={isLoadingProjetos}
				/>
			</>
		);
	};

	return (
		<MainLayout>
			<main className="flex flex-col h-full w-full gap-8 tab:gap-10 des:gap-24 justify-center items-center py-10">
				<motion.header
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
				>
					<Titulo pequeno="Violações e Ideologias" grande="dos Projetos de Lei" />
				</motion.header>
				{renderContent()}
			</main>
		</MainLayout>
	);
};