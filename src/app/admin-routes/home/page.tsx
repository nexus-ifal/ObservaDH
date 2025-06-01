import Link from "next/link";

import { oswald } from "@/core/lib/fonts/fonts";

const page: React.FC = () => {
	return (
		<div className="fundo-login flex items-center justify-center h-screen w-screen md:h-screen">
			<div className="flex flex-col gap-8 items-center justify-center w-fit">
				<h2 className={`${oswald.className} text-[50px] text-white`}>
					Escolha uma das opções abaixo
				</h2>
				<div className="flex gap-4 justify-center w-full">
					<Link href="/admin-routes/cadastro-usuario" passHref>
						<button
							className={`bg-[#121A2B] w-[200px] rounded-[4px] border-[2px] border-[#2C52A4] ${oswald.className} text-[#91ADF4] text-[30px] font-medium w-fit shadow-lg shadow-[#2C52A4]/40 p-2 hover:cursor-pointer hover:bg-[#2C52A4] hover:border-[#121A2B] hover:text-[#121A2B] transition-colors duration-300`}
						>
							Cadastrar um novo usuário
						</button>
					</Link>
					<Link href="/user-routes/home" passHref>
						<button
							className={`bg-[#121A2B] w-[200px] rounded-[4px] border-[2px] border-[#2C52A4] ${oswald.className} text-[#91ADF4] text-[30px] font-medium w-fit shadow-lg shadow-[#2C52A4]/40 p-2 hover:cursor-pointer hover:bg-[#2C52A4] hover:border-[#121A2B] hover:text-[#121A2B] transition-colors duration-300`}
						>
							Edição dos dados do site
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default page;
