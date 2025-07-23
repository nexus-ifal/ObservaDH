import TextoEspaco from "./texto-espaco";
import TextoForte from "./texto-forte";
import TextoLinha from "./texto-linha";
import TextoPequeno from "./texto-pequeno";
import TextoRaiz from "./texto-raiz";

/**
 * Texto - Text Component System
 * 
 * A collection of text components with different styles and semantic meanings.
 * Portuguese names maintained for component consistency with existing usage.
 * 
 * Components:
 * - Raiz: Root text element 
 * - Linha: Line/row text element
 * - Forte: Strong/bold text emphasis
 * - Espaco: Spaced text element  
 * - Pequeno: Small text element
 * 
 * Usage: <Texto.Forte>Bold text</Texto.Forte>
 */
const Texto = {
	Raiz: TextoRaiz,
	Linha: TextoLinha,
	Forte: TextoForte,
	Espaco: TextoEspaco,
	Pequeno: TextoPequeno,
};

export default Texto;
