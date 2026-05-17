"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import MainLayout from "@/components/ui/layouts/main-layout";
import { sobre } from "@/content/content-sobre";

//render
const Page: React.FC = () => {
	return (
		<MainLayout>
			<main className="flex w-full flex-col items-center px-6 tab:px-12 des:px-36 pt-14 pb-24 des:pt-20 des:pb-32 gap-16 tab:gap-24 des:gap-32">
				{sobre.map((item, index) => (
					<Sobre
						key={index}
						index={index}
						isReverse={index % 2 !== 0}
						textoLongo={item.textoLongo}
						texto={item.texto}
						urlImagem={item.urlImagem}
						isLast={index === sobre.length - 1}
					/>
				))}
			</main>
		</MainLayout>
	);
};

export default Page;

interface SobreProps {
	textoLongo: string;
	texto: string;
	urlImagem: string;
	isReverse?: boolean;
	index: number;
	isLast?: boolean;
}

const Sobre: React.FC<SobreProps> = ({
	texto,
	textoLongo,
	urlImagem,
	isReverse,
	index,
	isLast,
}) => {
	const sectionNumber = String(index + 1).padStart(2, "0");

	return (
		<motion.article
			initial={{ opacity: 0, y: 50 }}
			whileInView={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.6, ease: "easeOut" }}
			viewport={{ once: true, amount: 0.2 }}
			className="w-full flex flex-col gap-8 tab:gap-12"
		>
			<motion.header
				initial={{ opacity: 0, scaleX: 0.8 }}
				whileInView={{ opacity: 1, scaleX: 1 }}
				transition={{ duration: 0.5, delay: 0.2 }}
				viewport={{ once: true }}
				className="flex items-center gap-4 group origin-left"
			>
				<span className="font-mono text-sm tracking-[0.3em] text-[#D974FD] font-bold">
					&lt;{sectionNumber}/&gt;
				</span>
				<div className="h-px flex-1 bg-gradient-to-r from-[#D974FD]/30 to-transparent" />
			</motion.header>

			<section
				className={`flex flex-col des:grid des:grid-cols-12 gap-8 tab:gap-12 des:gap-16 items-start ${isReverse ? "des:dir-rtl" : ""
					}`}
				style={{ direction: isReverse ? "rtl" : "ltr" }}
			>
				<motion.figure
					initial={{ opacity: 0, x: isReverse ? 50 : -50 }}
					whileInView={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.6, delay: 0.3 }}
					viewport={{ once: true }}
					className="w-full des:col-span-5 group/img"
					style={{ direction: "ltr" }}
				>
					<div className="relative w-full h-[18rem] tab:h-[26rem] des:h-[32rem] overflow-hidden rounded-sm bg-[#121A2B] border border-white/5 shadow-2xl">
						<span
							className={`absolute top-2 w-4 h-4 border-t border-[#D974FD]/60 z-10 ${isReverse ? "right-2 border-r" : "left-2 border-l"
								}`}
						/>
						<span
							className={`absolute bottom-2 w-4 h-4 border-b border-[#D974FD]/60 z-10 ${isReverse ? "left-2 border-l" : "right-2 border-r"
								}`}
						/>

						<Image
							src={urlImagem}
							alt="Imagem de apresentação"
							fill
							sizes="(max-width: 768px) 100vw, 50vw"
							style={{ objectFit: "cover" }}
							className="select-none transition-transform duration-700 ease-out group-hover/img:scale-105 filter brightness-95 group-hover/img:brightness-100"
						/>
						<div className="absolute inset-0 bg-gradient-to-t from-[#0b0f19]/20 to-transparent pointer-events-none " />
					</div>
				</motion.figure>

				<motion.div
					initial={{ opacity: 0, x: isReverse ? -50 : 50 }}
					whileInView={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.6, delay: 0.4 }}
					viewport={{ once: true }}
					className="w-full des:col-span-7 flex flex-col gap-6 tab:gap-8"
					style={{ direction: "ltr" }}
				>
					<div className="relative border-l-2 border-[#D974FD] pl-4 tab:pl-6 py-1">
						<p className="text-white text-lg tab:text-xl des:text-[1.25rem] leading-[1.75] font-normal text-left tab:text-justify">
							{textoLongo}
						</p>
					</div>

					<p className="text-slate-300 text-sm tab:text-base des:text-[1.05rem] leading-[1.85] font-light text-left tab:text-justify opacity-90">
						{texto}
					</p>
				</motion.div>
			</section>

			{!isLast && (
				<motion.footer
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					transition={{ duration: 0.5, delay: 0.5 }}
					viewport={{ once: true }}
					className="w-full pt-12 des:pt-16"
				>
					<div className="flex items-center justify-center gap-3 opacity-40">
						<div className="w-12 h-px bg-gradient-to-r from-transparent to-[#D974FD]" />
						<span className="w-1 h-1 rounded-full bg-[#D974FD]" />
						<div className="w-12 h-px bg-gradient-to-l from-transparent to-[#D974FD]" />
					</div>
				</motion.footer>
			)}
		</motion.article>
	);
};