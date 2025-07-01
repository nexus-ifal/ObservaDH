import Card from "@/components/ui/cards";
import MainLayout from "@/components/ui/layouts/main-layout";

import { infoDevsMock } from "@/content/content-desenvolvedores";

const desenvolvedores: React.FC = () => {
	//render
	return (
		<MainLayout>
			<div className="flex flex-col h-full w-full gap-24 px-11 items-center">
				<section className="flex flex-col gap-20">
					{infoDevsMock.map((item) => {
						return <Card.Bio key={item.nome} desenvolvedor={item} />;
					})}
				</section>
			</div>
		</MainLayout>
	);
};
export default desenvolvedores;
