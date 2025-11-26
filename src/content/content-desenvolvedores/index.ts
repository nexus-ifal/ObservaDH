interface DevLink {
	site?: string;
	imagem?: string;
	link?: string;
}
interface DevInfo {
	nome: string;
	foto: string;
	funcao: string;
	links: DevLink[];
	bio: string;
}

const infoDevs: DevInfo[] = [
	{
		nome: "Júlio César",
		foto: "https://github.com/follijulio.png",
		funcao: "Dev Frontend e Backend",
		links: [
			{
				site: "lattes",
				imagem: "https://i.imgur.com/2iVxee6.png",
				link: "http://lattes.cnpq.br/5914564529954569",
			},
			{
				site: "github",
				imagem: "https://cdn-icons-png.flaticon.com/512/25/25231.png",
				link: "https://github.com/follijulio",
			},
		],
		bio: "Júlio César da Silva Folli, técnico em Informática pelo instituto federal de Alagoas - IFAL. desenvolvedor frontend e backend do projeto ObservaDH",
	},
	{
		nome: "Rita de Cassia",
		foto: "https://github.com/ritadecassiabl.png",
		funcao: "Design e Dev Backend",
		links: [
			{
				site: "lattes",
				imagem: "https://i.imgur.com/2iVxee6.png",
				link: "http://lattes.cnpq.br/9761907954858176",
			},
			{
				site: "github",
				imagem: "https://cdn-icons-png.flaticon.com/512/25/25231.png",
				link: "https://github.com/ritadecassiabl",
			},
		],
		bio: "Rita de Cassia Bento Lopes, técnica em Informática pelo instituto federal de Alagoas - IFAL, graduanda em Sistemas de Informação - IFAL. Designer e desenvolvedora backend do projeto ObservaDH.    ",
	},
];
export { infoDevs };
