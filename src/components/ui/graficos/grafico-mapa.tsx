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
		<article className="border-[2px] border-pink-500 w-fit h-fit flex flex-col">
			<div className="border-[2px] border-red-500 flex justify-end w-full des:w-full tab:mb-4 des:-mb-14">
				<DropdownButton
					elementos={dadosDropDown}
					titulo="Esfera"
					param="esfera"
					className="border-[2px] border-white w-40"
				/>
			</div>
			<section className="border-[2px] border-blue-500 flex flex-col des:flex-row tab:gap-6 des:gap-6 w-fit des:mr-62">
				<section className="border-[2px] border-yellow-500 h-fit w-fit">
					{errorMapa && <UserError error={errorMapa} />}
					{isLoadingDadosMapa ? (
						<div className="h-full w-full flex items-center justify-center">
							<Loading />
						</div>
					) : (
						<MapaBrasil dados={dadosMapa} />
					)}
				</section>
				{errorStatus && <UserError error={errorStatus} />}
				{isLoadingDadosStatus ? (
					<Loading />
				) : (
					<div className="border-[2px] border-green-500 flex items-end des:mt-100">
						<CardStatus
							dadosParlamentarProjetosEsfera={
								dadosStatus.dadosProjetoPoliticoPorEsfera
							}
							dadosPautaEsfera={dadosStatus.dadosPautaEsfera}
						/>
					</div>
				)}
			</section>
		</article>
	);
};

export default GraficoMapa;
