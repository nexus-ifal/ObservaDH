"use client";
import { motion } from "framer-motion";
import Card from "@/components/ui/cards";
import MainLayout from "@/components/ui/layouts/main-layout";
import {
	apresentacao,
	cardsEsfera,
	cardsInformativos,
	comoFunciona,
	estatisticas,
	marcoHistorico,
} from "../content/content-home";

import { FiArrowRight } from "react-icons/fi";

//render
const Page: React.FC = () => {
	return (
		<MainLayout>
			<main className="flex h-full w-full justify-center py-10 overflow-hidden">
				<article className="w-10/12 flex-col items-center flex gap-16 tab:gap-20 des:gap-24 justify-center">
					<section className="w-full flex justify-center">
						<Card.Apresentacao
							titulo={apresentacao.titulo}
							subtitulo={apresentacao.subtitulo}
							cor={apresentacao.cor}
						>
							<p>{apresentacao.texto}</p>
						</Card.Apresentacao>
					</section>

					<SecaoEstatisticas />

					<section className="flex w-full flex-col gap-10 tab:gap-12 des:gap-16">
						{cardsEsfera.map((card, index) => (
							<motion.article
								key={card.rota}
								initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
								whileInView={{ opacity: 1, x: 0 }}
								transition={{ duration: 0.6, ease: "easeOut" }}
								viewport={{ once: true, amount: 0.2 }}
								className={`flex w-full flex-col gap-6 tab:justify-between tab:gap-10 ${index % 2 !== 0 ? "tab:flex-row-reverse" : "tab:flex-row"
									}`}
							>
								<div className="flex">
									<Card.Esfera
										cor={card.cor}
										rota={card.rota}
										texto={card.texto}
										titulo={card.titulo}
										subtitulo={card.subtitulo}
									/>
								</div>
							</motion.article>
						))}
					</section>

					<SecaoComoFunciona />

					<SecaoTimeline />

					<section className="w-full flex flex-col items-center gap-6 tab:flex-col tab:gap-12 des:flex-row des:justify-evenly des:gap-8">
						{cardsInformativos.map((item, index) => (
							<motion.article
								key={item.titulo}
								initial={{ opacity: 0, y: 50 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5, delay: index * 0.1 }}
								viewport={{ once: true }}
								className="w-full flex justify-center"
							>
								<Card.Informativo
									rota={item.rota}
									subtitulo={item.subtitulo}
									texto={item.texto}
									titulo={item.titulo}
									corTexto={item.cor}
									isSubtitleHTML={item.isSubtitleHTML}
								/>
							</motion.article>
						))}
					</section>

					<SecaoCTA />
				</article>
			</main>
		</MainLayout>
	);
};

export default Page;


const SecaoEstatisticas: React.FC = () => {
	return (
		<section className="w-full">
			<motion.header
				initial={{ opacity: 0, y: 30 }}
				whileInView={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6 }}
				viewport={{ once: true }}
				className="text-center mb-10"
			>
				<h2 className="text-2xl tab:text-3xl font-bold text-white mb-3">
					O cenário que nos move
				</h2>
				<p className="text-sm tab:text-base text-white/60 max-w-2xl mx-auto">
					Dados que justificam a urgência do monitoramento legislativo e da
					transparência democrática.
				</p>
			</motion.header>
			<article className="grid grid-cols-1 tab:grid-cols-2 des:grid-cols-4 gap-4 tab:gap-6">
				{estatisticas.map((item, index) => (
					<motion.div
						key={item.label}
						initial={{ opacity: 0, y: 40 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: index * 0.1 }}
						viewport={{ once: true }}
						className="rounded-sm border border-white p-6 flex flex-col gap-2 bg-black/30"
					>
						<span className="text-3xl tab:text-4xl font-extrabold tracking-tight leading-none text-white">
							{item.valor}
						</span>
						<p className="text-sm leading-snug text-white/75">{item.label}</p>
						<span className="text-xs text-white/50 mt-auto pt-2 border-t border-white/10">
							Fonte: {item.fonte}
						</span>
					</motion.div>
				))}
			</article>
		</section>
	);
};

const SecaoComoFunciona: React.FC = () => {
	return (
		<section className="w-full">
			<motion.header
				initial={{ opacity: 0, y: 30 }}
				whileInView={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6 }}
				viewport={{ once: true }}
				className="text-center mb-10"
			>
				<h2 className="text-2xl tab:text-3xl font-bold text-white mb-3">
					Como funciona
				</h2>
				<p className="text-sm tab:text-base text-white/60 max-w-2xl mx-auto">
					Uma metodologia combinada de coleta, análise e visualização para
					transformar dados legislativos em informação cidadã.
				</p>
			</motion.header>
			<article className="grid grid-cols-1 tab:grid-cols-2 gap-5 tab:gap-6">
				{comoFunciona.map((etapa, index) => (
					<motion.div
						key={etapa.numero}
						initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.5, delay: index * 0.1 }}
						viewport={{ once: true }}
						className="flex gap-5 p-6 rounded-sm border border-white bg-black/30"
					>
						<div className="shrink-0 flex flex-col items-center gap-2 text-white">
							<span className="text-xs font-bold text-white/40 tracking-widest">
								{etapa.numero}
							</span>
							<div className="text-white/70">{<etapa.icone size={24} />}</div>
						</div>
						<div>
							<h3 className="font-bold text-base tab:text-lg mb-1 text-white">
								{etapa.titulo}
							</h3>
							<p className="text-sm text-white/65 leading-relaxed">
								{etapa.descricao}
							</p>
						</div>
					</motion.div>
				))}
			</article>
		</section>
	);
};

