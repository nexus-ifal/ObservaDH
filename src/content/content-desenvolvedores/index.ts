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
	contatos?: string;
}

const infoDevs: DevInfo[] = [
	{
		nome: "Júlio César",
		foto: "https://github.com/follijulio.png",
		funcao: "Dev Frontend, Backend, BD, Deploy e Versionamento",
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
		bio: "Técnico em Informática (IFAL) e graduando em Matemática (UFAL). Atua como Desenvolvedor Full Stack no projeto ObservaDH, sendo responsável por toda a arquitetura do sistema: interfaces, banco de dados, controle de versão e deploy.",
		contatos: "follijulio@gmail.com",
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
