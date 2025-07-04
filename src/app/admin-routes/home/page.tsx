import Link from "next/link";
import { BotaoAdmin } from "@/components/ui/botao/botao";

import { oswald } from "@/fonts/fonts";

const page: React.FC = () => {
	return (
		<div className="fundo-login flex items-center justify-center h-screen w-screen md:h-screen">
			<div className="flex flex-col items-center justify-center gap-8 w-fit">
				<h2 className={`${oswald.className} text-[50px] text-white`}>
					Escolha uma das opções abaixo
				</h2>
				<div className="flex flex-col gap-4 justify-center items-center w-full">
					<Link href="/admin-routes/acoes-usuario" passHref>
						<BotaoAdmin texto={"Modificações para usuários"} />
					</Link>
					<Link href="/user-routes/home" passHref>
						<BotaoAdmin texto="Modificações para dados" />
					</Link>
				</div>
			</div>
		</div>
	);
};

export default page;
