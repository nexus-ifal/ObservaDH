import { LuMousePointerClick } from "react-icons/lu";
import { titilliumWeb } from "../../../fonts/fonts";
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
		<article className="w-fit h-fit flex flex-col">
			<div className="flex justify-end w-full des:w-full mb-4 des:-mb-14">
				<DropdownButton
					elementos={dadosDropDown}
					titulo="Esfera"
					param="esfera"
					className="text-xs tab:text-base des:text-lg font-medium w-24 tab:w-38 des:w-38"
					classNameContent="text-xs tab:text-base des:text-lg font-medium"
				/>
			</div>
			<section className="flex flex-col des:flex-row gap-6 tab:gap-6 des:gap-6 w-fit des:mr-62">
				<section className="w-[340px] h-[360px] tab:h-[639.04297px] tab:w-[612.51611px] des:h-[639.04297px] des:w-[612.51611px]">
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
					<div className="flex items-end des:mt-100">
						<CardStatus
							dadosParlamentarProjetosEsfera={
								dadosStatus.dadosProjetoPoliticoPorEsfera
							}
							dadosPautaEsfera={dadosStatus.dadosPautaEsfera}
						/>
					</div>
				)}
			</section>
			<p
				className={`mt-4 des:-mt-6 text-xl des:text-2xl text-white ${titilliumWeb.className}`}
			>
				<span className="hidden des:flex items-center gap-2">
					<LuMousePointerClick />
					Passe o mouse sobre o mapa ou clique
				</span>
				<span className="des:hidden">*Clique no mapa</span>
			</p>
		</article>
	);
};

export default GraficoMapa;
