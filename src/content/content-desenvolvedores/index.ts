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

const infoDevsMock: DevInfo[] = [
	{
		nome: "Júlio César",
		foto: "https://github.com/follijulio.png",
		funcao: "Dev Frontend",
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
		bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin accumsan nulla justo, sed molestie nisi scelerisque vulputate. Integer nibh risus, pretium et neque sed, efficitur vehicula tortor. Integer ut ullamcorper ex. Aenean porta, nisi sed gravida pellentesque, mi turpis porta leo, in euismod massa mauris eget augue. Aenean urna tortor, scelerisque vitae vulputate a, lobortis et metus.    ",
	},
	{
		nome: "Rita de Cassia",
		foto: "https://github.com/ritadecassiabl.png",
		funcao: "Design",
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
		bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin accumsan nulla justo, sed molestie nisi scelerisque vulputate. Integer nibh risus, pretium et neque sed, efficitur vehicula tortor. Integer ut ullamcorper ex. Aenean porta, nisi sed gravida pellentesque, mi turpis porta leo, in euismod massa mauris eget augue. Aenean urna tortor, scelerisque vitae vulputate a, lobortis et metus.    ",
	},
];
export { infoDevsMock };
