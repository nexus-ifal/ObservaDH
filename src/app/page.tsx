import Card from "@/components/ui/cards";
import MainLayout from "@/components/ui/layouts/main-layout";

import {
	apresentacao,
	cardsEsfera,
	cardsInformativos,
} from "../content/content-home";

const page: React.FC = () => {
	//render
	return (
		<MainLayout>
			<div className="flex h-full w-full flex-col gap-24 items-center">
				<article className="w-full h-auto flex justify-center">
					<Card.Apresentacao
						titulo={apresentacao.titulo}
						subtitulo={apresentacao.subtitulo}
						cor={apresentacao.cor}
					>
						<p>{apresentacao.texto}</p>
					</Card.Apresentacao>
				</article>

				<article
					className="w-9/12 h-auto flex flex-col gap-16"
					id=" CARDS DE REDIRECIONAMENTO - PLS "
				>
					{cardsEsfera.map((card, index) => (
						<div
							key={index}
							className={`w-full flex ${
								index % 2 === 0 ? "justify-start" : "justify-end"
							}`}
						>
							<Card.Esfera
								cor={card.cor}
								rota={card.rota}
								texto={card.texto}
								titulo={card.titulo}
								subtitulo={card.subtitulo}
							/>
						</div>
					))}
				</article>

				<article className="flex w-full flex-col items-center px-[5rem] gap-24 xl:flex-row xl:justify-evenly">
					{cardsInformativos.map((item) => (
						<Card.Informativo
							key={item.titulo}
							rota={item.rota}
							subtitulo={item.subtitulo}
							texto={item.texto}
							titulo={item.titulo}
							corTexto={item.cor}
							isSubtitleHTML={item.isSubtitleHTML}
						/>
					))}
				</article>
			</div>
		</MainLayout>
	);
};

export default page;
