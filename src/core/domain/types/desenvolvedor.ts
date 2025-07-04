import { LinkType } from "./link-type";

export type Desenvolvedor = {
	bio: string;
	nome: string;
	foto: string;
	funcao: string;
	links: LinkType[];
};
