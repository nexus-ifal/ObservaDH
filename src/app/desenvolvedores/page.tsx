import Card from "@/components/ui/cards";
import MainLayout from "@/components/ui/layouts/main-layout";

import { infoDevs } from "@/content/content-desenvolvedores";

const Desenvolvedores: React.FC = () => {
	return (
		<MainLayout>
			<div className="flex flex-col h-full w-full px-2 tab:px-8 py-10 items-center">
				<section className="grid grid-cols-1 des:grid-cols-2 gap-4 tab:gap-8 w-full">
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
export default Desenvolvedores;
