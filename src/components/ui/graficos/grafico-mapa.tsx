import CardStatus from "../cards/card-status";
import DropdownButton from "../dropdown/dropdown-button";
import MapaBrasil from "../icons/mapa-brasil";
import Loading from "../loading";

import { DadosProjetoEstado } from "@/core/domain/dtos/dados.dto";
import { mockStatus } from "@/mocks/mock-projetos";

const esferas = [
	{
		titulo: "Federal",
		value: "federal",
	},
	{
		titulo: "Estadual",
		value: "estadual",
	},
	{
		titulo: "Geral",
		value: "geral",
	},
];

interface MapaBrasilProps {
	dados: DadosProjetoEstado[];
	isLoading?: boolean;
	error?: string;
}

const GraficoMapa: React.FC<MapaBrasilProps> = ({
	dados,
	isLoading,
	error,
}) => {
	return (
		<article className="w-[80rem] h-[45.625rem] flex gap-2">
			<section className="h-[45.625rem] w-[43.75rem] min-w-1/2">
				{error && (
					<div className="h-full w-full text-2xl">
						<p className="text-red-500">
							{error || "ERRO AO CARREGAR INFORMAÇÕES DO MAPA..."}
						</p>
						<p className="text-red-500">
							Não é culpa sua, é um erro no servidor. Tente novamente mais
							tarde.
						</p>
					</div>
				)}
				{isLoading ? (
					<div className="h-full w-full flex items-center justify-center">
						<Loading />
					</div>
				) : (
					<MapaBrasil dados={dados} />
				)}
			</section>
			<section className="w-full h-full flex items-end justify-between">
				<div className="w-[25rem] h-full flex items-end">
					<CardStatus status={mockStatus} />
				</div>
				<div className="bg- w-32 h-full">
					<DropdownButton elementos={esferas} titulo="Esfera" />
				</div>
			</section>
		</article>
	);
};

export default GraficoMapa;