const SecaoTimeline: React.FC = () => {
	return (
		<section className="w-full">
			<motion.header
				initial={{ opacity: 0, y: 30 }}
				whileInView={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6 }}
				viewport={{ once: true }}
				className="text-center mb-12"
			>
				<h2 className="text-2xl tab:text-3xl font-bold text-white mb-3">
					Marcos históricos
				</h2>
				<p className="text-sm tab:text-xl text-white/60 max-w-2xl mx-auto">
					Uma linha do tempo que contextualiza a urgência deste observatório.
				</p>
			</motion.header>

			<ol className="relative flex flex-col">
				<div className="absolute left-[52px] tab:left-[72px] top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/30 to-transparent" />

				{marcoHistorico.map((marco, index) => {
					const isLast = index === marcoHistorico.length - 1;

					return (
						<motion.li
							key={marco.ano}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: index * 0.12 }}
							viewport={{ once: true }}
							className="flex gap-5 tab:gap-8 items-start py-5 tab:py-6 group"
						>
							<div className="shrink-0 w-[44px] tab:w-[64px] text-right pt-0.5">
								<span className="text-xs tab:text-lg font-extrabold tracking-tight transition-colors duration-300 text-white">
									{marco.ano}
								</span>
							</div>

							<div className="shrink-0 relative z-10 mt-1">
								<div
									className={`w-3 h-3 rounded-full transition-all duration-300 ${isLast
										? "bg-white shadow-[0_0_10px_2px_rgba(255,255,255,0.4)] border-2 border-white"
										: "bg-transparent border-2 border-white group-hover:border-white/80"
										}`}
								/>
							</div>

							<div
								className={`flex-1 pb-6 border-b transition-colors duration-300 ${isLast
									? "border-white/10"
									: "border-white/5 group-hover:border-white/10"
									}`}
							>
								<p
									className={`text-sm tab:text-lg leading-relaxed transition-colors duration-300 ${isLast
										? "text-white font-medium"
										: "text-white/65 group-hover:text-white/85"
										}`}
								>
									{marco.evento}
								</p>
							</div>
						</motion.li>
					);
				})}
			</ol>
		</section>
	);
};

const SecaoCTA: React.FC = () => {
	return (
		<motion.section
			initial={{ opacity: 0, y: 40 }}
			whileInView={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.7 }}
			viewport={{ once: true }}
			className="w-full rounded-sm border border-white/15 bg-white/5 p-8 tab:p-12 des:p-16 flex flex-col des:flex-row items-center gap-8 text-center des:text-left"
		>
			<header className="flex-1">
				<h2 className="text-2xl tab:text-3xl font-bold text-white mb-3">
					Fiscalize. Informe-se. Participe.
				</h2>
				<p className="text-sm tab:text-base text-white/60 max-w-xl leading-relaxed">
					O Observatório é uma ferramenta pública e gratuita. Explore as
					proposições legislativas, acompanhe os dados e contribua para uma
					democracia mais transparente e inclusiva.
				</p>
			</header>
			<nav className="flex flex-col tab:flex-row gap-3 shrink-0 w-full tab:w-auto items-center">
				<a
					href="/projetos"
					className="group flex items-center justify-center w-full tab:w-auto gap-0 overflow-hidden px-7 py-3 rounded-sm font-semibold text-sm text-white border border-white hover:border-black hover:bg-white hover:text-black transition-all hover:shadow"
				>
					Ver projetos
					<span className="flex w-0 overflow-hidden transition-all duration-300 group-hover:w-5 group-hover:ml-2">
						<FiArrowRight size={20} />
					</span>
				</a>
				<a
					href="/sobre"
					className="group flex items-center justify-center w-full tab:w-auto gap-0 overflow-hidden px-7 py-3 rounded-sm font-semibold text-sm text-white border border-white hover:border-black hover:bg-white hover:text-black transition-all hover:shadow"
				>
					Sobre o projeto
					<span className="flex w-0 overflow-hidden transition-all duration-300 group-hover:w-5 group-hover:ml-2">
						<FiArrowRight size={20} />
					</span>
				</a>
			</nav>
		</motion.section>
	);
};