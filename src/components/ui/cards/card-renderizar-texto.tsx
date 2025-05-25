import { oswald, titilliumWeb } from "../../../core/lib/fonts/fonts";

interface RenderizarTextoProps {
	titulo: string;
	conteudo: string;
	className?: string;
}

const CardRenderizarTexto: React.FC<RenderizarTextoProps> = ({
	titulo,
	conteudo,
	className,
}) => {
	return (
		<h3 className={`flex flex-row items-center gap-4 ${className}`}>
			<span
				className={`${oswald.className} font-normal text-3xl text-[#AFC4F9]`}
			>
				{titulo}:
			</span>
			<span
				className={`${titilliumWeb.className} font-normal text-xl text-white`}
			>
				{conteudo}
			</span>
		</h3>
	);
};

export default CardRenderizarTexto;
