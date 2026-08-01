import { FaEnvelope, FaGithub } from "react-icons/fa6";
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
			className={`w-full flex flex-col tab:flex-row bg-gradient-to-br from-[#091020] to-[#0d1938] rounded-sm border border-[#AFC4F9]/30 shadow-lg overflow-hidden ${titilliumWeb.className}`}
		>
			<section className="relative w-full tab:w-[40%] min-h-[250px] tab:min-h-full">
				<Image
					src={desenvolvedor.foto}
					alt={desenvolvedor.nome}
					fill
					className="object-cover select-none"
				/>
			</section>
			<section className="flex flex-col flex-1 p-6 tab:p-8 justify-between">
				<div>
					<div className="flex flex-col gap-1 mb-4">
						<p
							className={`text-[#91ADF4] ${oswald.className} text-2xl tab:text-3xl des:text-4xl tracking-wide`}
						>
							{desenvolvedor.nome}
						</p>
						<p className="text-sm tab:text-base text-[#E1EAFF]/80 font-light">
							{desenvolvedor.funcao}
						</p>
					</div>

					<div className="border-b border-white/10 w-full mb-4" />

					<p className="text-[#CDDBFF] text-sm tab:text-base text-justify leading-relaxed mb-6">
						{desenvolvedor.bio}
					</p>
				</div>

				<div className="flex items-center gap-3 mt-auto">
					{desenvolvedor.links.map((item) => (
						<Redirecionamento link={item} key={item.site} />
					))}

					{desenvolvedor.contatos && (
						<a
							href={`mailto:${desenvolvedor.contatos}`}
							className="flex justify-center items-center h-10 w-10 rounded-xl bg-[#4568BE]/20 hover:bg-[#4568BE]/50 duration-200 transition-colors group"
							title={`Enviar email para ${desenvolvedor.contatos}`}
						>
							<FaEnvelope className="text-[#91ADF4] text-xl group-hover:text-white transition-colors" />
						</a>
					)}
				</div>
			</section>
		</div>
	);
};

interface RedirecionamentoProps {
	link: LinkType;
}

const Redirecionamento: React.FC<RedirecionamentoProps> = ({ link }) => {
	return (
		<a
			href={link.link}
			className="flex justify-center items-center h-10 w-10 rounded-xl bg-[#4568BE]/20 hover:bg-[#4568BE]/50 duration-200 transition-colors group"
			target="_blank"
			rel="noreferrer"
		>
			{link.site === "github" ? (
				<FaGithub className="text-[#91ADF4] text-2xl group-hover:text-white transition-colors" />
			) : (
				<div className="w-6 h-6 opacity-80 group-hover:opacity-100 transition-opacity">
					<IconLattes />
				</div>
			)}
		</a>
	);
};

export default CardBio;
