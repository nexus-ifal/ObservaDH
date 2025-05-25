import { oswald, titilliumWeb } from "../../../core/lib/fonts/fonts";

interface TextProps {
	children?: React.ReactNode;
	className?: string;
	shadow?: boolean;
}

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

export default TextoForte;
