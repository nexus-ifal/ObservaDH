import Image from "next/image";

import MainLayout from "@/components/ui/layouts/main-layout";

import { sobre } from "@/content/content-sobre";

const page: React.FC = () => {
	//render
	return (
		<MainLayout>
			<div className="flex h-full w-full flex-col gap-6 tab:gap-10 des:gap-[4.25rem] items-center px-6 tab:px-8 des:px-36 text-white text-lg tab:text-xl des:text-3xl text-justify">
				{sobre.map((item, index) => {
					return (
						<Sobre
							key={index}
							isReverse={index % 2 == 0 ? true : false}
							textoLongo={item.textoLongo}
							texto={item.texto}
							urlImagem={item.urlImagem}
						/>
					);
				})}
			</div>
		</MainLayout>
	);
};

interface sobreProps {
	textoLongo: string;
	texto: string;
	urlImagem: string;
	isReverse?: boolean;
}

const Sobre: React.FC<sobreProps> = ({
	texto,
	textoLongo,
	urlImagem,
	isReverse,
}) => {
	return (
		<div className="flex flex-col gap-6 tab:gap-10 des:gap-[4.5rem]">
			<article>
				<p>{textoLongo}</p>
			</article>
			<article
				className={`flex flex-col tab:flex-row h-auto gap-4 tab:gap-6 des:gap-10 ${isReverse ? "flex-col-reverse tab:flex-row-reverse" : ""}`}
			>
				<section className="">
					<div className="relative w-[19rem] h-[21rem] tab:h-[23rem] des:w-[32.5rem] des:h-[30rem] rounded-[10px] border-2 border-[#87D9FF] overflow-hidden">
						<Image
							src={urlImagem}
							alt="imagem de apresentação"
							fill
							style={{ objectFit: "cover" }}
							className="select-none"
						/>
					</div>
				</section>
				<section className="">
					<p className="">{texto}</p>
				</section>
			</article>
		</div>
	);
};

export default page;
