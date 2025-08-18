import { FaInstagram } from "react-icons/fa6";
import { IoLogoGithub } from "react-icons/io";
import Image from "next/image";

const FooterBar: React.FC = () => {
	return (
		<footer className="flex flex-col tab:flex-row des:flex-row gap-6 tab:gap-10 p-6 tab:p-8 des:p-12 des:gap-32 w-full h-full bg-gradient-to-r items-start tab:items-center des:items-center justify-center tab:justify-start des:justify-start from-[#050B17] to-[#122144] text-white">
			<div className="flex flex-col gap-1 tab:gap-2 des:gap-6">
				<span className="text-3xl tab:text-5xl des:text-6xl logo"></span>
				<p className="max-w-full text-lg tab:text-base des:text-xl">
					Observatório Digital de Discurso e Direitos Humanos LGBTI+
				</p>
			</div>

			<div className="flex flex-col des:flex-row gap-4 des:gap-10 tab:gap-6 tab2:gap-6">
				<div className="flex flex-col gap-2 tab:gap-2 des:gap-8">
					<p className="text-xl tab:text-xl des:text-3xl">Apoio</p>
					<div className="flex flex-row tab2:flex-row tab:flex-col gap-4 tab:gap-2 tab2:gap-4 des:gap-8">
						<Image
							src="/assets/images/nexus-logo.svg"
							className="w-20 h-6 tab:w-30 tab:h-11 des:w-36 des:h-11"
							alt="Nexus Logo"
							width={178}
							height={29}
						/>
						<Image
							src="/assets/images/ifal-logo.svg"
							className="w-20 h-6 tab:w-30 tab:h-11 des:w-36 des:h-11"
							width={150}
							height={42}
							alt="Ifal Logo"
						/>
					</div>
				</div>

				<div className="flex gap-2 tab:gap-4 des:gap-8 items-center">
					<div className="text-[1.5rem] tab:text-[2rem] des:text-[3rem]">
						<FaInstagram />
					</div>
					<div className="text-[1.5rem] tab:text-[2rem] des:text-[3rem]">
						<IoLogoGithub />
					</div>
				</div>
			</div>
		</footer>
	);
};

export default FooterBar;
