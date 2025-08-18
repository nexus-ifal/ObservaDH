import Texto from "./componente-texto";

interface TituloProps {
	pequeno: string;
	grande: string;
}

const Titulo = ({ pequeno, grande }: TituloProps) => {
	return (
		<section className="w-full text-shadow-xl text-3xl tab:text-4xl des:text-7xl text-white text-center">
			<Texto.Raiz>
				<Texto.Pequeno.Titillium>{pequeno}</Texto.Pequeno.Titillium>
				<Texto.Espaco />
				<Texto.Forte.Oswald>{grande}</Texto.Forte.Oswald>
			</Texto.Raiz>
		</section>
	);
};

export default Titulo;
