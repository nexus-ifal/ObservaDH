import Image from "next/image";

import MainLayout from "@/components/ui/layouts/main-layout";

import { sobre } from "@/content/content-sobre";

const page: React.FC = () => {
	//render
	return (
		<MainLayout>
			<div className="flex h-full w-full flex-col gap-[4.25rem] items-center px-36 text-white text-3xl text-justify">
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
		<div className="flex flex-col gap-[4.5rem]">
			<article>
				<p>{textoLongo}</p>
			</article>
			<article
				className={`flex h-auto gap-10 ${isReverse ? "flex-row-reverse" : ""}`}
			>
				<section className="">
					<div className="relative min-w-[32.5rem] min-h-[30rem] w-[32.5rem] h-[30rem] rounded-[10px] border-2 border-[#87D9FF] overflow-hidden">
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
