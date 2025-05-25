interface Cabecalho {
	titulo: string;
	text: string;
	link: string;
}

const cabecalhos: Cabecalho[] = [
	{
		titulo: "ObservaDH",
		text: "Observatório Digital de Discurso e Direitos Humanos LGBTI+",
		link: "/",
	},
	{
		titulo: "Projetos de Lei",
		text: "Conheça as propostas de lei",
		link: "/projetos",
	},
	{
		titulo: "Parlamentares",
		text: "Conheça os parlamentares",
		link: "/parlamentares",
	},
	{
		titulo: "Direitos",
		text: "Saiba mais sobre os direitos pelas propostas de lei",
		link: "/direitos",
	},
	{
		titulo: "Sobre",
		text: "Conheça a origem do projeto ObservaDH",
		link: "/sobre",
	},
	{
		titulo: "Desenvolvedores",
		text: "Conheça a equipe por trás do projeto",
		link: "/desenvolvedores",
	},
];

interface UseDescobertaCabecalho {
	buscarCabecalhoPorLink: (route: string) => Cabecalho | undefined;
}

const useDescobertaCabecalho = (): UseDescobertaCabecalho => {
	const buscarCabecalhoPorLink = (route: string): Cabecalho | undefined => {
		return cabecalhos.find((item) => item.link === route);
	};

	return {
		buscarCabecalhoPorLink,
	};
};

export default useDescobertaCabecalho;
