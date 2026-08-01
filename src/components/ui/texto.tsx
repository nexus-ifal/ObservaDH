import { oswald, titilliumWeb } from "../../fonts/fonts";

interface TextProps {
	children?: React.ReactNode;
	className?: string;
	shadow?: boolean;
}

const TextoEspaco: React.FC<TextProps> = ({ className }) => (
	<span className={`${className}`}> </span>
);

const TextoForte = {
	Oswald: ({ children, className }: TextProps) => (
		<span className={`font-normal ${oswald.className} ${className}`}>
			{children}
		</span>
	),
	Titillium: ({ children, className }: TextProps) => (
		<span className={`font-normal ${titilliumWeb.className} ${className}`}>
			{children}
		</span>
	),
};

const TextoLinha: React.FC<TextProps> = ({ children, className }) => (
	<p className={`${className}`}>{children}</p>
);

const TextoPequeno = {
	Oswald: ({ children, className }: TextProps) => (
		<span className={`font-light ${oswald.className} ${className}`}>
			{children}
		</span>
	),
	Titillium: ({ children, className }: TextProps) => (
		<span className={`font-light ${titilliumWeb.className} ${className}`}>
			{children}
		</span>
	),
};

const TextoRaiz: React.FC<TextProps> = ({ children, className, shadow }) => (
	<h2 className={`text-white ${shadow ? "" : ""} ${className}`}>{children}</h2>
);

const Texto = {
	Raiz: TextoRaiz,
	Linha: TextoLinha,
	Forte: TextoForte,
	Espaco: TextoEspaco,
	Pequeno: TextoPequeno,
};

export default Texto;
