import CardStatus from "../cards/card-status";
import DropdownButton from "../dropdown/dropdown-button";
import MapaBrasil from "../icons/mapa-brasil";
import Loading from "../loading";
import UserError from "../user-erro";

import {
	DadosParlamentarProjetosEsfera,
	DadosPautaEsfera,
	DadosProjetoEstado,
} from "@/core/domain/dtos/dados.dto";

const dadosDropDown = [
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
	dadosMapa: DadosProjetoEstado[];
	dadosStatus: {
		dadosProjetoPoliticoPorEsfera: DadosParlamentarProjetosEsfera;
		dadosPautaEsfera: DadosPautaEsfera[];
	};
	isLoadingDadosMapa?: boolean;
	isLoadingDadosStatus?: boolean;
	errorMapa?: string;
	errorStatus?: string;
}

const GraficoMapa: React.FC<MapaBrasilProps> = ({
	isLoadingDadosMapa,
	isLoadingDadosStatus,
	dadosMapa,
	dadosStatus,
	errorMapa,
	errorStatus,
}) => {
	return (
		<article className="w-[80rem] h-[45.625rem] flex gap-2 ">
			<section className="h-[45.625rem] w-[43.75rem] min-w-1/2">
				{errorMapa && <UserError error={errorMapa} />}
				{isLoadingDadosMapa ? (
					<div className="h-full w-full flex items-center justify-center">
						<Loading />
					</div>
				) : (
					<MapaBrasil dados={dadosMapa} />
				)}
			</section>
			<section className="w-full h-full flex items-end justify-between">
				{errorStatus && <UserError error={errorStatus} />}
				{isLoadingDadosStatus ? (
					<Loading />
				) : (
					<div className="w-[25rem] h-full flex items-end">
						<CardStatus
							dadosParlamentarProjetosEsfera={
								dadosStatus.dadosProjetoPoliticoPorEsfera
							}
							dadosPautaEsfera={dadosStatus.dadosPautaEsfera}
						/>
					</div>
				)}
				<div className="bg- w-32 h-full">
					<DropdownButton
						elementos={dadosDropDown}
						titulo="Esfera"
						param="esfera"
						className="w-40"
					/>
				</div>
			</section>
		</article>
	);
};

export default GraficoMapa;
