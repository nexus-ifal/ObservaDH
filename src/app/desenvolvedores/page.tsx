import Card from "@/components/ui/cards";
import MainLayout from "@/components/ui/layouts/main-layout";

import { infoDevs } from "@/content/content-desenvolvedores";

const desenvolvedores: React.FC = () => {
	//render
	return (
		<MainLayout>
			<div className="flex flex-col h-full w-full gap-24 px-11 items-center">
				<section className="flex flex-col gap-20">
					{infoDevs.map((item) => {
						const safeItem = {
							...item,
							links: item.links.map((link) => ({
								...link,
								site: link.site ?? "",
								link: link.link ?? "",
								imagem: link.imagem ?? "",
							})),
						};
						return <Card.Bio key={item.nome} desenvolvedor={safeItem} />;
					})}
				</section>
			</div>
		</MainLayout>
	);
};
export default desenvolvedores;
