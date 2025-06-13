import Link from "next/link";

import { BotaoAdminUser } from "@/components/ui/botao/botao";

import { oswald } from "@/core/lib/fonts/fonts";

const page: React.FC = () => {
	return (
		<div className="fundo-login flex items-center justify-center h-screen w-screen md:h-screen">
			<div className="flex flex-col items-center justify-center gap-8 w-fit">
				<h2 className={`${oswald.className} text-[50px] text-white`}>
					Escolha uma das opções para continuar
				</h2>
				<div className="flex gap-6 justify-center items-center w-full">
					<Link href="/admin-routes/cadastro-usuario" passHref>
						<BotaoAdminUser texto={"Cadastrar"} />
					</Link>
					<Link href="/admin-routes/exclusao-usuario" passHref>
						<BotaoAdminUser texto="Excluir" />
					</Link>
					<Link href="/user-routes/home" passHref>
						<BotaoAdminUser texto="Atualizar" />
					</Link>
					<Link href="/user-routes/home" passHref>
						<BotaoAdminUser texto="Visualizar" />
					</Link>
				</div>
			</div>
		</div>
	);
};

export default page;
