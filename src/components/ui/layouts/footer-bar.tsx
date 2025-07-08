import { FaInstagram } from "react-icons/fa6";
import { IoLogoGithub } from "react-icons/io";
import Image from "next/image";

const FooterBar: React.FC = () => {
	return (
		<footer className="w-full h-full bg-gradient-to-r items-center from-[#050B17] to-[#122144] text-white flex p-12 gap-32">
			<div className="">
				<span className="text-6xl logo"></span>
				<p className="text-xl">
					Observatório Digital de Discurso e Direitos Humanos LGBTI+
				</p>
			</div>
			<div className="flex flex-col  gap-8">
				<p className="text-3xl">Apoio</p>
				<div className="flex gap-8">
					<Image
						src="/assets/images/nexus-logo.svg"
						className="w-36 h-11"
						alt="Nexus Logo"
						width={178}
						height={29}
					/>
					<Image
						src="/assets/images/ifal-logo.svg"
						className="w-36 h-11"
						width={150}
						height={42}
						alt="Ifal Logo"
					/>
				</div>
			</div>
			<div className="bg-  ">
				<div className="flex gap-8">
					<FaInstagram size={48} />
					<IoLogoGithub size={48} />
				</div>
			</div>
		</footer>
	);
};

export default FooterBar;
