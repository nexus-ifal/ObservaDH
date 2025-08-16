import { FaGithub } from "react-icons/fa6";
import Image from "next/image";

import { oswald, titilliumWeb } from "../../../fonts/fonts";
import IconLattes from "../icons/icon-lattes";

import { Desenvolvedor } from "@/core/domain/types/desenvolvedor";
import { LinkType } from "@/core/domain/types/link-type";

interface CardBioProps {
	desenvolvedor: Desenvolvedor;
}

const CardBio: React.FC<CardBioProps> = ({ desenvolvedor }) => {
	return (
		<div
			className={`w-fit h-fit p-6 tab:p-8 des:p-12 flex flex-col justify-center items-center tab:flex-row gap-2 tab:gap-6 des:gap-14 bg-gradient-to-b from-[#122144] to-[#1A326E] rounded-[10px] border-2 border-[#AFC4F9] shadow-[#1A326E] shadow-xl  ${titilliumWeb.className}`}
		>
			<section>
				<div className="relative h-[20rem] w-[17.8rem] tab:w-[18.5rem] des:w-[21.875rem] tab:h-[31.25rem]">
					<Image
						src={desenvolvedor.foto}
						alt={desenvolvedor.nome}
						fill
						className="rounded-[10px] object-cover border-2 border-[#91ADF4] select-none"
					/>
				</div>
			</section>
			<section className="flex flex-col w-fit">
				<div className="w-full flex justify-end gap-1 tab:gap-4 select-none -mb-[34px] tab:mb-4 ">
					{desenvolvedor.links.map((item) => {
						return <Redirecionamento link={item} key={item.site} />;
					})}
				</div>
				<section>
					<div className="flex flex-col gap-2 tab:gap-6 w-fit">
						<p
							className={`text-[#91ADF4] ${oswald.className} text-xl tab:text-3xl des:text-6xl`}
						>
							{desenvolvedor.nome}
						</p>
						<p className={`text-sm tab:text-lg des:text-3xl text-[#E1EAFF]`}>
							{desenvolvedor.funcao}
						</p>
					</div>
				</section>
				<div className="border-[#87D9FF] border-b-2 w-full my-3 tab:my-8" />
				<div className="overflow-auto no-scrollbar">
					<p className="text-[#CDDBFF] tab:text-lg des:text-2xl w-70 tab:w-76 des:w-120 text-justify">
						{desenvolvedor.bio}
					</p>
				</div>
			</section>
		</div>
	);
};

interface redirecionamentoProps {
	link: LinkType;
}

const Redirecionamento: React.FC<redirecionamentoProps> = ({ link }) => {
	return (
		<a
			href={link.link}
			className="flex justify-center items-center h-8 w-8 tab:h-14 tab:w-14 rounded-full hover:bg-[#4568BE]/25 duration-200- ease-in-out transition-colors"
			target="_blank"
		>
			{link.site == "github" ? (
				<div className="text-[26px] tab:text-[36px] ">
					<FaGithub color="#4568BE" />
				</div>
			) : (
				<div className="w-6 h-6 tab:w-9 tab:h-9 ">
					<IconLattes />
				</div>
			)}
		</a>
	);
};
export default CardBio;
