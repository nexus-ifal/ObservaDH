import { oswald } from "../../../fonts/fonts";

interface itemRenderProps {
	titulo: string;
	valor: string;
	className?: string;
	corTexto?: string;
	corSegundoTexto?: string;
}

const CardItemRenderizacao: React.FC<itemRenderProps> = ({
	titulo,
	valor,
	className,
	corTexto,
	corSegundoTexto,
}) => {
	return (
		<p className={`text-2xl  ${className} ${oswald.className}`}>
			<span className={`mr-2  ${corTexto ? corTexto : "text-[#AFC4F9]"}`}>
				{titulo}
				{":"}
			</span>
			<span
				className={`truncate ${
					corSegundoTexto ? corSegundoTexto : "text-white"
				} `}
			>
				{valor}
			</span>
		</p>
	);
};

export default CardItemRenderizacao;
