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
			className={`w-[70.5rem] h-[37.5rem] p-12 flex flex-row gap-14  bg-gradient-to-b from-[#122144] to-[#1A326E] rounded-[10px] border-2 border-[#AFC4F9] shadow-[#1A326E] shadow-xl  ${titilliumWeb.className}`}
		>
			<section>
				<div className="relative min-w-[21.875rem] min-h-[31.25rem]">
					<Image
						src={desenvolvedor.foto}
						alt={desenvolvedor.nome}
						fill
						className="rounded-[10px] object-cover border-2 border-[#91ADF4] select-none"
					/>
				</div>
			</section>
			<section className="flex flex-col w-full">
				<div className="w-full flex justify-end gap-4 select-none">
					{desenvolvedor.links.map((item) => {
						return <Redirecionamento link={item} key={item.site} />;
					})}
				</div>
				<section>
					<div className="flex flex-col gap-6">
						<p className={`text-[#91ADF4] ${oswald.className} text-6xl`}>
							{desenvolvedor.nome}
						</p>
						<p className={`text-3xl text-[#E1EAFF]`}>{desenvolvedor.funcao}</p>
					</div>
				</section>
				<div className="border-[#87D9FF] border-b-2 w-full my-8" />
				<div className="overflow-auto no-scrollbar">
					<p className="text-[#CDDBFF] text-2xl text-justify">
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
			className="flex justify-center items-center h-14 w-14 rounded-full hover:bg-[#4568BE]/25 duration-200- ease-in-out transition-colors"
			target="_blank"
		>
			{link.site == "github" ? (
				<FaGithub size={34} color="4568BE" />
			) : (
				<IconLattes />
			)}
		</a>
	);
};
export default CardBio;
