//! DADOS FALSOS DE PROJETOS DE LEI

const apresentacao = {
	subtitulo: "Como funciona a",
	titulo: "criação de um PL",
	corTexto: "text-[#FDFF78]",
	texto: `A criação e aprovação de um Projeto de Lei (PL) é um processo rigoroso e detalhado, essencial para a dinâmica do Estado Democrático de Direito. No Brasil, um PL pode ser proposto por deputados, senadores, pelo Presidente da República, por órgãos do Judiciário e, até mesmo, pelos cidadãos através da iniciativa popular. O percurso que essa proposta faz até se tornar uma lei vigente é chamado de Processo Legislativo.

Tudo começa na casa de origem (na esfera federal, geralmente a Câmara dos Deputados). Ao ser protocolado, o projeto é distribuído para as comissões temáticas. É nestes grupos menores — como a Comissão de Constituição e Justiça (CCJ) ou a de Direitos Humanos — que o texto sofre sua principal análise. Os parlamentares debatem, realizam audiências e emitem pareceres. Para o ObservaDH, essa etapa é crítica: muitas propostas que tentam restringir os direitos da população LGBTI+ avançam de forma silenciosa e técnica nessas comissões, longe da atenção pública.

Caso seja aprovado nas comissões (ou se tramitar em regime de urgência), o PL segue para o Plenário, onde todos os parlamentares da Casa votam a proposta. Se aprovado, o texto vai para a casa revisora — por exemplo, do Senado para a Câmara, ou vice-versa. A casa revisora pode aprovar o projeto, rejeitá-lo ou fazer alterações (emendas). Se houver qualquer modificação, o texto precisa voltar à casa de origem para que as mudanças sejam validadas.

Vencida a jornada no Congresso Nacional ou na Assembleia Legislativa, o texto final segue para o Poder Executivo. O Presidente da República (ou o Governador, na esfera estadual) tem o poder de sancionar, transformando o projeto oficialmente em lei, ou vetá-lo total ou parcialmente. Mesmo em caso de veto, o Legislativo ainda pode ter a palavra final, votando para derrubar a decisão do Executivo. Compreender essa engrenagem é o pilar da nossa plataforma: ao monitorar cada uma dessas fases, capacitamos a sociedade civil a intervir a tempo, cobrando transparência e impedindo que retrocessos se tornem leis.`,
};

const mockStatus = {
	dados: {
		dados: [
			{ titulo: "Parlamentares", valor: 197 },
			{ titulo: "Projetos de Lei", valor: 131 },
		],
	},
	pautas: {
		pautas: [
			{ titulo: "Linguagem Neutra", valor: 81 },
			{ titulo: "Banheiros", valor: 47 },
			{ titulo: "Atletas Trans", valor: 40 },
			{ titulo: "Propaganda LGBTQIAPN+", valor: 33 },
		],
	},
};

const projetosMock = [
	{
		id: "1",
		ano: "2021",
		numeroPl: "PL123/2021",
		pauta: "Linguagem Neutra",
		parlamentares: [
			{
				urlImagem:
					"https://superawesomevectors.com/wp-content/uploads/2016/02/businessman-with-suit-flat-vector-icon-800x566.jpg",
				nome: "João Silva",
				genero: "Masculino",
				religiao: "Cristão",
				raca: "Branco",
				esfera: "Federal",
				partido: "PL",
				estado: "São Paulo",
				profissao: "Advogado",
				ideologia: "Direita",
			},
		],
		violacoes: ["Liberdade de expressão", "Direitos culturais"],
		ideologia: [
			"Determinismo biológico ou religioso",
			"Antagonização de minorias linguísticas",
			"Hierarquização de pautas sociais",
		],

		ementa:
			"FALSO: Proíbe o uso de linguagem neutra em documentos oficiais e na educação pública.",
		justificativa: `
    Lorem ipsum odor amet, consectetuer adipiscing elit. Urna nunc sodales porttitor non orci morbi natoque. Elementum eleifend interdum sodales feugiat felis ut non. Mollis facilisi integer porta; aenean vulputate quis! Tellus suscipit maecenas ex vehicula natoque habitasse ornare tincidunt gravida. Purus congue habitant et fusce fusce mus nascetur arcu. Platea velit elit suscipit eget risus. Per odio ornare netus ornare efficitur etiam. Ad ince5os non maecenas eros blandit class.
Montes parturient ultricies erat ornare eget. Mauris habitasse molestie torquent placerat varius porta quisque donec. Pellentesque purus varius enim porta leo elit duis. Odio pretium dignissim aptent conubia, nascetur massa vel parturient. Integer luctus molestie leo, urna pellentesque pharetra ornare porta. Pellentesque elit lobortis at ultricies porttitor dictum sed augue. Tristique curae facilisi senectus leo vitae varius? Amet erat euismod sed tempus rhoncus laoreet blandit ullamcorper proin. Etiam enim metus hendrerit nisi leo non per.
Arcu lacus sociosqu condimentum ad nunc; rutrum molestie. Posuere leo consequat in; amet penatibus mollis per vivamus suspendisse. Rutrum duis at integer mi libero elementum vestibulum euismod. Euismod quis turpis auctor malesuada luctus odio. Curabitur torquent orci tincidunt dui litora est sollicitudin curabitur nulla. Primis ligula et torquent risus sollicitudin ac velit. Donec potenti suscipit scelerisque aenean habitasse dis vel placerat.
Cras malesuada nisl, nunc habitant tempus pharetra magnis ex. Etiam malesuada consectetur platea interdum fringilla torquent phasellus volutpat. Amet per consectetur taciti mollis inceptos arcu felis platea. Iaculis libero lectus finibus pharetra adipiscing mollis. Tempus dui erat velit velit quis quam integer consectetur a. Metus pellentesque ac netus; facilisi eleifend mi. Ridiculus ultrices tortor hac egestas primis vivamus viverra lacus.
Himenaeos nascetur nec nullam pretium in accumsan himenaeos aliquet habitasse. Velit potenti ridiculus malesuada elementum euismod curabitur dapibus a nostra. Condimentum mauris nibh aliquet nullam dapibus vulputate ultrices. Taciti rutrum blandit dui dui malesuada sed. Suscipit nunc nascetur ridiculus augue, mattis parturient hendrerit fames. Gravida ornare dis conubia posuere lectus convallis. Augue pellentesque erat ad felis quis facilisis.
Semper metus etiam nascetur amet hac quisque ultricies. Convallis lorem leo massa, viverra morbi urna. Turpis vestibulum maximus ultrices curae viverra diam torquent aptent lorem. Id duis nascetur netus dignissim porta senectus diam. Mollis condimentum et elit dignissim dignissim ligula. Torquent dictum condimentum vel proin lorem, pharetra iaculis nisl. Sollicitudin dictum volutpat gravida augue curae volutpat id diam ultrices. Penatibus ornare dui nunc integer arcu cras; purus cras conubia.
Sapien accumsan magna fames eu viverra montes molestie. Urna rhoncus laoreet vivamus mattis pulvinar sollicitudin. Nulla urna sem venenatis mus, mauris tempus quisque hendrerit. Curabitur convallis senectus vehicula ut orci tempor aliquam consequat. Praesent morbi etiam curae magnis diam convallis aliquam orci inceptos. Odio odio netus nibh posuere mollis sollicitudin dis natoque. Iaculis integer himenaeos non turpis quis tellus imperdiet nisi. Lacinia molestie aliquam viverra ex malesuada tellus vivamus sem eros.
Varius eleifend risus ullamcorper sagittis pretium etiam vulputate. Parturient condimentum condimentum nullam; neque nisl mollis maecenas. Lacinia porttitor dapibus orci posuere mi iaculis venenatis etiam. Efficitur turpis justo nec molestie sagittis rutrum maximus est vehicula. Condimentum orci nam hendrerit platea quisque ullamcorper nibh. Lorem conubia massa varius pretium tortor condimentum purus dictum. Massa platea aptent a nisi fringilla nullam aliquam aliquet faucibus.
Suscipit consequat hac quis ultricies augue; justo convallis sollicitudin. Amet feugiat conubia sagittis; conubia praesent pretium efficitur maximus. Mauris penatibus ad metus non aptent. Mus montes tincidunt ornare; sed dignissim quis. Diam vitae augue iaculis enim tempor conubia lorem aliquet. Lectus luctus aptent imperdiet maximus integer euismod ut urna? Cras magna nam tortor leo varius. Donec orci sit ligula tristique suspendisse. Eget bibendum fermentum nascetur inceptos sodales suscipit.
Quam lorem odio sollicitudin vehicula turpis. Maximus fames tortor pharetra pulvinar, sem dignissim. Nibh parturient nam et sit ligula tempor nisl. Nibh nunc massa tristique ante tempus mattis. Ultrices tempus porta ex sagittis congue eleifend; taciti quisque. Lectus nullam efficitur; id in quam taciti. Aliquam interdum eu aptent ac tempus himenaeos. Aenean enim lacus aenean dolor efficitur eleifend pulvinar?
    `,
	},
	{
		id: "2",
		ano: "2021",
		numeroPl: "PL456/2023",
		pauta: "Atletas Trans",
		parlamentares: [
			{
				urlImagem:
					"https://static.vecteezy.com/system/resources/thumbnails/043/361/881/small/default-placeholder-avatar-profile-on-gray-background-woman-avatar-user-profile-person-icon-silhouette-profile-picture-for-unknown-or-anonymous-individual-for-social-media-website-free-vector.jpg",
				nome: "Ana Costa",
				genero: "Feminino",
				religiao: "Católico",
				raca: "Indígena",
				esfera: "Estadual",
				partido: "PL",
				estado: "Amazonas",
				profissao: "Ambientalista",
				ideologia: "Extrema Direita",
			},
		],
		violacoes: ["Liberdade de expressão", "Direitos culturais"],
		ideologia: ["Liberdade de expressão", "Direitos culturais"],

		ementa:
			"FALSO: Proíbe a participação de atletas trans em competições esportivas femininas.",
		justificativa: `
    Lorem ipsum odor amet, consectetuer adipiscing elit. Urna nunc sodales porttitor non orci morbi natoque. Elementum eleifend interdum sodales feugiat felis ut non. Mollis facilisi integer porta; aenean vulputate quis! Tellus suscipit maecenas ex vehicula natoque habitasse ornare tincidunt gravida. Purus congue habitant et fusce fusce mus nascetur arcu. Platea velit elit suscipit eget risus. Per odio ornare netus ornare efficitur etiam. Ad inceptos non maecenas eros blandit class.
Montes parturient ultricies erat ornare eget. Mauris habitasse molestie torquent placerat varius porta quisque donec. Pellentesque purus varius enim porta leo elit duis. Odio pretium dignissim aptent conubia, nascetur massa vel parturient. Integer luctus molestie leo, urna pellentesque pharetra ornare porta. Pellentesque elit lobortis at ultricies porttitor dictum sed augue. Tristique curae facilisi senectus leo vitae varius? Amet erat euismod sed tempus rhoncus laoreet blandit ullamcorper proin. Etiam enim metus hendrerit nisi leo non per.
Arcu lacus sociosqu condimentum ad nunc; rutrum molestie. Posuere leo consequat in; amet penatibus mollis per vivamus suspendisse. Rutrum duis at integer mi libero elementum vestibulum euismod. Euismod quis turpis auctor malesuada luctus odio. Curabitur torquent orci tincidunt dui litora est sollicitudin curabitur nulla. Primis ligula et torquent risus sollicitudin ac velit. Donec potenti suscipit scelerisque aenean habitasse dis vel placerat.
Cras malesuada nisl, nunc habitant tempus pharetra magnis ex. Etiam malesuada consectetur platea interdum fringilla torquent phasellus volutpat. Amet per consectetur taciti mollis inceptos arcu felis platea. Iaculis libero lectus finibus pharetra adipiscing mollis. Tempus dui erat velit velit quis quam integer consectetur a. Metus pellentesque ac netus; facilisi eleifend mi. Ridiculus ultrices tortor hac egestas primis vivamus viverra lacus.
Himenaeos nascetur nec nullam pretium in accumsan himenaeos aliquet habitasse. Velit potenti ridiculus malesuada elementum euismod curabitur dapibus a nostra. Condimentum mauris nibh aliquet nullam dapibus vulputate ultrices. Taciti rutrum blandit dui dui malesuada sed. Suscipit nunc nascetur ridiculus augue, mattis parturient hendrerit fames. Gravida ornare dis conubia posuere lectus convallis. Augue pellentesque erat ad felis quis facilisis.
Semper metus etiam nascetur amet hac quisque ultricies. Convallis lorem leo massa, viverra morbi urna. Turpis vestibulum maximus ultrices curae viverra diam torquent aptent lorem. Id duis nascetur netus dignissim porta senectus diam. Mollis condimentum et elit dignissim dignissim ligula. Torquent dictum condimentum vel proin lorem, pharetra iaculis nisl. Sollicitudin dictum volutpat gravida augue curae volutpat id diam ultrices. Penatibus ornare dui nunc integer arcu cras; purus cras conubia.
Sapien accumsan magna fames eu viverra montes molestie. Urna rhoncus laoreet vivamus mattis pulvinar sollicitudin. Nulla urna sem venenatis mus, mauris tempus quisque hendrerit. Curabitur convallis senectus vehicula ut orci tempor aliquam consequat. Praesent morbi etiam curae magnis diam convallis aliquam orci inceptos. Odio odio netus nibh posuere mollis sollicitudin dis natoque. Iaculis integer himenaeos non turpis quis tellus imperdiet nisi. Lacinia molestie aliquam viverra ex malesuada tellus vivamus sem eros.
Varius eleifend risus ullamcorper sagittis pretium etiam vulputate. Parturient condimentum condimentum nullam; neque nisl mollis maecenas. Lacinia porttitor dapibus orci posuere mi iaculis venenatis etiam. Efficitur turpis justo nec molestie sagittis rutrum maximus est vehicula. Condimentum orci nam hendrerit platea quisque ullamcorper nibh. Lorem conubia massa varius pretium tortor condimentum purus dictum. Massa platea aptent a nisi fringilla nullam aliquam aliquet faucibus.
Suscipit consequat hac quis ultricies augue; justo convallis sollicitudin. Amet feugiat conubia sagittis; conubia praesent pretium efficitur maximus. Mauris penatibus ad metus non aptent. Mus montes tincidunt ornare; sed dignissim quis. Diam vitae augue iaculis enim tempor conubia lorem aliquet. Lectus luctus aptent imperdiet maximus integer euismod ut urna? Cras magna nam tortor leo varius. Donec orci sit ligula tristique suspendisse. Eget bibendum fermentum nascetur inceptos sodales suscipit.
Quam lorem odio sollicitudin vehicula turpis. Maximus fames tortor pharetra pulvinar, sem dignissim. Nibh parturient nam et sit ligula tempor nisl. Nibh nunc massa tristique ante tempus mattis. Ultrices tempus porta ex sagittis congue eleifend; taciti quisque. Lectus nullam efficitur; id in quam taciti. Aliquam interdum eu aptent ac tempus himenaeos. Aenean enim lacus aenean dolor efficitur eleifend pulvinar?
    `,
	},
	{
		id: "3",
		ano: "2024",
		numeroPl: "PL789/2022",
		pauta: "Banheiros Multigênero",
		parlamentares: [
			{
				urlImagem:
					"https://superawesomevectors.com/wp-content/uploads/2016/02/businessman-with-suit-flat-vector-icon-800x566.jpg",
				nome: "Carlos Almeida",
				genero: "Não Binário",
				religiao: "Agnóstico",
				raca: "Polaco",
				esfera: "Municipal",
				partido: "PL",
				estado: "Minas Gerais",
				profissao: "Economista",
				ideologia: "Centro Esquerda",
			},
			{
				urlImagem:
					"https://static.vecteezy.com/system/resources/thumbnails/043/361/881/small/default-placeholder-avatar-profile-on-gray-background-woman-avatar-user-profile-person-icon-silhouette-profile-picture-for-unknown-or-anonymous-individual-for-social-media-website-free-vector.jpg",
				nome: "Fernanda Oliveira",
				genero: "Feminino",
				religiao: "Não identificado",
				raca: "Pardo",
				esfera: "Estadual",
				partido: "PSDB",
				estado: "Rio de Janeiro",
				profissao: "Professora",
				ideologia: "Esquerda Radical",
			},
		],
		violacoes: ["Liberdade de expressão", "Direitos culturais"],
		ideologia: ["Liberdade de expressão", "Direitos culturais"],

		ementa:
			"FALSO: Autoriza o uso de banheiros de acordo com a identidade de gênero de cada indivíduo.",
		justificativa: `
    Lorem ipsum odor amet, consectetuer adipiscing elit. Urna nunc sodales porttitor non orci morbi natoque. Elementum eleifend interdum sodales feugiat felis ut non. Mollis facilisi integer porta; aenean vulputate quis! Tellus suscipit maecenas ex vehicula natoque habitasse ornare tincidunt gravida. Purus congue habitant et fusce fusce mus nascetur arcu. Platea velit elit suscipit eget risus. Per odio ornare netus ornare efficitur etiam. Ad inceptos non maecenas eros blandit class.
Montes parturient ultricies erat ornare eget. Mauris habitasse molestie torquent placerat varius porta quisque donec. Pellentesque purus varius enim porta leo elit duis. Odio pretium dignissim aptent conubia, nascetur massa vel parturient. Integer luctus molestie leo, urna pellentesque pharetra ornare porta. Pellentesque elit lobortis at ultricies porttitor dictum sed augue. Tristique curae facilisi senectus leo vitae varius? Amet erat euismod sed tempus rhoncus laoreet blandit ullamcorper proin. Etiam enim metus hendrerit nisi leo non per.
Arcu lacus sociosqu condimentum ad nunc; rutrum molestie. Posuere leo consequat in; amet penatibus mollis per vivamus suspendisse. Rutrum duis at integer mi libero elementum vestibulum euismod. Euismod quis turpis auctor malesuada luctus odio. Curabitur torquent orci tincidunt dui litora est sollicitudin curabitur nulla. Primis ligula et torquent risus sollicitudin ac velit. Donec potenti suscipit scelerisque aenean habitasse dis vel placerat.
Cras malesuada nisl, nunc habitant tempus pharetra magnis ex. Etiam malesuada consectetur platea interdum fringilla torquent phasellus volutpat. Amet per consectetur taciti mollis inceptos arcu felis platea. Iaculis libero lectus finibus pharetra adipiscing mollis. Tempus dui erat velit velit quis quam integer consectetur a. Metus pellentesque ac netus; facilisi eleifend mi. Ridiculus ultrices tortor hac egestas primis vivamus viverra lacus.
Himenaeos nascetur nec nullam pretium in accumsan himenaeos aliquet habitasse. Velit potenti ridiculus malesuada elementum euismod curabitur dapibus a nostra. Condimentum mauris nibh aliquet nullam dapibus vulputate ultrices. Taciti rutrum blandit dui dui malesuada sed. Suscipit nunc nascetur ridiculus augue, mattis parturient hendrerit fames. Gravida ornare dis conubia posuere lectus convallis. Augue pellentesque erat ad felis quis facilisis.
Semper metus etiam nascetur amet hac quisque ultricies. Convallis lorem leo massa, viverra morbi urna. Turpis vestibulum maximus ultrices curae viverra diam torquent aptent lorem. Id duis nascetur netus dignissim porta senectus diam. Mollis condimentum et elit dignissim dignissim ligula. Torquent dictum condimentum vel proin lorem, pharetra iaculis nisl. Sollicitudin dictum volutpat gravida augue curae volutpat id diam ultrices. Penatibus ornare dui nunc integer arcu cras; purus cras conubia.
Sapien accumsan magna fames eu viverra montes molestie. Urna rhoncus laoreet vivamus mattis pulvinar sollicitudin. Nulla urna sem venenatis mus, mauris tempus quisque hendrerit. Curabitur convallis senectus vehicula ut orci tempor aliquam consequat. Praesent morbi etiam curae magnis diam convallis aliquam orci inceptos. Odio odio netus nibh posuere mollis sollicitudin dis natoque. Iaculis integer himenaeos non turpis quis tellus imperdiet nisi. Lacinia molestie aliquam viverra ex malesuada tellus vivamus sem eros.
Varius eleifend risus ullamcorper sagittis pretium etiam vulputate. Parturient condimentum condimentum nullam; neque nisl mollis maecenas. Lacinia porttitor dapibus orci posuere mi iaculis venenatis etiam. Efficitur turpis justo nec molestie sagittis rutrum maximus est vehicula. Condimentum orci nam hendrerit platea quisque ullamcorper nibh. Lorem conubia massa varius pretium tortor condimentum purus dictum. Massa platea aptent a nisi fringilla nullam aliquam aliquet faucibus.
Suscipit consequat hac quis ultricies augue; justo convallis sollicitudin. Amet feugiat conubia sagittis; conubia praesent pretium efficitur maximus. Mauris penatibus ad metus non aptent. Mus montes tincidunt ornare; sed dignissim quis. Diam vitae augue iaculis enim tempor conubia lorem aliquet. Lectus luctus aptent imperdiet maximus integer euismod ut urna? Cras magna nam tortor leo varius. Donec orci sit ligula tristique suspendisse. Eget bibendum fermentum nascetur inceptos sodales suscipit.
Quam lorem odio sollicitudin vehicula turpis. Maximus fames tortor pharetra pulvinar, sem dignissim. Nibh parturient nam et sit ligula tempor nisl. Nibh nunc massa tristique ante tempus mattis. Ultrices tempus porta ex sagittis congue eleifend; taciti quisque. Lectus nullam efficitur; id in quam taciti. Aliquam interdum eu aptent ac tempus himenaeos. Aenean enim lacus aenean dolor efficitur eleifend pulvinar?
    `,
	},
	{
		id: "4",
		ano: "2020",
		numeroPl: "PL321/2020",
		pauta: "Propaganda LGBT",
		parlamentares: [
			{
				urlImagem:
					"https://superawesomevectors.com/wp-content/uploads/2016/02/businessman-with-suit-flat-vector-icon-800x566.jpg",
				nome: "Lucas Pereira",
				genero: "Masculino",
				religiao: "Satanista",
				raca: "Não identificado",
				esfera: "Estadual",
				partido: "PSDB",
				estado: "Bahia",
				profissao: "Empresário",
				ideologia: "Centro Direita",
			},
		],
		violacoes: ["Liberdade de expressão", "Direitos culturais"],
		ideologia: ["Liberdade de expressão", "Direitos culturais"],

		ementa:
			"FALSO: Proíbe a veiculação de propaganda LGBT em horários nobres de TV e rádio.",
		justificativa: `
    Lorem ipsum odor amet, consectetuer adipiscing elit. Urna nunc sodales porttitor non orci morbi natoque. Elementum eleifend interdum sodales feugiat felis ut non. Mollis facilisi integer porta; aenean vulputate quis! Tellus suscipit maecenas ex vehicula natoque habitasse ornare tincidunt gravida. Purus congue habitant et fusce fusce mus nascetur arcu. Platea velit elit suscipit eget risus. Per odio ornare netus ornare efficitur etiam. Ad inceptos non maecenas eros blandit class.
Montes parturient ultricies erat ornare eget. Mauris habitasse molestie torquent placerat varius porta quisque donec. Pellentesque purus varius enim porta leo elit duis. Odio pretium dignissim aptent conubia, nascetur massa vel parturient. Integer luctus molestie leo, urna pellentesque pharetra ornare porta. Pellentesque elit lobortis at ultricies porttitor dictum sed augue. Tristique curae facilisi senectus leo vitae varius? Amet erat euismod sed tempus rhoncus laoreet blandit ullamcorper proin. Etiam enim metus hendrerit nisi leo non per.
Arcu lacus sociosqu condimentum ad nunc; rutrum molestie. Posuere leo consequat in; amet penatibus mollis per vivamus suspendisse. Rutrum duis at integer mi libero elementum vestibulum euismod. Euismod quis turpis auctor malesuada luctus odio. Curabitur torquent orci tincidunt dui litora est sollicitudin curabitur nulla. Primis ligula et torquent risus sollicitudin ac velit. Donec potenti suscipit scelerisque aenean habitasse dis vel placerat.
Cras malesuada nisl, nunc habitant tempus pharetra magnis ex. Etiam malesuada consectetur platea interdum fringilla torquent phasellus volutpat. Amet per consectetur taciti mollis inceptos arcu felis platea. Iaculis libero lectus finibus pharetra adipiscing mollis. Tempus dui erat velit velit quis quam integer consectetur a. Metus pellentesque ac netus; facilisi eleifend mi. Ridiculus ultrices tortor hac egestas primis vivamus viverra lacus.
Himenaeos nascetur nec nullam pretium in accumsan himenaeos aliquet habitasse. Velit potenti ridiculus malesuada elementum euismod curabitur dapibus a nostra. Condimentum mauris nibh aliquet nullam dapibus vulputate ultrices. Taciti rutrum blandit dui dui malesuada sed. Suscipit nunc nascetur ridiculus augue, mattis parturient hendrerit fames. Gravida ornare dis conubia posuere lectus convallis. Augue pellentesque erat ad felis quis facilisis.
Semper metus etiam nascetur amet hac quisque ultricies. Convallis lorem leo massa, viverra morbi urna. Turpis vestibulum maximus ultrices curae viverra diam torquent aptent lorem. Id duis nascetur netus dignissim porta senectus diam. Mollis condimentum et elit dignissim dignissim ligula. Torquent dictum condimentum vel proin lorem, pharetra iaculis nisl. Sollicitudin dictum volutpat gravida augue curae volutpat id diam ultrices. Penatibus ornare dui nunc integer arcu cras; purus cras conubia.
Sapien accumsan magna fames eu viverra montes molestie. Urna rhoncus laoreet vivamus mattis pulvinar sollicitudin. Nulla urna sem venenatis mus, mauris tempus quisque hendrerit. Curabitur convallis senectus vehicula ut orci tempor aliquam consequat. Praesent morbi etiam curae magnis diam convallis aliquam orci inceptos. Odio odio netus nibh posuere mollis sollicitudin dis natoque. Iaculis integer himenaeos non turpis quis tellus imperdiet nisi. Lacinia molestie aliquam viverra ex malesuada tellus vivamus sem eros.
Varius eleifend risus ullamcorper sagittis pretium etiam vulputate. Parturient condimentum condimentum nullam; neque nisl mollis maecenas. Lacinia porttitor dapibus orci posuere mi iaculis venenatis etiam. Efficitur turpis justo nec molestie sagittis rutrum maximus est vehicula. Condimentum orci nam hendrerit platea quisque ullamcorper nibh. Lorem conubia massa varius pretium tortor condimentum purus dictum. Massa platea aptent a nisi fringilla nullam aliquam aliquet faucibus.
Suscipit consequat hac quis ultricies augue; justo convallis sollicitudin. Amet feugiat conubia sagittis; conubia praesent pretium efficitur maximus. Mauris penatibus ad metus non aptent. Mus montes tincidunt ornare; sed dignissim quis. Diam vitae augue iaculis enim tempor conubia lorem aliquet. Lectus luctus aptent imperdiet maximus integer euismod ut urna? Cras magna nam tortor leo varius. Donec orci sit ligula tristique suspendisse. Eget bibendum fermentum nascetur inceptos sodales suscipit.
Quam lorem odio sollicitudin vehicula turpis. Maximus fames tortor pharetra pulvinar, sem dignissim. Nibh parturient nam et sit ligula tempor nisl. Nibh nunc massa tristique ante tempus mattis. Ultrices tempus porta ex sagittis congue eleifend; taciti quisque. Lectus nullam efficitur; id in quam taciti. Aliquam interdum eu aptent ac tempus himenaeos. Aenean enim lacus aenean dolor efficitur eleifend pulvinar?
    `,
	},
	{
		id: "5",
		ano: "2022",
		numeroPl: "PL432/2022",
		pauta: "Atletas Trans",
		parlamentares: [
			{
				urlImagem:
					"https://static.vecteezy.com/system/resources/thumbnails/043/361/881/small/default-placeholder-avatar-profile-on-gray-background-woman-avatar-user-profile-person-icon-silhouette-profile-picture-for-unknown-or-anonymous-individual-for-social-media-website-free-vector.jpg",
				nome: "Mariana Souza",
				genero: "Feminino",
				religiao: "Cristão",
				raca: "Branco",
				esfera: "Federal",
				partido: "NOVO",
				estado: "São Paulo",
				profissao: "Advogada",
				ideologia: "Direita",
			},

			{
				urlImagem:
					"https://static.vecteezy.com/system/resources/thumbnails/043/361/881/small/default-placeholder-avatar-profile-on-gray-background-woman-avatar-user-profile-person-icon-silhouette-profile-picture-for-unknown-or-anonymous-individual-for-social-media-website-free-vector.jpg",
				nome: "Fernanda Oliveira",
				genero: "Feminino",
				religiao: "Não identificado",
				raca: "Pardo",
				esfera: "Estadual",
				partido: "NOVO",
				estado: "Rio de Janeiro",
				profissao: "Professora",
				ideologia: "Esquerda Radical",
			},
		],
		violacoes: ["Liberdade de expressão", "Direitos culturais"],
		ideologia: ["Liberdade de expressão", "Direitos culturais"],

		ementa:
			"FALSO: Limita a participação de atletas trans em competições femininas de alto nível.",
		justificativa: `
    Lorem ipsum odor amet, consectetuer adipiscing elit. Urna nunc sodales porttitor non orci morbi natoque. Elementum eleifend interdum sodales feugiat felis ut non. Mollis facilisi integer porta; aenean vulputate quis! Tellus suscipit maecenas ex vehicula natoque habitasse ornare tincidunt gravida. Purus congue habitant et fusce fusce mus nascetur arcu. Platea velit elit suscipit eget risus. Per odio ornare netus ornare efficitur etiam. Ad inceptos non maecenas eros blandit class.
Montes parturient ultricies erat ornare eget. Mauris habitasse molestie torquent placerat varius porta quisque donec. Pellentesque purus varius enim porta leo elit duis. Odio pretium dignissim aptent conubia, nascetur massa vel parturient. Integer luctus molestie leo, urna pellentesque pharetra ornare porta. Pellentesque elit lobortis at ultricies porttitor dictum sed augue. Tristique curae facilisi senectus leo vitae varius? Amet erat euismod sed tempus rhoncus laoreet blandit ullamcorper proin. Etiam enim metus hendrerit nisi leo non per.
Arcu lacus sociosqu condimentum ad nunc; rutrum molestie. Posuere leo consequat in; amet penatibus mollis per vivamus suspendisse. Rutrum duis at integer mi libero elementum vestibulum euismod. Euismod quis turpis auctor malesuada luctus odio. Curabitur torquent orci tincidunt dui litora est sollicitudin curabitur nulla. Primis ligula et torquent risus sollicitudin ac velit. Donec potenti suscipit scelerisque aenean habitasse dis vel placerat.
Cras malesuada nisl, nunc habitant tempus pharetra magnis ex. Etiam malesuada consectetur platea interdum fringilla torquent phasellus volutpat. Amet per consectetur taciti mollis inceptos arcu felis platea. Iaculis libero lectus finibus pharetra adipiscing mollis. Tempus dui erat velit velit quis quam integer consectetur a. Metus pellentesque ac netus; facilisi eleifend mi. Ridiculus ultrices tortor hac egestas primis vivamus viverra lacus.
Himenaeos nascetur nec nullam pretium in accumsan himenaeos aliquet habitasse. Velit potenti ridiculus malesuada elementum euismod curabitur dapibus a nostra. Condimentum mauris nibh aliquet nullam dapibus vulputate ultrices. Taciti rutrum blandit dui dui malesuada sed. Suscipit nunc nascetur ridiculus augue, mattis parturient hendrerit fames. Gravida ornare dis conubia posuere lectus convallis. Augue pellentesque erat ad felis quis facilisis.
Semper metus etiam nascetur amet hac quisque ultricies. Convallis lorem leo massa, viverra morbi urna. Turpis vestibulum maximus ultrices curae viverra diam torquent aptent lorem. Id duis nascetur netus dignissim porta senectus diam. Mollis condimentum et elit dignissim dignissim ligula. Torquent dictum condimentum vel proin lorem, pharetra iaculis nisl. Sollicitudin dictum volutpat gravida augue curae volutpat id diam ultrices. Penatibus ornare dui nunc integer arcu cras; purus cras conubia.
Sapien accumsan magna fames eu viverra montes molestie. Urna rhoncus laoreet vivamus mattis pulvinar sollicitudin. Nulla urna sem venenatis mus, mauris tempus quisque hendrerit. Curabitur convallis senectus vehicula ut orci tempor aliquam consequat. Praesent morbi etiam curae magnis diam convallis aliquam orci inceptos. Odio odio netus nibh posuere mollis sollicitudin dis natoque. Iaculis integer himenaeos non turpis quis tellus imperdiet nisi. Lacinia molestie aliquam viverra ex malesuada tellus vivamus sem eros.
Varius eleifend risus ullamcorper sagittis pretium etiam vulputate. Parturient condimentum condimentum nullam; neque nisl mollis maecenas. Lacinia porttitor dapibus orci posuere mi iaculis venenatis etiam. Efficitur turpis justo nec molestie sagittis rutrum maximus est vehicula. Condimentum orci nam hendrerit platea quisque ullamcorper nibh. Lorem conubia massa varius pretium tortor condimentum purus dictum. Massa platea aptent a nisi fringilla nullam aliquam aliquet faucibus.
Suscipit consequat hac quis ultricies augue; justo convallis sollicitudin. Amet feugiat conubia sagittis; conubia praesent pretium efficitur maximus. Mauris penatibus ad metus non aptent. Mus montes tincidunt ornare; sed dignissim quis. Diam vitae augue iaculis enim tempor conubia lorem aliquet. Lectus luctus aptent imperdiet maximus integer euismod ut urna? Cras magna nam tortor leo varius. Donec orci sit ligula tristique suspendisse. Eget bibendum fermentum nascetur inceptos sodales suscipit.
Quam lorem odio sollicitudin vehicula turpis. Maximus fames tortor pharetra pulvinar, sem dignissim. Nibh parturient nam et sit ligula tempor nisl. Nibh nunc massa tristique ante tempus mattis. Ultrices tempus porta ex sagittis congue eleifend; taciti quisque. Lectus nullam efficitur; id in quam taciti. Aliquam interdum eu aptent ac tempus himenaeos. Aenean enim lacus aenean dolor efficitur eleifend pulvinar?
    `,
	},
	{
		id: "6",
		ano: "2022",
		numeroPl: "PL112/2022",
		pauta: "Banheiros Multigênero",
		parlamentares: [
			{
				urlImagem:
					"https://superawesomevectors.com/wp-content/uploads/2016/02/businessman-with-suit-flat-vector-icon-800x566.jpg",
				nome: "Joaquim Ferreira",
				genero: "Masculino",
				religiao: "Católico",
				raca: "Pardo",
				esfera: "Federal",
				partido: "NOVO",
				estado: "Pará",
				profissao: "Médico",
				ideologia: "Centro",
			},
		],
		violacoes: ["Liberdade de expressão", "Direitos culturais"],
		ideologia: ["Liberdade de expressão", "Direitos culturais"],

		ementa:
			"FALSO: Autoriza o uso de banheiros multigênero em estabelecimentos públicos e privados.",
		justificativa: `
    Lorem ipsum odor amet, consectetuer adipiscing elit. Urna nunc sodales porttitor non orci morbi natoque. Elementum eleifend interdum sodales feugiat felis ut non. Mollis facilisi integer porta; aenean vulputate quis! Tellus suscipit maecenas ex vehicula natoque habitasse ornare tincidunt gravida. Purus congue habitant et fusce fusce mus nascetur arcu. Platea velit elit suscipit eget risus. Per odio ornare netus ornare efficitur etiam. Ad inceptos non maecenas eros blandit class.
Montes parturient ultricies erat ornare eget. Mauris habitasse molestie torquent placerat varius porta quisque donec. Pellentesque purus varius enim porta leo elit duis. Odio pretium dignissim aptent conubia, nascetur massa vel parturient. Integer luctus molestie leo, urna pellentesque pharetra ornare porta. Pellentesque elit lobortis at ultricies porttitor dictum sed augue. Tristique curae facilisi senectus leo vitae varius? Amet erat euismod sed tempus rhoncus laoreet blandit ullamcorper proin. Etiam enim metus hendrerit nisi leo non per.
Arcu lacus sociosqu condimentum ad nunc; rutrum molestie. Posuere leo consequat in; amet penatibus mollis per vivamus suspendisse. Rutrum duis at integer mi libero elementum vestibulum euismod. Euismod quis turpis auctor malesuada luctus odio. Curabitur torquent orci tincidunt dui litora est sollicitudin curabitur nulla. Primis ligula et torquent risus sollicitudin ac velit. Donec potenti suscipit scelerisque aenean habitasse dis vel placerat.
Cras malesuada nisl, nunc habitant tempus pharetra magnis ex. Etiam malesuada consectetur platea interdum fringilla torquent phasellus volutpat. Amet per consectetur taciti mollis inceptos arcu felis platea. Iaculis libero lectus finibus pharetra adipiscing mollis. Tempus dui erat velit velit quis quam integer consectetur a. Metus pellentesque ac netus; facilisi eleifend mi. Ridiculus ultrices tortor hac egestas primis vivamus viverra lacus.
Himenaeos nascetur nec nullam pretium in accumsan himenaeos aliquet habitasse. Velit potenti ridiculus malesuada elementum euismod curabitur dapibus a nostra. Condimentum mauris nibh aliquet nullam dapibus vulputate ultrices. Taciti rutrum blandit dui dui malesuada sed. Suscipit nunc nascetur ridiculus augue, mattis parturient hendrerit fames. Gravida ornare dis conubia posuere lectus convallis. Augue pellentesque erat ad felis quis facilisis.
Semper metus etiam nascetur amet hac quisque ultricies. Convallis lorem leo massa, viverra morbi urna. Turpis vestibulum maximus ultrices curae viverra diam torquent aptent lorem. Id duis nascetur netus dignissim porta senectus diam. Mollis condimentum et elit dignissim dignissim ligula. Torquent dictum condimentum vel proin lorem, pharetra iaculis nisl. Sollicitudin dictum volutpat gravida augue curae volutpat id diam ultrices. Penatibus ornare dui nunc integer arcu cras; purus cras conubia.
Sapien accumsan magna fames eu viverra montes molestie. Urna rhoncus laoreet vivamus mattis pulvinar sollicitudin. Nulla urna sem venenatis mus, mauris tempus quisque hendrerit. Curabitur convallis senectus vehicula ut orci tempor aliquam consequat. Praesent morbi etiam curae magnis diam convallis aliquam orci inceptos. Odio odio netus nibh posuere mollis sollicitudin dis natoque. Iaculis integer himenaeos non turpis quis tellus imperdiet nisi. Lacinia molestie aliquam viverra ex malesuada tellus vivamus sem eros.
Varius eleifend risus ullamcorper sagittis pretium etiam vulputate. Parturient condimentum condimentum nullam; neque nisl mollis maecenas. Lacinia porttitor dapibus orci posuere mi iaculis venenatis etiam. Efficitur turpis justo nec molestie sagittis rutrum maximus est vehicula. Condimentum orci nam hendrerit platea quisque ullamcorper nibh. Lorem conubia massa varius pretium tortor condimentum purus dictum. Massa platea aptent a nisi fringilla nullam aliquam aliquet faucibus.
Suscipit consequat hac quis ultricies augue; justo convallis sollicitudin. Amet feugiat conubia sagittis; conubia praesent pretium efficitur maximus. Mauris penatibus ad metus non aptent. Mus montes tincidunt ornare; sed dignissim quis. Diam vitae augue iaculis enim tempor conubia lorem aliquet. Lectus luctus aptent imperdiet maximus integer euismod ut urna? Cras magna nam tortor leo varius. Donec orci sit ligula tristique suspendisse. Eget bibendum fermentum nascetur inceptos sodales suscipit.
Quam lorem odio sollicitudin vehicula turpis. Maximus fames tortor pharetra pulvinar, sem dignissim. Nibh parturient nam et sit ligula tempor nisl. Nibh nunc massa tristique ante tempus mattis. Ultrices tempus porta ex sagittis congue eleifend; taciti quisque. Lectus nullam efficitur; id in quam taciti. Aliquam interdum eu aptent ac tempus himenaeos. Aenean enim lacus aenean dolor efficitur eleifend pulvinar?
    `,
	},
	{
		id: "7",
		ano: "2021",
		numeroPl: "PL543/2021",
		pauta: "Propaganda LGBT",
		parlamentares: [
			{
				urlImagem:
					"https://superawesomevectors.com/wp-content/uploads/2016/02/businessman-with-suit-flat-vector-icon-800x566.jpg",
				nome: "Ricardo Santos",
				genero: "Masculino",
				religiao: "Evangélico",
				raca: "Branco",
				esfera: "Estadual",
				partido: "NOVO",
				estado: "São Paulo",
				profissao: "Comerciante",
				ideologia: "Centro Direita",
			},
		],
		violacoes: ["Liberdade de expressão", "Direitos culturais"],
		ideologia: ["Liberdade de expressão", "Direitos culturais"],

		ementa: "FALSO: Regula a exibição de propaganda LGBT na mídia.",
		justificativa: `
  Lorem ipsum odor amet, consectetuer adipiscing elit. Urna nunc sodales porttitor non orci morbi natoque. Elementum eleifend interdum sodales feugiat felis ut non. Mollis facilisi integer porta; aenean vulputate quis! Tellus suscipit maecenas ex vehicula natoque habitasse ornare tincidunt gravida. Purus congue habitant et fusce fusce mus nascetur arcu. Platea velit elit suscipit eget risus. Per odio ornare netus ornare efficitur etiam. Ad inceptos non maecenas eros blandit class.
Montes parturient ultricies erat ornare eget. Mauris habitasse molestie torquent placerat varius porta quisque donec. Pellentesque purus varius enim porta leo elit duis. Odio pretium dignissim aptent conubia, nascetur massa vel parturient. Integer luctus molestie leo, urna pellentesque pharetra ornare porta. Pellentesque elit lobortis at ultricies porttitor dictum sed augue. Tristique curae facilisi senectus leo vitae varius? Amet erat euismod sed tempus rhoncus laoreet blandit ullamcorper proin. Etiam enim metus hendrerit nisi leo non per.
Arcu lacus sociosqu condimentum ad nunc; rutrum molestie. Posuere leo consequat in; amet penatibus mollis per vivamus suspendisse. Rutrum duis at integer mi libero elementum vestibulum euismod. Euismod quis turpis auctor malesuada luctus odio. Curabitur torquent orci tincidunt dui litora est sollicitudin curabitur nulla. Primis ligula et torquent risus sollicitudin ac velit. Donec potenti suscipit scelerisque aenean habitasse dis vel placerat.
Cras malesuada nisl, nunc habitant tempus pharetra magnis ex. Etiam malesuada consectetur platea interdum fringilla torquent phasellus volutpat. Amet per consectetur taciti mollis inceptos arcu felis platea. Iaculis libero lectus finibus pharetra adipiscing mollis. Tempus dui erat velit velit quis quam integer consectetur a. Metus pellentesque ac netus; facilisi eleifend mi. Ridiculus ultrices tortor hac egestas primis vivamus viverra lacus.
Himenaeos nascetur nec nullam pretium in accumsan himenaeos aliquet habitasse. Velit potenti ridiculus malesuada elementum euismod curabitur dapibus a nostra. Condimentum mauris nibh aliquet nullam dapibus vulputate ultrices. Taciti rutrum blandit dui dui malesuada sed. Suscipit nunc nascetur ridiculus augue, mattis parturient hendrerit fames. Gravida ornare dis conubia posuere lectus convallis. Augue pellentesque erat ad felis quis facilisis.
Semper metus etiam nascetur amet hac quisque ultricies. Convallis lorem leo massa, viverra morbi urna. Turpis vestibulum maximus ultrices curae viverra diam torquent aptent lorem. Id duis nascetur netus dignissim porta senectus diam. Mollis condimentum et elit dignissim dignissim ligula. Torquent dictum condimentum vel proin lorem, pharetra iaculis nisl. Sollicitudin dictum volutpat gravida augue curae volutpat id diam ultrices. Penatibus ornare dui nunc integer arcu cras; purus cras conubia.
Sapien accumsan magna fames eu viverra montes molestie. Urna rhoncus laoreet vivamus mattis pulvinar sollicitudin. Nulla urna sem venenatis mus, mauris tempus quisque hendrerit. Curabitur convallis senectus vehicula ut orci tempor aliquam consequat. Praesent morbi etiam curae magnis diam convallis aliquam orci inceptos. Odio odio netus nibh posuere mollis sollicitudin dis natoque. Iaculis integer himenaeos non turpis quis tellus imperdiet nisi. Lacinia molestie aliquam viverra ex malesuada tellus vivamus sem eros.
Varius eleifend risus ullamcorper sagittis pretium etiam vulputate. Parturient condimentum condimentum nullam; neque nisl mollis maecenas. Lacinia porttitor dapibus orci posuere mi iaculis venenatis etiam. Efficitur turpis justo nec molestie sagittis rutrum maximus est vehicula. Condimentum orci nam hendrerit platea quisque ullamcorper nibh. Lorem conubia massa varius pretium tortor condimentum purus dictum. Massa platea aptent a nisi fringilla nullam aliquam aliquet faucibus.
Suscipit consequat hac quis ultricies augue; justo convallis sollicitudin. Amet feugiat conubia sagittis; conubia praesent pretium efficitur maximus. Mauris penatibus ad metus non aptent. Mus montes tincidunt ornare; sed dignissim quis. Diam vitae augue iaculis enim tempor conubia lorem aliquet. Lectus luctus aptent imperdiet maximus integer euismod ut urna? Cras magna nam tortor leo varius. Donec orci sit ligula tristique suspendisse. Eget bibendum fermentum nascetur inceptos sodales suscipit.
Quam lorem odio sollicitudin vehicula turpis. Maximus fames tortor pharetra pulvinar, sem dignissim. Nibh parturient nam et sit ligula tempor nisl. Nibh nunc massa tristique ante tempus mattis. Ultrices tempus porta ex sagittis congue eleifend; taciti quisque. Lectus nullam efficitur; id in quam taciti. Aliquam interdum eu aptent ac tempus himenaeos. Aenean enim lacus aenean dolor efficitur eleifend pulvinar?
`,
	},
	{
		id: "8",
		ano: "2021",
		numeroPl: "PL234/2021",
		pauta: "Linguagem Neutra",
		parlamentares: [
			{
				urlImagem:
					"https://static.vecteezy.com/system/resources/thumbnails/043/361/881/small/default-placeholder-avatar-profile-on-gray-background-woman-avatar-user-profile-person-icon-silhouette-profile-picture-for-unknown-or-anonymous-individual-for-social-media-website-free-vector.jpg",
				nome: "Beatriz Silva",
				genero: "Feminino",
				religiao: "Não identificado",
				raca: "Pardo",
				esfera: "Federal",
				partido: "PL",
				estado: "Pernambuco",
				profissao: "Arquiteta",
				ideologia: "Esquerda",
			},
		],
		violacoes: ["Liberdade de expressão", "Direitos culturais"],
		ideologia: ["Liberdade de expressão", "Direitos culturais"],

		ementa:
			"FALSO: Permite o uso de linguagem neutra em todos os documentos oficiais.",
		justificativa: `
    Lorem ipsum odor amet, consectetuer adipiscing elit. Urna nunc sodales porttitor non orci morbi natoque. Elementum eleifend interdum sodales feugiat felis ut non. Mollis facilisi integer porta; aenean vulputate quis! Tellus suscipit maecenas ex vehicula natoque habitasse ornare tincidunt gravida. Purus congue habitant et fusce fusce mus nascetur arcu. Platea velit elit suscipit eget risus. Per odio ornare netus ornare efficitur etiam. Ad inceptos non maecenas eros blandit class.
Montes parturient ultricies erat ornare eget. Mauris habitasse molestie torquent placerat varius porta quisque donec. Pellentesque purus varius enim porta leo elit duis. Odio pretium dignissim aptent conubia, nascetur massa vel parturient. Integer luctus molestie leo, urna pellentesque pharetra ornare porta. Pellentesque elit lobortis at ultricies porttitor dictum sed augue. Tristique curae facilisi senectus leo vitae varius? Amet erat euismod sed tempus rhoncus laoreet blandit ullamcorper proin. Etiam enim metus hendrerit nisi leo non per.
Arcu lacus sociosqu condimentum ad nunc; rutrum molestie. Posuere leo consequat in; amet penatibus mollis per vivamus suspendisse. Rutrum duis at integer mi libero elementum vestibulum euismod. Euismod quis turpis auctor malesuada luctus odio. Curabitur torquent orci tincidunt dui litora est sollicitudin curabitur nulla. Primis ligula et torquent risus sollicitudin ac velit. Donec potenti suscipit scelerisque aenean habitasse dis vel placerat.
Cras malesuada nisl, nunc habitant tempus pharetra magnis ex. Etiam malesuada consectetur platea interdum fringilla torquent phasellus volutpat. Amet per consectetur taciti mollis inceptos arcu felis platea. Iaculis libero lectus finibus pharetra adipiscing mollis. Tempus dui erat velit velit quis quam integer consectetur a. Metus pellentesque ac netus; facilisi eleifend mi. Ridiculus ultrices tortor hac egestas primis vivamus viverra lacus.
Himenaeos nascetur nec nullam pretium in accumsan himenaeos aliquet habitasse. Velit potenti ridiculus malesuada elementum euismod curabitur dapibus a nostra. Condimentum mauris nibh aliquet nullam dapibus vulputate ultrices. Taciti rutrum blandit dui dui malesuada sed. Suscipit nunc nascetur ridiculus augue, mattis parturient hendrerit fames. Gravida ornare dis conubia posuere lectus convallis. Augue pellentesque erat ad felis quis facilisis.
Semper metus etiam nascetur amet hac quisque ultricies. Convallis lorem leo massa, viverra morbi urna. Turpis vestibulum maximus ultrices curae viverra diam torquent aptent lorem. Id duis nascetur netus dignissim porta senectus diam. Mollis condimentum et elit dignissim dignissim ligula. Torquent dictum condimentum vel proin lorem, pharetra iaculis nisl. Sollicitudin dictum volutpat gravida augue curae volutpat id diam ultrices. Penatibus ornare dui nunc integer arcu cras; purus cras conubia.
Sapien accumsan magna fames eu viverra montes molestie. Urna rhoncus laoreet vivamus mattis pulvinar sollicitudin. Nulla urna sem venenatis mus, mauris tempus quisque hendrerit. Curabitur convallis senectus vehicula ut orci tempor aliquam consequat. Praesent morbi etiam curae magnis diam convallis aliquam orci inceptos. Odio odio netus nibh posuere mollis sollicitudin dis natoque. Iaculis integer himenaeos non turpis quis tellus imperdiet nisi. Lacinia molestie aliquam viverra ex malesuada tellus vivamus sem eros.
Varius eleifend risus ullamcorper sagittis pretium etiam vulputate. Parturient condimentum condimentum nullam; neque nisl mollis maecenas. Lacinia porttitor dapibus orci posuere mi iaculis venenatis etiam. Efficitur turpis justo nec molestie sagittis rutrum maximus est vehicula. Condimentum orci nam hendrerit platea quisque ullamcorper nibh. Lorem conubia massa varius pretium tortor condimentum purus dictum. Massa platea aptent a nisi fringilla nullam aliquam aliquet faucibus.
Suscipit consequat hac quis ultricies augue; justo convallis sollicitudin. Amet feugiat conubia sagittis; conubia praesent pretium efficitur maximus. Mauris penatibus ad metus non aptent. Mus montes tincidunt ornare; sed dignissim quis. Diam vitae augue iaculis enim tempor conubia lorem aliquet. Lectus luctus aptent imperdiet maximus integer euismod ut urna? Cras magna nam tortor leo varius. Donec orci sit ligula tristique suspendisse. Eget bibendum fermentum nascetur inceptos sodales suscipit.
Quam lorem odio sollicitudin vehicula turpis. Maximus fames tortor pharetra pulvinar, sem dignissim. Nibh parturient nam et sit ligula tempor nisl. Nibh nunc massa tristique ante tempus mattis. Ultrices tempus porta ex sagittis congue eleifend; taciti quisque. Lectus nullam efficitur; id in quam taciti. Aliquam interdum eu aptent ac tempus himenaeos. Aenean enim lacus aenean dolor efficitur eleifend pulvinar?
    `,
	},
	{
		id: "9",
		ano: "2023",
		numeroPl: "PL678/2023",
		pauta: "Atletas Trans",
		parlamentares: [
			{
				urlImagem:
					"https://superawesomevectors.com/wp-content/uploads/2016/02/businessman-with-suit-flat-vector-icon-800x566.jpg",
				nome: "André Oliveira",
				genero: "Masculino",
				religiao: "Católico",
				raca: "Preto",
				esfera: "Federal",
				partido: "PL",
				estado: "Ceará",
				profissao: "Professor",
				ideologia: "Centro",
			},
		],
		violacoes: ["Liberdade de expressão", "Direitos culturais"],
		ideologia: ["Liberdade de expressão", "Direitos culturais"],

		ementa:
			"FALSO: Permite a participação de atletas trans em competições esportivas femininas, desde que haja critério de performance.",
		justificativa: `
    Lorem ipsum odor amet, consectetuer adipiscing elit. Urna nunc sodales porttitor non orci morbi natoque. Elementum eleifend interdum sodales feugiat felis ut non. Mollis facilisi integer porta; aenean vulputate quis! Tellus suscipit maecenas ex vehicula natoque habitasse ornare tincidunt gravida. Purus congue habitant et fusce fusce mus nascetur arcu. Platea velit elit suscipit eget risus. Per odio ornare netus ornare efficitur etiam. Ad inceptos non maecenas eros blandit class.
Montes parturient ultricies erat ornare eget. Mauris habitasse molestie torquent placerat varius porta quisque donec. Pellentesque purus varius enim porta leo elit duis. Odio pretium dignissim aptent conubia, nascetur massa vel parturient. Integer luctus molestie leo, urna pellentesque pharetra ornare porta. Pellentesque elit lobortis at ultricies porttitor dictum sed augue. Tristique curae facilisi senectus leo vitae varius? Amet erat euismod sed tempus rhoncus laoreet blandit ullamcorper proin. Etiam enim metus hendrerit nisi leo non per.
Arcu lacus sociosqu condimentum ad nunc; rutrum molestie. Posuere leo consequat in; amet penatibus mollis per vivamus suspendisse. Rutrum duis at integer mi libero elementum vestibulum euismod. Euismod quis turpis auctor malesuada luctus odio. Curabitur torquent orci tincidunt dui litora est sollicitudin curabitur nulla. Primis ligula et torquent risus sollicitudin ac velit. Donec potenti suscipit scelerisque aenean habitasse dis vel placerat.
Cras malesuada nisl, nunc habitant tempus pharetra magnis ex. Etiam malesuada consectetur platea interdum fringilla torquent phasellus volutpat. Amet per consectetur taciti mollis inceptos arcu felis platea. Iaculis libero lectus finibus pharetra adipiscing mollis. Tempus dui erat velit velit quis quam integer consectetur a. Metus pellentesque ac netus; facilisi eleifend mi. Ridiculus ultrices tortor hac egestas primis vivamus viverra lacus.
Himenaeos nascetur nec nullam pretium in accumsan himenaeos aliquet habitasse. Velit potenti ridiculus malesuada elementum euismod curabitur dapibus a nostra. Condimentum mauris nibh aliquet nullam dapibus vulputate ultrices. Taciti rutrum blandit dui dui malesuada sed. Suscipit nunc nascetur ridiculus augue, mattis parturient hendrerit fames. Gravida ornare dis conubia posuere lectus convallis. Augue pellentesque erat ad felis quis facilisis.
Semper metus etiam nascetur amet hac quisque ultricies. Convallis lorem leo massa, viverra morbi urna. Turpis vestibulum maximus ultrices curae viverra diam torquent aptent lorem. Id duis nascetur netus dignissim porta senectus diam. Mollis condimentum et elit dignissim dignissim ligula. Torquent dictum condimentum vel proin lorem, pharetra iaculis nisl. Sollicitudin dictum volutpat gravida augue curae volutpat id diam ultrices. Penatibus ornare dui nunc integer arcu cras; purus cras conubia.
Sapien accumsan magna fames eu viverra montes molestie. Urna rhoncus laoreet vivamus mattis pulvinar sollicitudin. Nulla urna sem venenatis mus, mauris tempus quisque hendrerit. Curabitur convallis senectus vehicula ut orci tempor aliquam consequat. Praesent morbi etiam curae magnis diam convallis aliquam orci inceptos. Odio odio netus nibh posuere mollis sollicitudin dis natoque. Iaculis integer himenaeos non turpis quis tellus imperdiet nisi. Lacinia molestie aliquam viverra ex malesuada tellus vivamus sem eros.
Varius eleifend risus ullamcorper sagittis pretium etiam vulputate. Parturient condimentum condimentum nullam; neque nisl mollis maecenas. Lacinia porttitor dapibus orci posuere mi iaculis venenatis etiam. Efficitur turpis justo nec molestie sagittis rutrum maximus est vehicula. Condimentum orci nam hendrerit platea quisque ullamcorper nibh. Lorem conubia massa varius pretium tortor condimentum purus dictum. Massa platea aptent a nisi fringilla nullam aliquam aliquet faucibus.
Suscipit consequat hac quis ultricies augue; justo convallis sollicitudin. Amet feugiat conubia sagittis; conubia praesent pretium efficitur maximus. Mauris penatibus ad metus non aptent. Mus montes tincidunt ornare; sed dignissim quis. Diam vitae augue iaculis enim tempor conubia lorem aliquet. Lectus luctus aptent imperdiet maximus integer euismod ut urna? Cras magna nam tortor leo varius. Donec orci sit ligula tristique suspendisse. Eget bibendum fermentum nascetur inceptos sodales suscipit.
Quam lorem odio sollicitudin vehicula turpis. Maximus fames tortor pharetra pulvinar, sem dignissim. Nibh parturient nam et sit ligula tempor nisl. Nibh nunc massa tristique ante tempus mattis. Ultrices tempus porta ex sagittis congue eleifend; taciti quisque. Lectus nullam efficitur; id in quam taciti. Aliquam interdum eu aptent ac tempus himenaeos. Aenean enim lacus aenean dolor efficitur eleifend pulvinar?
    `,
	},
	{
		id: "10",
		ano: "2023",
		numeroPl: "PL891/2023",
		pauta: "Banheiros Multigênero",
		parlamentares: [
			{
				urlImagem:
					"https://static.vecteezy.com/system/resources/thumbnails/043/361/881/small/default-placeholder-avatar-profile-on-gray-background-woman-avatar-user-profile-person-icon-silhouette-profile-picture-for-unknown-or-anonymous-individual-for-social-media-website-free-vector.jpg",
				nome: "Luciana Costa",
				genero: "Feminino",
				religiao: "Cristão",
				raca: "Branco",
				esfera: "Estadual",
				partido: "PL",
				estado: "Goiás",
				profissao: "Médica",
				ideologia: "Centro Direita",
			},
		],
		violacoes: ["Liberdade de expressão", "Direitos culturais"],
		ideologia: ["Liberdade de expressão", "Direitos culturais"],

		ementa:
			"FALSO: Estabelece que os banheiros em espaços públicos devem ser unissex e sem distinção de gênero.",
		justificativa: `
    Lorem ipsum odor amet, consectetuer adipiscing elit. Urna nunc sodales porttitor non orci morbi natoque. Elementum eleifend interdum sodales feugiat felis ut non. Mollis facilisi integer porta; aenean vulputate quis! Tellus suscipit maecenas ex vehicula natoque habitasse ornare tincidunt gravida. Purus congue habitant et fusce fusce mus nascetur arcu. Platea velit elit suscipit eget risus. Per odio ornare netus ornare efficitur etiam. Ad inceptos non maecenas eros blandit class.
Montes parturient ultricies erat ornare eget. Mauris habitasse molestie torquent placerat varius porta quisque donec. Pellentesque purus varius enim porta leo elit duis. Odio pretium dignissim aptent conubia, nascetur massa vel parturient. Integer luctus molestie leo, urna pellentesque pharetra ornare porta. Pellentesque elit lobortis at ultricies porttitor dictum sed augue. Tristique curae facilisi senectus leo vitae varius? Amet erat euismod sed tempus rhoncus laoreet blandit ullamcorper proin. Etiam enim metus hendrerit nisi leo non per.
Arcu lacus sociosqu condimentum ad nunc; rutrum molestie. Posuere leo consequat in; amet penatibus mollis per vivamus suspendisse. Rutrum duis at integer mi libero elementum vestibulum euismod. Euismod quis turpis auctor malesuada luctus odio. Curabitur torquent orci tincidunt dui litora est sollicitudin curabitur nulla. Primis ligula et torquent risus sollicitudin ac velit. Donec potenti suscipit scelerisque aenean habitasse dis vel placerat.
Cras malesuada nisl, nunc habitant tempus pharetra magnis ex. Etiam malesuada consectetur platea interdum fringilla torquent phasellus volutpat. Amet per consectetur taciti mollis inceptos arcu felis platea. Iaculis libero lectus finibus pharetra adipiscing mollis. Tempus dui erat velit velit quis quam integer consectetur a. Metus pellentesque ac netus; facilisi eleifend mi. Ridiculus ultrices tortor hac egestas primis vivamus viverra lacus.
Himenaeos nascetur nec nullam pretium in accumsan himenaeos aliquet habitasse. Velit potenti ridiculus malesuada elementum euismod curabitur dapibus a nostra. Condimentum mauris nibh aliquet nullam dapibus vulputate ultrices. Taciti rutrum blandit dui dui malesuada sed. Suscipit nunc nascetur ridiculus augue, mattis parturient hendrerit fames. Gravida ornare dis conubia posuere lectus convallis. Augue pellentesque erat ad felis quis facilisis.
Semper metus etiam nascetur amet hac quisque ultricies. Convallis lorem leo massa, viverra morbi urna. Turpis vestibulum maximus ultrices curae viverra diam torquent aptent lorem. Id duis nascetur netus dignissim porta senectus diam. Mollis condimentum et elit dignissim dignissim ligula. Torquent dictum condimentum vel proin lorem, pharetra iaculis nisl. Sollicitudin dictum volutpat gravida augue curae volutpat id diam ultrices. Penatibus ornare dui nunc integer arcu cras; purus cras conubia.
Sapien accumsan magna fames eu viverra montes molestie. Urna rhoncus laoreet vivamus mattis pulvinar sollicitudin. Nulla urna sem venenatis mus, mauris tempus quisque hendrerit. Curabitur convallis senectus vehicula ut orci tempor aliquam consequat. Praesent morbi etiam curae magnis diam convallis aliquam orci inceptos. Odio odio netus nibh posuere mollis sollicitudin dis natoque. Iaculis integer himenaeos non turpis quis tellus imperdiet nisi. Lacinia molestie aliquam viverra ex malesuada tellus vivamus sem eros.
Varius eleifend risus ullamcorper sagittis pretium etiam vulputate. Parturient condimentum condimentum nullam; neque nisl mollis maecenas. Lacinia porttitor dapibus orci posuere mi iaculis venenatis etiam. Efficitur turpis justo nec molestie sagittis rutrum maximus est vehicula. Condimentum orci nam hendrerit platea quisque ullamcorper nibh. Lorem conubia massa varius pretium tortor condimentum purus dictum. Massa platea aptent a nisi fringilla nullam aliquam aliquet faucibus.
Suscipit consequat hac quis ultricies augue; justo convallis sollicitudin. Amet feugiat conubia sagittis; conubia praesent pretium efficitur maximus. Mauris penatibus ad metus non aptent. Mus montes tincidunt ornare; sed dignissim quis. Diam vitae augue iaculis enim tempor conubia lorem aliquet. Lectus luctus aptent imperdiet maximus integer euismod ut urna? Cras magna nam tortor leo varius. Donec orci sit ligula tristique suspendisse. Eget bibendum fermentum nascetur inceptos sodales suscipit.
Quam lorem odio sollicitudin vehicula turpis. Maximus fames tortor pharetra pulvinar, sem dignissim. Nibh parturient nam et sit ligula tempor nisl. Nibh nunc massa tristique ante tempus mattis. Ultrices tempus porta ex sagittis congue eleifend; taciti quisque. Lectus nullam efficitur; id in quam taciti. Aliquam interdum eu aptent ac tempus himenaeos. Aenean enim lacus aenean dolor efficitur eleifend pulvinar?
    `,
	},
	{
		id: "11",
		ano: "2023",
		numeroPl: "PL234/2023",
		pauta: "Propaganda LGBT",
		parlamentares: [
			{
				urlImagem:
					"https://superawesomevectors.com/wp-content/uploads/2016/02/businessman-with-suit-flat-vector-icon-800x566.jpg",
				nome: "Carlos Rocha",
				genero: "Masculino",
				religiao: "Evangélico",
				raca: "Branco",
				esfera: "Federal",
				partido: "PL",
				estado: "Minas Gerais",
				profissao: "Deputado",
				ideologia: "Direita",
			},
		],
		violacoes: ["Liberdade de expressão", "Direitos culturais"],
		ideologia: ["Liberdade de expressão", "Direitos culturais"],

		ementa:
			"FALSO: Limita a propaganda LGBT em horários específicos e restritos.",
		justificativa: `
    Lorem ipsum odor amet, consectetuer adipiscing elit. Urna nunc sodales porttitor non orci morbi natoque. Elementum eleifend interdum sodales feugiat felis ut non. Mollis facilisi integer porta; aenean vulputate quis! Tellus suscipit maecenas ex vehicula natoque habitasse ornare tincidunt gravida. Purus congue habitant et fusce fusce mus nascetur arcu. Platea velit elit suscipit eget risus. Per odio ornare netus ornare efficitur etiam. Ad inceptos non maecenas eros blandit class.
Montes parturient ultricies erat ornare eget. Mauris habitasse molestie torquent placerat varius porta quisque donec. Pellentesque purus varius enim porta leo elit duis. Odio pretium dignissim aptent conubia, nascetur massa vel parturient. Integer luctus molestie leo, urna pellentesque pharetra ornare porta. Pellentesque elit lobortis at ultricies porttitor dictum sed augue. Tristique curae facilisi senectus leo vitae varius? Amet erat euismod sed tempus rhoncus laoreet blandit ullamcorper proin. Etiam enim metus hendrerit nisi leo non per.
Arcu lacus sociosqu condimentum ad nunc; rutrum molestie. Posuere leo consequat in; amet penatibus mollis per vivamus suspendisse. Rutrum duis at integer mi libero elementum vestibulum euismod. Euismod quis turpis auctor malesuada luctus odio. Curabitur torquent orci tincidunt dui litora est sollicitudin curabitur nulla. Primis ligula et torquent risus sollicitudin ac velit. Donec potenti suscipit scelerisque aenean habitasse dis vel placerat.
Cras malesuada nisl, nunc habitant tempus pharetra magnis ex. Etiam malesuada consectetur platea interdum fringilla torquent phasellus volutpat. Amet per consectetur taciti mollis inceptos arcu felis platea. Iaculis libero lectus finibus pharetra adipiscing mollis. Tempus dui erat velit velit quis quam integer consectetur a. Metus pellentesque ac netus; facilisi eleifend mi. Ridiculus ultrices tortor hac egestas primis vivamus viverra lacus.
Himenaeos nascetur nec nullam pretium in accumsan himenaeos aliquet habitasse. Velit potenti ridiculus malesuada elementum euismod curabitur dapibus a nostra. Condimentum mauris nibh aliquet nullam dapibus vulputate ultrices. Taciti rutrum blandit dui dui malesuada sed. Suscipit nunc nascetur ridiculus augue, mattis parturient hendrerit fames. Gravida ornare dis conubia posuere lectus convallis. Augue pellentesque erat ad felis quis facilisis.
Semper metus etiam nascetur amet hac quisque ultricies. Convallis lorem leo massa, viverra morbi urna. Turpis vestibulum maximus ultrices curae viverra diam torquent aptent lorem. Id duis nascetur netus dignissim porta senectus diam. Mollis condimentum et elit dignissim dignissim ligula. Torquent dictum condimentum vel proin lorem, pharetra iaculis nisl. Sollicitudin dictum volutpat gravida augue curae volutpat id diam ultrices. Penatibus ornare dui nunc integer arcu cras; purus cras conubia.
Sapien accumsan magna fames eu viverra montes molestie. Urna rhoncus laoreet vivamus mattis pulvinar sollicitudin. Nulla urna sem venenatis mus, mauris tempus quisque hendrerit. Curabitur convallis senectus vehicula ut orci tempor aliquam consequat. Praesent morbi etiam curae magnis diam convallis aliquam orci inceptos. Odio odio netus nibh posuere mollis sollicitudin dis natoque. Iaculis integer himenaeos non turpis quis tellus imperdiet nisi. Lacinia molestie aliquam viverra ex malesuada tellus vivamus sem eros.
Varius eleifend risus ullamcorper sagittis pretium etiam vulputate. Parturient condimentum condimentum nullam; neque nisl mollis maecenas. Lacinia porttitor dapibus orci posuere mi iaculis venenatis etiam. Efficitur turpis justo nec molestie sagittis rutrum maximus est vehicula. Condimentum orci nam hendrerit platea quisque ullamcorper nibh. Lorem conubia massa varius pretium tortor condimentum purus dictum. Massa platea aptent a nisi fringilla nullam aliquam aliquet faucibus.
Suscipit consequat hac quis ultricies augue; justo convallis sollicitudin. Amet feugiat conubia sagittis; conubia praesent pretium efficitur maximus. Mauris penatibus ad metus non aptent. Mus montes tincidunt ornare; sed dignissim quis. Diam vitae augue iaculis enim tempor conubia lorem aliquet. Lectus luctus aptent imperdiet maximus integer euismod ut urna? Cras magna nam tortor leo varius. Donec orci sit ligula tristique suspendisse. Eget bibendum fermentum nascetur inceptos sodales suscipit.
Quam lorem odio sollicitudin vehicula turpis. Maximus fames tortor pharetra pulvinar, sem dignissim. Nibh parturient nam et sit ligula tempor nisl. Nibh nunc massa tristique ante tempus mattis. Ultrices tempus porta ex sagittis congue eleifend; taciti quisque. Lectus nullam efficitur; id in quam taciti. Aliquam interdum eu aptent ac tempus himenaeos. Aenean enim lacus aenean dolor efficitur eleifend pulvinar?
    `,
	},
	{
		id: "12",
		ano: "2021",
		numeroPl: "PL987/2021",
		pauta: "Linguagem Neutra",
		parlamentares: [
			{
				urlImagem:
					"https://superawesomevectors.com/wp-content/uploads/2016/02/businessman-with-suit-flat-vector-icon-800x566.jpg",
				nome: "José Pereira",
				genero: "Masculino",
				religiao: "Católico",
				raca: "Pardo",
				esfera: "Federal",
				partido: "PL",
				estado: "Bahia",
				profissao: "Engenheiro",
				ideologia: "Centro",
			},
		],
		violacoes: ["Liberdade de expressão", "Direitos culturais"],
		ideologia: ["Liberdade de expressão", "Direitos culturais"],

		ementa:
			"FALSO: Proíbe o uso de linguagem neutra nas escolas públicas e privadas.",
		justificativa: `
    Lorem ipsum odor amet, consectetuer adipiscing elit. Urna nunc sodales porttitor non orci morbi natoque. Elementum eleifend interdum sodales feugiat felis ut non. Mollis facilisi integer porta; aenean vulputate quis! Tellus suscipit maecenas ex vehicula natoque habitasse ornare tincidunt gravida. Purus congue habitant et fusce fusce mus nascetur arcu. Platea velit elit suscipit eget risus. Per odio ornare netus ornare efficitur etiam. Ad inceptos non maecenas eros blandit class.
Montes parturient ultricies erat ornare eget. Mauris habitasse molestie torquent placerat varius porta quisque donec. Pellentesque purus varius enim porta leo elit duis. Odio pretium dignissim aptent conubia, nascetur massa vel parturient. Integer luctus molestie leo, urna pellentesque pharetra ornare porta. Pellentesque elit lobortis at ultricies porttitor dictum sed augue. Tristique curae facilisi senectus leo vitae varius? Amet erat euismod sed tempus rhoncus laoreet blandit ullamcorper proin. Etiam enim metus hendrerit nisi leo non per.
Arcu lacus sociosqu condimentum ad nunc; rutrum molestie. Posuere leo consequat in; amet penatibus mollis per vivamus suspendisse. Rutrum duis at integer mi libero elementum vestibulum euismod. Euismod quis turpis auctor malesuada luctus odio. Curabitur torquent orci tincidunt dui litora est sollicitudin curabitur nulla. Primis ligula et torquent risus sollicitudin ac velit. Donec potenti suscipit scelerisque aenean habitasse dis vel placerat.
Cras malesuada nisl, nunc habitant tempus pharetra magnis ex. Etiam malesuada consectetur platea interdum fringilla torquent phasellus volutpat. Amet per consectetur taciti mollis inceptos arcu felis platea. Iaculis libero lectus finibus pharetra adipiscing mollis. Tempus dui erat velit velit quis quam integer consectetur a. Metus pellentesque ac netus; facilisi eleifend mi. Ridiculus ultrices tortor hac egestas primis vivamus viverra lacus.
Himenaeos nascetur nec nullam pretium in accumsan himenaeos aliquet habitasse. Velit potenti ridiculus malesuada elementum euismod curabitur dapibus a nostra. Condimentum mauris nibh aliquet nullam dapibus vulputate ultrices. Taciti rutrum blandit dui dui malesuada sed. Suscipit nunc nascetur ridiculus augue, mattis parturient hendrerit fames. Gravida ornare dis conubia posuere lectus convallis. Augue pellentesque erat ad felis quis facilisis.
Semper metus etiam nascetur amet hac quisque ultricies. Convallis lorem leo massa, viverra morbi urna. Turpis vestibulum maximus ultrices curae viverra diam torquent aptent lorem. Id duis nascetur netus dignissim porta senectus diam. Mollis condimentum et elit dignissim dignissim ligula. Torquent dictum condimentum vel proin lorem, pharetra iaculis nisl. Sollicitudin dictum volutpat gravida augue curae volutpat id diam ultrices. Penatibus ornare dui nunc integer arcu cras; purus cras conubia.
Sapien accumsan magna fames eu viverra montes molestie. Urna rhoncus laoreet vivamus mattis pulvinar sollicitudin. Nulla urna sem venenatis mus, mauris tempus quisque hendrerit. Curabitur convallis senectus vehicula ut orci tempor aliquam consequat. Praesent morbi etiam curae magnis diam convallis aliquam orci inceptos. Odio odio netus nibh posuere mollis sollicitudin dis natoque. Iaculis integer himenaeos non turpis quis tellus imperdiet nisi. Lacinia molestie aliquam viverra ex malesuada tellus vivamus sem eros.
Varius eleifend risus ullamcorper sagittis pretium etiam vulputate. Parturient condimentum condimentum nullam; neque nisl mollis maecenas. Lacinia porttitor dapibus orci posuere mi iaculis venenatis etiam. Efficitur turpis justo nec molestie sagittis rutrum maximus est vehicula. Condimentum orci nam hendrerit platea quisque ullamcorper nibh. Lorem conubia massa varius pretium tortor condimentum purus dictum. Massa platea aptent a nisi fringilla nullam aliquam aliquet faucibus.
Suscipit consequat hac quis ultricies augue; justo convallis sollicitudin. Amet feugiat conubia sagittis; conubia praesent pretium efficitur maximus. Mauris penatibus ad metus non aptent. Mus montes tincidunt ornare; sed dignissim quis. Diam vitae augue iaculis enim tempor conubia lorem aliquet. Lectus luctus aptent imperdiet maximus integer euismod ut urna? Cras magna nam tortor leo varius. Donec orci sit ligula tristique suspendisse. Eget bibendum fermentum nascetur inceptos sodales suscipit.
Quam lorem odio sollicitudin vehicula turpis. Maximus fames tortor pharetra pulvinar, sem dignissim. Nibh parturient nam et sit ligula tempor nisl. Nibh nunc massa tristique ante tempus mattis. Ultrices tempus porta ex sagittis congue eleifend; taciti quisque. Lectus nullam efficitur; id in quam taciti. Aliquam interdum eu aptent ac tempus himenaeos. Aenean enim lacus aenean dolor efficitur eleifend pulvinar?
    `,
	},
	{
		id: "13",
		ano: "2022",
		numeroPl: "PL110/2022",
		pauta: "Atletas Trans",
		parlamentares: [
			{
				urlImagem:
					"https://static.vecteezy.com/system/resources/thumbnails/043/361/881/small/default-placeholder-avatar-profile-on-gray-background-woman-avatar-user-profile-person-icon-silhouette-profile-picture-for-unknown-or-anonymous-individual-for-social-media-website-free-vector.jpg",
				nome: "Cláudia Lima",
				genero: "Feminino",
				religiao: "Cristão",
				raca: "Branco",
				esfera: "Estadual",
				partido: "PL",
				estado: "Rio de Janeiro",
				profissao: "Psicóloga",
				ideologia: "Esquerda Radical",
			},
		],
		violacoes: ["Liberdade de expressão", "Direitos culturais"],
		ideologia: ["Liberdade de expressão", "Direitos culturais"],

		ementa:
			"FALSO: Permite que atletas trans participem de competições sem exigências de hormonização.",
		justificativa: `
    Lorem ipsum odor amet, consectetuer adipiscing elit. Urna nunc sodales porttitor non orci morbi natoque. Elementum eleifend interdum sodales feugiat felis ut non. Mollis facilisi integer porta; aenean vulputate quis! Tellus suscipit maecenas ex vehicula natoque habitasse ornare tincidunt gravida. Purus congue habitant et fusce fusce mus nascetur arcu. Platea velit elit suscipit eget risus. Per odio ornare netus ornare efficitur etiam. Ad inceptos non maecenas eros blandit class.
Montes parturient ultricies erat ornare eget. Mauris habitasse molestie torquent placerat varius porta quisque donec. Pellentesque purus varius enim porta leo elit duis. Odio pretium dignissim aptent conubia, nascetur massa vel parturient. Integer luctus molestie leo, urna pellentesque pharetra ornare porta. Pellentesque elit lobortis at ultricies porttitor dictum sed augue. Tristique curae facilisi senectus leo vitae varius? Amet erat euismod sed tempus rhoncus laoreet blandit ullamcorper proin. Etiam enim metus hendrerit nisi leo non per.
Arcu lacus sociosqu condimentum ad nunc; rutrum molestie. Posuere leo consequat in; amet penatibus mollis per vivamus suspendisse. Rutrum duis at integer mi libero elementum vestibulum euismod. Euismod quis turpis auctor malesuada luctus odio. Curabitur torquent orci tincidunt dui litora est sollicitudin curabitur nulla. Primis ligula et torquent risus sollicitudin ac velit. Donec potenti suscipit scelerisque aenean habitasse dis vel placerat.
Cras malesuada nisl, nunc habitant tempus pharetra magnis ex. Etiam malesuada consectetur platea interdum fringilla torquent phasellus volutpat. Amet per consectetur taciti mollis inceptos arcu felis platea. Iaculis libero lectus finibus pharetra adipiscing mollis. Tempus dui erat velit velit quis quam integer consectetur a. Metus pellentesque ac netus; facilisi eleifend mi. Ridiculus ultrices tortor hac egestas primis vivamus viverra lacus.
Himenaeos nascetur nec nullam pretium in accumsan himenaeos aliquet habitasse. Velit potenti ridiculus malesuada elementum euismod curabitur dapibus a nostra. Condimentum mauris nibh aliquet nullam dapibus vulputate ultrices. Taciti rutrum blandit dui dui malesuada sed. Suscipit nunc nascetur ridiculus augue, mattis parturient hendrerit fames. Gravida ornare dis conubia posuere lectus convallis. Augue pellentesque erat ad felis quis facilisis.
Semper metus etiam nascetur amet hac quisque ultricies. Convallis lorem leo massa, viverra morbi urna. Turpis vestibulum maximus ultrices curae viverra diam torquent aptent lorem. Id duis nascetur netus dignissim porta senectus diam. Mollis condimentum et elit dignissim dignissim ligula. Torquent dictum condimentum vel proin lorem, pharetra iaculis nisl. Sollicitudin dictum volutpat gravida augue curae volutpat id diam ultrices. Penatibus ornare dui nunc integer arcu cras; purus cras conubia.
Sapien accumsan magna fames eu viverra montes molestie. Urna rhoncus laoreet vivamus mattis pulvinar sollicitudin. Nulla urna sem venenatis mus, mauris tempus quisque hendrerit. Curabitur convallis senectus vehicula ut orci tempor aliquam consequat. Praesent morbi etiam curae magnis diam convallis aliquam orci inceptos. Odio odio netus nibh posuere mollis sollicitudin dis natoque. Iaculis integer himenaeos non turpis quis tellus imperdiet nisi. Lacinia molestie aliquam viverra ex malesuada tellus vivamus sem eros.
Varius eleifend risus ullamcorper sagittis pretium etiam vulputate. Parturient condimentum condimentum nullam; neque nisl mollis maecenas. Lacinia porttitor dapibus orci posuere mi iaculis venenatis etiam. Efficitur turpis justo nec molestie sagittis rutrum maximus est vehicula. Condimentum orci nam hendrerit platea quisque ullamcorper nibh. Lorem conubia massa varius pretium tortor condimentum purus dictum. Massa platea aptent a nisi fringilla nullam aliquam aliquet faucibus.
Suscipit consequat hac quis ultricies augue; justo convallis sollicitudin. Amet feugiat conubia sagittis; conubia praesent pretium efficitur maximus. Mauris penatibus ad metus non aptent. Mus montes tincidunt ornare; sed dignissim quis. Diam vitae augue iaculis enim tempor conubia lorem aliquet. Lectus luctus aptent imperdiet maximus integer euismod ut urna? Cras magna nam tortor leo varius. Donec orci sit ligula tristique suspendisse. Eget bibendum fermentum nascetur inceptos sodales suscipit.
Quam lorem odio sollicitudin vehicula turpis. Maximus fames tortor pharetra pulvinar, sem dignissim. Nibh parturient nam et sit ligula tempor nisl. Nibh nunc massa tristique ante tempus mattis. Ultrices tempus porta ex sagittis congue eleifend; taciti quisque. Lectus nullam efficitur; id in quam taciti. Aliquam interdum eu aptent ac tempus himenaeos. Aenean enim lacus aenean dolor efficitur eleifend pulvinar?
    `,
	},
	{
		id: "14",
		ano: "2023",
		numeroPl: "PL111/2023",
		pauta: "Banheiros Multigênero",
		parlamentares: [
			{
				urlImagem:
					"https://superawesomevectors.com/wp-content/uploads/2016/02/businessman-with-suit-flat-vector-icon-800x566.jpg",
				nome: "Fernando Souza",
				genero: "Masculino",
				religiao: "Católico",
				raca: "Pardo",
				esfera: "Federal",
				partido: "PL",
				estado: "Espírito Santo",
				profissao: "Advogado",
				ideologia: "Centro",
			},
		],
		violacoes: ["Liberdade de expressão", "Direitos culturais"],
		ideologia: ["Liberdade de expressão", "Direitos culturais"],

		ementa:
			"FALSO: Defende a criação de banheiros públicos multigênero em estabelecimentos privados.",
		justificativa: `
    Lorem ipsum odor amet, consectetuer adipiscing elit. Urna nunc sodales porttitor non orci morbi natoque. Elementum eleifend interdum sodales feugiat felis ut non. Mollis facilisi integer porta; aenean vulputate quis! Tellus suscipit maecenas ex vehicula natoque habitasse ornare tincidunt gravida. Purus congue habitant et fusce fusce mus nascetur arcu. Platea velit elit suscipit eget risus. Per odio ornare netus ornare efficitur etiam. Ad inceptos non maecenas eros blandit class.
Montes parturient ultricies erat ornare eget. Mauris habitasse molestie torquent placerat varius porta quisque donec. Pellentesque purus varius enim porta leo elit duis. Odio pretium dignissim aptent conubia, nascetur massa vel parturient. Integer luctus molestie leo, urna pellentesque pharetra ornare porta. Pellentesque elit lobortis at ultricies porttitor dictum sed augue. Tristique curae facilisi senectus leo vitae varius? Amet erat euismod sed tempus rhoncus laoreet blandit ullamcorper proin. Etiam enim metus hendrerit nisi leo non per.
Arcu lacus sociosqu condimentum ad nunc; rutrum molestie. Posuere leo consequat in; amet penatibus mollis per vivamus suspendisse. Rutrum duis at integer mi libero elementum vestibulum euismod. Euismod quis turpis auctor malesuada luctus odio. Curabitur torquent orci tincidunt dui litora est sollicitudin curabitur nulla. Primis ligula et torquent risus sollicitudin ac velit. Donec potenti suscipit scelerisque aenean habitasse dis vel placerat.
Cras malesuada nisl, nunc habitant tempus pharetra magnis ex. Etiam malesuada consectetur platea interdum fringilla torquent phasellus volutpat. Amet per consectetur taciti mollis inceptos arcu felis platea. Iaculis libero lectus finibus pharetra adipiscing mollis. Tempus dui erat velit velit quis quam integer consectetur a. Metus pellentesque ac netus; facilisi eleifend mi. Ridiculus ultrices tortor hac egestas primis vivamus viverra lacus.
Himenaeos nascetur nec nullam pretium in accumsan himenaeos aliquet habitasse. Velit potenti ridiculus malesuada elementum euismod curabitur dapibus a nostra. Condimentum mauris nibh aliquet nullam dapibus vulputate ultrices. Taciti rutrum blandit dui dui malesuada sed. Suscipit nunc nascetur ridiculus augue, mattis parturient hendrerit fames. Gravida ornare dis conubia posuere lectus convallis. Augue pellentesque erat ad felis quis facilisis.
Semper metus etiam nascetur amet hac quisque ultricies. Convallis lorem leo massa, viverra morbi urna. Turpis vestibulum maximus ultrices curae viverra diam torquent aptent lorem. Id duis nascetur netus dignissim porta senectus diam. Mollis condimentum et elit dignissim dignissim ligula. Torquent dictum condimentum vel proin lorem, pharetra iaculis nisl. Sollicitudin dictum volutpat gravida augue curae volutpat id diam ultrices. Penatibus ornare dui nunc integer arcu cras; purus cras conubia.
Sapien accumsan magna fames eu viverra montes molestie. Urna rhoncus laoreet vivamus mattis pulvinar sollicitudin. Nulla urna sem venenatis mus, mauris tempus quisque hendrerit. Curabitur convallis senectus vehicula ut orci tempor aliquam consequat. Praesent morbi etiam curae magnis diam convallis aliquam orci inceptos. Odio odio netus nibh posuere mollis sollicitudin dis natoque. Iaculis integer himenaeos non turpis quis tellus imperdiet nisi. Lacinia molestie aliquam viverra ex malesuada tellus vivamus sem eros.
Varius eleifend risus ullamcorper sagittis pretium etiam vulputate. Parturient condimentum condimentum nullam; neque nisl mollis maecenas. Lacinia porttitor dapibus orci posuere mi iaculis venenatis etiam. Efficitur turpis justo nec molestie sagittis rutrum maximus est vehicula. Condimentum orci nam hendrerit platea quisque ullamcorper nibh. Lorem conubia massa varius pretium tortor condimentum purus dictum. Massa platea aptent a nisi fringilla nullam aliquam aliquet faucibus.
Suscipit consequat hac quis ultricies augue; justo convallis sollicitudin. Amet feugiat conubia sagittis; conubia praesent pretium efficitur maximus. Mauris penatibus ad metus non aptent. Mus montes tincidunt ornare; sed dignissim quis. Diam vitae augue iaculis enim tempor conubia lorem aliquet. Lectus luctus aptent imperdiet maximus integer euismod ut urna? Cras magna nam tortor leo varius. Donec orci sit ligula tristique suspendisse. Eget bibendum fermentum nascetur inceptos sodales suscipit.
Quam lorem odio sollicitudin vehicula turpis. Maximus fames tortor pharetra pulvinar, sem dignissim. Nibh parturient nam et sit ligula tempor nisl. Nibh nunc massa tristique ante tempus mattis. Ultrices tempus porta ex sagittis congue eleifend; taciti quisque. Lectus nullam efficitur; id in quam taciti. Aliquam interdum eu aptent ac tempus himenaeos. Aenean enim lacus aenean dolor efficitur eleifend pulvinar?
    `,
	},
	{
		id: "15",
		ano: "2021",
		numeroPl: "PL123/2021",
		pauta: "Propaganda LGBT",
		parlamentares: [
			{
				urlImagem:
					"https://static.vecteezy.com/system/resources/thumbnails/043/361/881/small/default-placeholder-avatar-profile-on-gray-background-woman-avatar-user-profile-person-icon-silhouette-profile-picture-for-unknown-or-anonymous-individual-for-social-media-website-free-vector.jpg",
				nome: "Gabriela Santos",
				genero: "Feminino",
				religiao: "Não identificado",
				raca: "Amarelo",
				esfera: "Federal",
				partido: "PL",
				estado: "São Paulo",
				profissao: "Psicóloga",
				ideologia: "Esquerda Radical",
			},
		],
		violacoes: ["Liberdade de expressão", "Direitos culturais"],
		ideologia: ["Liberdade de expressão", "Direitos culturais"],

		ementa: "FALSO: Proíbe propaganda LGBT em canais de TV por assinatura.",
		justificativa: `
  Lorem ipsum odor amet, consectetuer adipiscing elit. Urna nunc sodales porttitor non orci morbi natoque. Elementum eleifend interdum sodales feugiat felis ut non. Mollis facilisi integer porta; aenean vulputate quis! Tellus suscipit maecenas ex vehicula natoque habitasse ornare tincidunt gravida. Purus congue habitant et fusce fusce mus nascetur arcu. Platea velit elit suscipit eget risus. Per odio ornare netus ornare efficitur etiam. Ad inceptos non maecenas eros blandit class.
Montes parturient ultricies erat ornare eget. Mauris habitasse molestie torquent placerat varius porta quisque donec. Pellentesque purus varius enim porta leo elit duis. Odio pretium dignissim aptent conubia, nascetur massa vel parturient. Integer luctus molestie leo, urna pellentesque pharetra ornare porta. Pellentesque elit lobortis at ultricies porttitor dictum sed augue. Tristique curae facilisi senectus leo vitae varius? Amet erat euismod sed tempus rhoncus laoreet blandit ullamcorper proin. Etiam enim metus hendrerit nisi leo non per.
Arcu lacus sociosqu condimentum ad nunc; rutrum molestie. Posuere leo consequat in; amet penatibus mollis per vivamus suspendisse. Rutrum duis at integer mi libero elementum vestibulum euismod. Euismod quis turpis auctor malesuada luctus odio. Curabitur torquent orci tincidunt dui litora est sollicitudin curabitur nulla. Primis ligula et torquent risus sollicitudin ac velit. Donec potenti suscipit scelerisque aenean habitasse dis vel placerat.
Cras malesuada nisl, nunc habitant tempus pharetra magnis ex. Etiam malesuada consectetur platea interdum fringilla torquent phasellus volutpat. Amet per consectetur taciti mollis inceptos arcu felis platea. Iaculis libero lectus finibus pharetra adipiscing mollis. Tempus dui erat velit velit quis quam integer consectetur a. Metus pellentesque ac netus; facilisi eleifend mi. Ridiculus ultrices tortor hac egestas primis vivamus viverra lacus.
Himenaeos nascetur nec nullam pretium in accumsan himenaeos aliquet habitasse. Velit potenti ridiculus malesuada elementum euismod curabitur dapibus a nostra. Condimentum mauris nibh aliquet nullam dapibus vulputate ultrices. Taciti rutrum blandit dui dui malesuada sed. Suscipit nunc nascetur ridiculus augue, mattis parturient hendrerit fames. Gravida ornare dis conubia posuere lectus convallis. Augue pellentesque erat ad felis quis facilisis.
Semper metus etiam nascetur amet hac quisque ultricies. Convallis lorem leo massa, viverra morbi urna. Turpis vestibulum maximus ultrices curae viverra diam torquent aptent lorem. Id duis nascetur netus dignissim porta senectus diam. Mollis condimentum et elit dignissim dignissim ligula. Torquent dictum condimentum vel proin lorem, pharetra iaculis nisl. Sollicitudin dictum volutpat gravida augue curae volutpat id diam ultrices. Penatibus ornare dui nunc integer arcu cras; purus cras conubia.
Sapien accumsan magna fames eu viverra montes molestie. Urna rhoncus laoreet vivamus mattis pulvinar sollicitudin. Nulla urna sem venenatis mus, mauris tempus quisque hendrerit. Curabitur convallis senectus vehicula ut orci tempor aliquam consequat. Praesent morbi etiam curae magnis diam convallis aliquam orci inceptos. Odio odio netus nibh posuere mollis sollicitudin dis natoque. Iaculis integer himenaeos non turpis quis tellus imperdiet nisi. Lacinia molestie aliquam viverra ex malesuada tellus vivamus sem eros.
Varius eleifend risus ullamcorper sagittis pretium etiam vulputate. Parturient condimentum condimentum nullam; neque nisl mollis maecenas. Lacinia porttitor dapibus orci posuere mi iaculis venenatis etiam. Efficitur turpis justo nec molestie sagittis rutrum maximus est vehicula. Condimentum orci nam hendrerit platea quisque ullamcorper nibh. Lorem conubia massa varius pretium tortor condimentum purus dictum. Massa platea aptent a nisi fringilla nullam aliquam aliquet faucibus.
Suscipit consequat hac quis ultricies augue; justo convallis sollicitudin. Amet feugiat conubia sagittis; conubia praesent pretium efficitur maximus. Mauris penatibus ad metus non aptent. Mus montes tincidunt ornare; sed dignissim quis. Diam vitae augue iaculis enim tempor conubia lorem aliquet. Lectus luctus aptent imperdiet maximus integer euismod ut urna? Cras magna nam tortor leo varius. Donec orci sit ligula tristique suspendisse. Eget bibendum fermentum nascetur inceptos sodales suscipit.
Quam lorem odio sollicitudin vehicula turpis. Maximus fames tortor pharetra pulvinar, sem dignissim. Nibh parturient nam et sit ligula tempor nisl. Nibh nunc massa tristique ante tempus mattis. Ultrices tempus porta ex sagittis congue eleifend; taciti quisque. Lectus nullam efficitur; id in quam taciti. Aliquam interdum eu aptent ac tempus himenaeos. Aenean enim lacus aenean dolor efficitur eleifend pulvinar?
`,
	},
	{
		id: "16",
		ano: "2022",
		numeroPl: "PL123/2022",
		pauta: "Linguagem Neutra",
		parlamentares: [
			{
				urlImagem:
					"https://static.vecteezy.com/system/resources/thumbnails/043/361/881/small/default-placeholder-avatar-profile-on-gray-background-woman-avatar-user-profile-person-icon-silhouette-profile-picture-for-unknown-or-anonymous-individual-for-social-media-website-free-vector.jpg",
				nome: "Joana Silva",
				genero: "Feminino",
				religiao: "Católico",
				raca: "Branco",
				esfera: "Estadual",
				partido: "PL",
				estado: "Pará",
				profissao: "Advogada",
				ideologia: "Centro",
			},
		],
		violacoes: ["Liberdade de expressão", "Direitos culturais"],
		ideologia: ["Liberdade de expressão", "Direitos culturais"],

		ementa:
			"FALSO: Proíbe a utilização de linguagem neutra em documentos e textos oficiais.",
		justificativa: `
    Lorem ipsum odor amet, consectetuer adipiscing elit. Urna nunc sodales porttitor non orci morbi natoque. Elementum eleifend interdum sodales feugiat felis ut non. Mollis facilisi integer porta; aenean vulputate quis! Tellus suscipit maecenas ex vehicula natoque habitasse ornare tincidunt gravida. Purus congue habitant et fusce fusce mus nascetur arcu. Platea velit elit suscipit eget risus. Per odio ornare netus ornare efficitur etiam. Ad inceptos non maecenas eros blandit class.
Montes parturient ultricies erat ornare eget. Mauris habitasse molestie torquent placerat varius porta quisque donec. Pellentesque purus varius enim porta leo elit duis. Odio pretium dignissim aptent conubia, nascetur massa vel parturient. Integer luctus molestie leo, urna pellentesque pharetra ornare porta. Pellentesque elit lobortis at ultricies porttitor dictum sed augue. Tristique curae facilisi senectus leo vitae varius? Amet erat euismod sed tempus rhoncus laoreet blandit ullamcorper proin. Etiam enim metus hendrerit nisi leo non per.
Arcu lacus sociosqu condimentum ad nunc; rutrum molestie. Posuere leo consequat in; amet penatibus mollis per vivamus suspendisse. Rutrum duis at integer mi libero elementum vestibulum euismod. Euismod quis turpis auctor malesuada luctus odio. Curabitur torquent orci tincidunt dui litora est sollicitudin curabitur nulla. Primis ligula et torquent risus sollicitudin ac velit. Donec potenti suscipit scelerisque aenean habitasse dis vel placerat.
Cras malesuada nisl, nunc habitant tempus pharetra magnis ex. Etiam malesuada consectetur platea interdum fringilla torquent phasellus volutpat. Amet per consectetur taciti mollis inceptos arcu felis platea. Iaculis libero lectus finibus pharetra adipiscing mollis. Tempus dui erat velit velit quis quam integer consectetur a. Metus pellentesque ac netus; facilisi eleifend mi. Ridiculus ultrices tortor hac egestas primis vivamus viverra lacus.
Himenaeos nascetur nec nullam pretium in accumsan himenaeos aliquet habitasse. Velit potenti ridiculus malesuada elementum euismod curabitur dapibus a nostra. Condimentum mauris nibh aliquet nullam dapibus vulputate ultrices. Taciti rutrum blandit dui dui malesuada sed. Suscipit nunc nascetur ridiculus augue, mattis parturient hendrerit fames. Gravida ornare dis conubia posuere lectus convallis. Augue pellentesque erat ad felis quis facilisis.
Semper metus etiam nascetur amet hac quisque ultricies. Convallis lorem leo massa, viverra morbi urna. Turpis vestibulum maximus ultrices curae viverra diam torquent aptent lorem. Id duis nascetur netus dignissim porta senectus diam. Mollis condimentum et elit dignissim dignissim ligula. Torquent dictum condimentum vel proin lorem, pharetra iaculis nisl. Sollicitudin dictum volutpat gravida augue curae volutpat id diam ultrices. Penatibus ornare dui nunc integer arcu cras; purus cras conubia.
Sapien accumsan magna fames eu viverra montes molestie. Urna rhoncus laoreet vivamus mattis pulvinar sollicitudin. Nulla urna sem venenatis mus, mauris tempus quisque hendrerit. Curabitur convallis senectus vehicula ut orci tempor aliquam consequat. Praesent morbi etiam curae magnis diam convallis aliquam orci inceptos. Odio odio netus nibh posuere mollis sollicitudin dis natoque. Iaculis integer himenaeos non turpis quis tellus imperdiet nisi. Lacinia molestie aliquam viverra ex malesuada tellus vivamus sem eros.
Varius eleifend risus ullamcorper sagittis pretium etiam vulputate. Parturient condimentum condimentum nullam; neque nisl mollis maecenas. Lacinia porttitor dapibus orci posuere mi iaculis venenatis etiam. Efficitur turpis justo nec molestie sagittis rutrum maximus est vehicula. Condimentum orci nam hendrerit platea quisque ullamcorper nibh. Lorem conubia massa varius pretium tortor condimentum purus dictum. Massa platea aptent a nisi fringilla nullam aliquam aliquet faucibus.
Suscipit consequat hac quis ultricies augue; justo convallis sollicitudin. Amet feugiat conubia sagittis; conubia praesent pretium efficitur maximus. Mauris penatibus ad metus non aptent. Mus montes tincidunt ornare; sed dignissim quis. Diam vitae augue iaculis enim tempor conubia lorem aliquet. Lectus luctus aptent imperdiet maximus integer euismod ut urna? Cras magna nam tortor leo varius. Donec orci sit ligula tristique suspendisse. Eget bibendum fermentum nascetur inceptos sodales suscipit.
Quam lorem odio sollicitudin vehicula turpis. Maximus fames tortor pharetra pulvinar, sem dignissim. Nibh parturient nam et sit ligula tempor nisl. Nibh nunc massa tristique ante tempus mattis. Ultrices tempus porta ex sagittis congue eleifend; taciti quisque. Lectus nullam efficitur; id in quam taciti. Aliquam interdum eu aptent ac tempus himenaeos. Aenean enim lacus aenean dolor efficitur eleifend pulvinar?
    `,
	},
	{
		id: "17",
		ano: "2021",
		numeroPl: "PL765/2021",
		pauta: "Atletas Trans",
		parlamentares: [
			{
				urlImagem:
					"https://superawesomevectors.com/wp-content/uploads/2016/02/businessman-with-suit-flat-vector-icon-800x566.jpg",
				nome: "André Gomes",
				genero: "Masculino",
				religiao: "Evangélico",
				raca: "Branco",
				esfera: "Federal",
				partido: "PL",
				estado: "Pará",
				profissao: "Empresário",
				ideologia: "Centro",
			},
		],
		violacoes: ["Liberdade de expressão", "Direitos culturais"],
		ideologia: ["Liberdade de expressão", "Direitos culturais"],

		ementa:
			"FALSO: Proíbe a participação de atletas trans em categorias esportivas femininas.",
		justificativa: `
    Lorem ipsum odor amet, consectetuer adipiscing elit. Urna nunc sodales porttitor non orci morbi natoque. Elementum eleifend interdum sodales feugiat felis ut non. Mollis facilisi integer porta; aenean vulputate quis! Tellus suscipit maecenas ex vehicula natoque habitasse ornare tincidunt gravida. Purus congue habitant et fusce fusce mus nascetur arcu. Platea velit elit suscipit eget risus. Per odio ornare netus ornare efficitur etiam. Ad inceptos non maecenas eros blandit class.
Montes parturient ultricies erat ornare eget. Mauris habitasse molestie torquent placerat varius porta quisque donec. Pellentesque purus varius enim porta leo elit duis. Odio pretium dignissim aptent conubia, nascetur massa vel parturient. Integer luctus molestie leo, urna pellentesque pharetra ornare porta. Pellentesque elit lobortis at ultricies porttitor dictum sed augue. Tristique curae facilisi senectus leo vitae varius? Amet erat euismod sed tempus rhoncus laoreet blandit ullamcorper proin. Etiam enim metus hendrerit nisi leo non per.
Arcu lacus sociosqu condimentum ad nunc; rutrum molestie. Posuere leo consequat in; amet penatibus mollis per vivamus suspendisse. Rutrum duis at integer mi libero elementum vestibulum euismod. Euismod quis turpis auctor malesuada luctus odio. Curabitur torquent orci tincidunt dui litora est sollicitudin curabitur nulla. Primis ligula et torquent risus sollicitudin ac velit. Donec potenti suscipit scelerisque aenean habitasse dis vel placerat.
Cras malesuada nisl, nunc habitant tempus pharetra magnis ex. Etiam malesuada consectetur platea interdum fringilla torquent phasellus volutpat. Amet per consectetur taciti mollis inceptos arcu felis platea. Iaculis libero lectus finibus pharetra adipiscing mollis. Tempus dui erat velit velit quis quam integer consectetur a. Metus pellentesque ac netus; facilisi eleifend mi. Ridiculus ultrices tortor hac egestas primis vivamus viverra lacus.
Himenaeos nascetur nec nullam pretium in accumsan himenaeos aliquet habitasse. Velit potenti ridiculus malesuada elementum euismod curabitur dapibus a nostra. Condimentum mauris nibh aliquet nullam dapibus vulputate ultrices. Taciti rutrum blandit dui dui malesuada sed. Suscipit nunc nascetur ridiculus augue, mattis parturient hendrerit fames. Gravida ornare dis conubia posuere lectus convallis. Augue pellentesque erat ad felis quis facilisis.
Semper metus etiam nascetur amet hac quisque ultricies. Convallis lorem leo massa, viverra morbi urna. Turpis vestibulum maximus ultrices curae viverra diam torquent aptent lorem. Id duis nascetur netus dignissim porta senectus diam. Mollis condimentum et elit dignissim dignissim ligula. Torquent dictum condimentum vel proin lorem, pharetra iaculis nisl. Sollicitudin dictum volutpat gravida augue curae volutpat id diam ultrices. Penatibus ornare dui nunc integer arcu cras; purus cras conubia.
Sapien accumsan magna fames eu viverra montes molestie. Urna rhoncus laoreet vivamus mattis pulvinar sollicitudin. Nulla urna sem venenatis mus, mauris tempus quisque hendrerit. Curabitur convallis senectus vehicula ut orci tempor aliquam consequat. Praesent morbi etiam curae magnis diam convallis aliquam orci inceptos. Odio odio netus nibh posuere mollis sollicitudin dis natoque. Iaculis integer himenaeos non turpis quis tellus imperdiet nisi. Lacinia molestie aliquam viverra ex malesuada tellus vivamus sem eros.
Varius eleifend risus ullamcorper sagittis pretium etiam vulputate. Parturient condimentum condimentum nullam; neque nisl mollis maecenas. Lacinia porttitor dapibus orci posuere mi iaculis venenatis etiam. Efficitur turpis justo nec molestie sagittis rutrum maximus est vehicula. Condimentum orci nam hendrerit platea quisque ullamcorper nibh. Lorem conubia massa varius pretium tortor condimentum purus dictum. Massa platea aptent a nisi fringilla nullam aliquam aliquet faucibus.
Suscipit consequat hac quis ultricies augue; justo convallis sollicitudin. Amet feugiat conubia sagittis; conubia praesent pretium efficitur maximus. Mauris penatibus ad metus non aptent. Mus montes tincidunt ornare; sed dignissim quis. Diam vitae augue iaculis enim tempor conubia lorem aliquet. Lectus luctus aptent imperdiet maximus integer euismod ut urna? Cras magna nam tortor leo varius. Donec orci sit ligula tristique suspendisse. Eget bibendum fermentum nascetur inceptos sodales suscipit.
Quam lorem odio sollicitudin vehicula turpis. Maximus fames tortor pharetra pulvinar, sem dignissim. Nibh parturient nam et sit ligula tempor nisl. Nibh nunc massa tristique ante tempus mattis. Ultrices tempus porta ex sagittis congue eleifend; taciti quisque. Lectus nullam efficitur; id in quam taciti. Aliquam interdum eu aptent ac tempus himenaeos. Aenean enim lacus aenean dolor efficitur eleifend pulvinar?
    `,
	},
	{
		id: "18",
		ano: "2023",
		numeroPl: "PL1111/2023",
		pauta: "Banheiros Multigênero",
		parlamentares: [
			{
				urlImagem:
					"https://static.vecteezy.com/system/resources/thumbnails/043/361/881/small/default-placeholder-avatar-profile-on-gray-background-woman-avatar-user-profile-person-icon-silhouette-profile-picture-for-unknown-or-anonymous-individual-for-social-media-website-free-vector.jpg",
				nome: "Tânia Costa",
				genero: "Feminino",
				religiao: "Católico",
				raca: "Branco",
				esfera: "Federal",
				partido: "PL",
				estado: "Minas Gerais",
				profissao: "Engenheira",
				ideologia: "Centro",
			},
		],
		violacoes: ["Liberdade de expressão", "Direitos culturais"],
		ideologia: ["Liberdade de expressão", "Direitos culturais"],

		ementa:
			"FALSO: Estabelece o uso de banheiros multigênero para promover inclusão social.",
		justificativa: `
    Lorem ipsum odor amet, consectetuer adipiscing elit. Urna nunc sodales porttitor non orci morbi natoque. Elementum eleifend interdum sodales feugiat felis ut non. Mollis facilisi integer porta; aenean vulputate quis! Tellus suscipit maecenas ex vehicula natoque habitasse ornare tincidunt gravida. Purus congue habitant et fusce fusce mus nascetur arcu. Platea velit elit suscipit eget risus. Per odio ornare netus ornare efficitur etiam. Ad inceptos non maecenas eros blandit class.
Montes parturient ultricies erat ornare eget. Mauris habitasse molestie torquent placerat varius porta quisque donec. Pellentesque purus varius enim porta leo elit duis. Odio pretium dignissim aptent conubia, nascetur massa vel parturient. Integer luctus molestie leo, urna pellentesque pharetra ornare porta. Pellentesque elit lobortis at ultricies porttitor dictum sed augue. Tristique curae facilisi senectus leo vitae varius? Amet erat euismod sed tempus rhoncus laoreet blandit ullamcorper proin. Etiam enim metus hendrerit nisi leo non per.
Arcu lacus sociosqu condimentum ad nunc; rutrum molestie. Posuere leo consequat in; amet penatibus mollis per vivamus suspendisse. Rutrum duis at integer mi libero elementum vestibulum euismod. Euismod quis turpis auctor malesuada luctus odio. Curabitur torquent orci tincidunt dui litora est sollicitudin curabitur nulla. Primis ligula et torquent risus sollicitudin ac velit. Donec potenti suscipit scelerisque aenean habitasse dis vel placerat.
Cras malesuada nisl, nunc habitant tempus pharetra magnis ex. Etiam malesuada consectetur platea interdum fringilla torquent phasellus volutpat. Amet per consectetur taciti mollis inceptos arcu felis platea. Iaculis libero lectus finibus pharetra adipiscing mollis. Tempus dui erat velit velit quis quam integer consectetur a. Metus pellentesque ac netus; facilisi eleifend mi. Ridiculus ultrices tortor hac egestas primis vivamus viverra lacus.
Himenaeos nascetur nec nullam pretium in accumsan himenaeos aliquet habitasse. Velit potenti ridiculus malesuada elementum euismod curabitur dapibus a nostra. Condimentum mauris nibh aliquet nullam dapibus vulputate ultrices. Taciti rutrum blandit dui dui malesuada sed. Suscipit nunc nascetur ridiculus augue, mattis parturient hendrerit fames. Gravida ornare dis conubia posuere lectus convallis. Augue pellentesque erat ad felis quis facilisis.
Semper metus etiam nascetur amet hac quisque ultricies. Convallis lorem leo massa, viverra morbi urna. Turpis vestibulum maximus ultrices curae viverra diam torquent aptent lorem. Id duis nascetur netus dignissim porta senectus diam. Mollis condimentum et elit dignissim dignissim ligula. Torquent dictum condimentum vel proin lorem, pharetra iaculis nisl. Sollicitudin dictum volutpat gravida augue curae volutpat id diam ultrices. Penatibus ornare dui nunc integer arcu cras; purus cras conubia.
Sapien accumsan magna fames eu viverra montes molestie. Urna rhoncus laoreet vivamus mattis pulvinar sollicitudin. Nulla urna sem venenatis mus, mauris tempus quisque hendrerit. Curabitur convallis senectus vehicula ut orci tempor aliquam consequat. Praesent morbi etiam curae magnis diam convallis aliquam orci inceptos. Odio odio netus nibh posuere mollis sollicitudin dis natoque. Iaculis integer himenaeos non turpis quis tellus imperdiet nisi. Lacinia molestie aliquam viverra ex malesuada tellus vivamus sem eros.
Varius eleifend risus ullamcorper sagittis pretium etiam vulputate. Parturient condimentum condimentum nullam; neque nisl mollis maecenas. Lacinia porttitor dapibus orci posuere mi iaculis venenatis etiam. Efficitur turpis justo nec molestie sagittis rutrum maximus est vehicula. Condimentum orci nam hendrerit platea quisque ullamcorper nibh. Lorem conubia massa varius pretium tortor condimentum purus dictum. Massa platea aptent a nisi fringilla nullam aliquam aliquet faucibus.
Suscipit consequat hac quis ultricies augue; justo convallis sollicitudin. Amet feugiat conubia sagittis; conubia praesent pretium efficitur maximus. Mauris penatibus ad metus non aptent. Mus montes tincidunt ornare; sed dignissim quis. Diam vitae augue iaculis enim tempor conubia lorem aliquet. Lectus luctus aptent imperdiet maximus integer euismod ut urna? Cras magna nam tortor leo varius. Donec orci sit ligula tristique suspendisse. Eget bibendum fermentum nascetur inceptos sodales suscipit.
Quam lorem odio sollicitudin vehicula turpis. Maximus fames tortor pharetra pulvinar, sem dignissim. Nibh parturient nam et sit ligula tempor nisl. Nibh nunc massa tristique ante tempus mattis. Ultrices tempus porta ex sagittis congue eleifend; taciti quisque. Lectus nullam efficitur; id in quam taciti. Aliquam interdum eu aptent ac tempus himenaeos. Aenean enim lacus aenean dolor efficitur eleifend pulvinar?
    `,
	},
	{
		id: "19",
		ano: "2023",
		numeroPl: "PL453/2023",
		pauta: "Propaganda LGBT",
		parlamentares: [
			{
				urlImagem:
					"https://superawesomevectors.com/wp-content/uploads/2016/02/businessman-with-suit-flat-vector-icon-800x566.jpg",
				nome: "Daniel Oliveira",
				genero: "Masculino",
				religiao: "Evangélico",
				raca: "Branco",
				esfera: "Estadual",
				partido: "PL",
				estado: "Santa Catarina",
				profissao: "Comerciante",
				ideologia: "Centro Direita",
			},
		],
		violacoes: ["Liberdade de expressão", "Direitos culturais"],
		ideologia: ["Liberdade de expressão", "Direitos culturais"],

		ementa:
			"FALSO: Proíbe a veiculação de conteúdo LGBTQI+ na publicidade voltada ao público infanto-juvenil.",
		justificativa: `
    Lorem ipsum odor amet, consectetuer adipiscing elit. Urna nunc sodales porttitor non orci morbi natoque. Elementum eleifend interdum sodales feugiat felis ut non. Mollis facilisi integer porta; aenean vulputate quis! Tellus suscipit maecenas ex vehicula natoque habitasse ornare tincidunt gravida. Purus congue habitant et fusce fusce mus nascetur arcu. Platea velit elit suscipit eget risus. Per odio ornare netus ornare efficitur etiam. Ad inceptos non maecenas eros blandit class.
Montes parturient ultricies erat ornare eget. Mauris habitasse molestie torquent placerat varius porta quisque donec. Pellentesque purus varius enim porta leo elit duis. Odio pretium dignissim aptent conubia, nascetur massa vel parturient. Integer luctus molestie leo, urna pellentesque pharetra ornare porta. Pellentesque elit lobortis at ultricies porttitor dictum sed augue. Tristique curae facilisi senectus leo vitae varius? Amet erat euismod sed tempus rhoncus laoreet blandit ullamcorper proin. Etiam enim metus hendrerit nisi leo non per.
Arcu lacus sociosqu condimentum ad nunc; rutrum molestie. Posuere leo consequat in; amet penatibus mollis per vivamus suspendisse. Rutrum duis at integer mi libero elementum vestibulum euismod. Euismod quis turpis auctor malesuada luctus odio. Curabitur torquent orci tincidunt dui litora est sollicitudin curabitur nulla. Primis ligula et torquent risus sollicitudin ac velit. Donec potenti suscipit scelerisque aenean habitasse dis vel placerat.
Cras malesuada nisl, nunc habitant tempus pharetra magnis ex. Etiam malesuada consectetur platea interdum fringilla torquent phasellus volutpat. Amet per consectetur taciti mollis inceptos arcu felis platea. Iaculis libero lectus finibus pharetra adipiscing mollis. Tempus dui erat velit velit quis quam integer consectetur a. Metus pellentesque ac netus; facilisi eleifend mi. Ridiculus ultrices tortor hac egestas primis vivamus viverra lacus.
Himenaeos nascetur nec nullam pretium in accumsan himenaeos aliquet habitasse. Velit potenti ridiculus malesuada elementum euismod curabitur dapibus a nostra. Condimentum mauris nibh aliquet nullam dapibus vulputate ultrices. Taciti rutrum blandit dui dui malesuada sed. Suscipit nunc nascetur ridiculus augue, mattis parturient hendrerit fames. Gravida ornare dis conubia posuere lectus convallis. Augue pellentesque erat ad felis quis facilisis.
Semper metus etiam nascetur amet hac quisque ultricies. Convallis lorem leo massa, viverra morbi urna. Turpis vestibulum maximus ultrices curae viverra diam torquent aptent lorem. Id duis nascetur netus dignissim porta senectus diam. Mollis condimentum et elit dignissim dignissim ligula. Torquent dictum condimentum vel proin lorem, pharetra iaculis nisl. Sollicitudin dictum volutpat gravida augue curae volutpat id diam ultrices. Penatibus ornare dui nunc integer arcu cras; purus cras conubia.
Sapien accumsan magna fames eu viverra montes molestie. Urna rhoncus laoreet vivamus mattis pulvinar sollicitudin. Nulla urna sem venenatis mus, mauris tempus quisque hendrerit. Curabitur convallis senectus vehicula ut orci tempor aliquam consequat. Praesent morbi etiam curae magnis diam convallis aliquam orci inceptos. Odio odio netus nibh posuere mollis sollicitudin dis natoque. Iaculis integer himenaeos non turpis quis tellus imperdiet nisi. Lacinia molestie aliquam viverra ex malesuada tellus vivamus sem eros.
Varius eleifend risus ullamcorper sagittis pretium etiam vulputate. Parturient condimentum condimentum nullam; neque nisl mollis maecenas. Lacinia porttitor dapibus orci posuere mi iaculis venenatis etiam. Efficitur turpis justo nec molestie sagittis rutrum maximus est vehicula. Condimentum orci nam hendrerit platea quisque ullamcorper nibh. Lorem conubia massa varius pretium tortor condimentum purus dictum. Massa platea aptent a nisi fringilla nullam aliquam aliquet faucibus.
Suscipit consequat hac quis ultricies augue; justo convallis sollicitudin. Amet feugiat conubia sagittis; conubia praesent pretium efficitur maximus. Mauris penatibus ad metus non aptent. Mus montes tincidunt ornare; sed dignissim quis. Diam vitae augue iaculis enim tempor conubia lorem aliquet. Lectus luctus aptent imperdiet maximus integer euismod ut urna? Cras magna nam tortor leo varius. Donec orci sit ligula tristique suspendisse. Eget bibendum fermentum nascetur inceptos sodales suscipit.
Quam lorem odio sollicitudin vehicula turpis. Maximus fames tortor pharetra pulvinar, sem dignissim. Nibh parturient nam et sit ligula tempor nisl. Nibh nunc massa tristique ante tempus mattis. Ultrices tempus porta ex sagittis congue eleifend; taciti quisque. Lectus nullam efficitur; id in quam taciti. Aliquam interdum eu aptent ac tempus himenaeos. Aenean enim lacus aenean dolor efficitur eleifend pulvinar?
    `,
	},
	{
		id: "20",
		ano: "2022",
		numeroPl: "PL899/2022",
		pauta: "Linguagem Neutra",
		parlamentares: [
			{
				urlImagem:
					"https://static.vecteezy.com/system/resources/thumbnails/043/361/881/small/default-placeholder-avatar-profile-on-gray-background-woman-avatar-user-profile-person-icon-silhouette-profile-picture-for-unknown-or-anonymous-individual-for-social-media-website-free-vector.jpg",
				nome: "Roberta Lima",
				genero: "Feminino",
				religiao: "Não identificado",
				raca: "Branco",
				esfera: "Federal",
				partido: "PL",
				estado: "São Paulo",
				profissao: "Psicóloga",
				ideologia: "Esquerda",
			},
		],
		violacoes: ["Liberdade de expressão", "Direitos culturais"],
		ideologia: ["Liberdade de expressão", "Direitos culturais"],

		ementa:
			"FALSO: Exige que a linguagem neutra seja adotada em todos os documentos públicos.",
		justificativa: `
    Lorem ipsum odor amet, consectetuer adipiscing elit. Urna nunc sodales porttitor non orci morbi natoque. Elementum eleifend interdum sodales feugiat felis ut non. Mollis facilisi integer porta; aenean vulputate quis! Tellus suscipit maecenas ex vehicula natoque habitasse ornare tincidunt gravida. Purus congue habitant et fusce fusce mus nascetur arcu. Platea velit elit suscipit eget risus. Per odio ornare netus ornare efficitur etiam. Ad inceptos non maecenas eros blandit class.
Montes parturient ultricies erat ornare eget. Mauris habitasse molestie torquent placerat varius porta quisque donec. Pellentesque purus varius enim porta leo elit duis. Odio pretium dignissim aptent conubia, nascetur massa vel parturient. Integer luctus molestie leo, urna pellentesque pharetra ornare porta. Pellentesque elit lobortis at ultricies porttitor dictum sed augue. Tristique curae facilisi senectus leo vitae varius? Amet erat euismod sed tempus rhoncus laoreet blandit ullamcorper proin. Etiam enim metus hendrerit nisi leo non per.
Arcu lacus sociosqu condimentum ad nunc; rutrum molestie. Posuere leo consequat in; amet penatibus mollis per vivamus suspendisse. Rutrum duis at integer mi libero elementum vestibulum euismod. Euismod quis turpis auctor malesuada luctus odio. Curabitur torquent orci tincidunt dui litora est sollicitudin curabitur nulla. Primis ligula et torquent risus sollicitudin ac velit. Donec potenti suscipit scelerisque aenean habitasse dis vel placerat.
Cras malesuada nisl, nunc habitant tempus pharetra magnis ex. Etiam malesuada consectetur platea interdum fringilla torquent phasellus volutpat. Amet per consectetur taciti mollis inceptos arcu felis platea. Iaculis libero lectus finibus pharetra adipiscing mollis. Tempus dui erat velit velit quis quam integer consectetur a. Metus pellentesque ac netus; facilisi eleifend mi. Ridiculus ultrices tortor hac egestas primis vivamus viverra lacus.
Himenaeos nascetur nec nullam pretium in accumsan himenaeos aliquet habitasse. Velit potenti ridiculus malesuada elementum euismod curabitur dapibus a nostra. Condimentum mauris nibh aliquet nullam dapibus vulputate ultrices. Taciti rutrum blandit dui dui malesuada sed. Suscipit nunc nascetur ridiculus augue, mattis parturient hendrerit fames. Gravida ornare dis conubia posuere lectus convallis. Augue pellentesque erat ad felis quis facilisis.
Semper metus etiam nascetur amet hac quisque ultricies. Convallis lorem leo massa, viverra morbi urna. Turpis vestibulum maximus ultrices curae viverra diam torquent aptent lorem. Id duis nascetur netus dignissim porta senectus diam. Mollis condimentum et elit dignissim dignissim ligula. Torquent dictum condimentum vel proin lorem, pharetra iaculis nisl. Sollicitudin dictum volutpat gravida augue curae volutpat id diam ultrices. Penatibus ornare dui nunc integer arcu cras; purus cras conubia.
Sapien accumsan magna fames eu viverra montes molestie. Urna rhoncus laoreet vivamus mattis pulvinar sollicitudin. Nulla urna sem venenatis mus, mauris tempus quisque hendrerit. Curabitur convallis senectus vehicula ut orci tempor aliquam consequat. Praesent morbi etiam curae magnis diam convallis aliquam orci inceptos. Odio odio netus nibh posuere mollis sollicitudin dis natoque. Iaculis integer himenaeos non turpis quis tellus imperdiet nisi. Lacinia molestie aliquam viverra ex malesuada tellus vivamus sem eros.
Varius eleifend risus ullamcorper sagittis pretium etiam vulputate. Parturient condimentum condimentum nullam; neque nisl mollis maecenas. Lacinia porttitor dapibus orci posuere mi iaculis venenatis etiam. Efficitur turpis justo nec molestie sagittis rutrum maximus est vehicula. Condimentum orci nam hendrerit platea quisque ullamcorper nibh. Lorem conubia massa varius pretium tortor condimentum purus dictum. Massa platea aptent a nisi fringilla nullam aliquam aliquet faucibus.
Suscipit consequat hac quis ultricies augue; justo convallis sollicitudin. Amet feugiat conubia sagittis; conubia praesent pretium efficitur maximus. Mauris penatibus ad metus non aptent. Mus montes tincidunt ornare; sed dignissim quis. Diam vitae augue iaculis enim tempor conubia lorem aliquet. Lectus luctus aptent imperdiet maximus integer euismod ut urna? Cras magna nam tortor leo varius. Donec orci sit ligula tristique suspendisse. Eget bibendum fermentum nascetur inceptos sodales suscipit.
Quam lorem odio sollicitudin vehicula turpis. Maximus fames tortor pharetra pulvinar, sem dignissim. Nibh parturient nam et sit ligula tempor nisl. Nibh nunc massa tristique ante tempus mattis. Ultrices tempus porta ex sagittis congue eleifend; taciti quisque. Lectus nullam efficitur; id in quam taciti. Aliquam interdum eu aptent ac tempus himenaeos. Aenean enim lacus aenean dolor efficitur eleifend pulvinar?
    `,
	},
];

const partidosMock = [
	{
		nome: "Partido Liberal",
		sigla: "PL",
		parlamentares: "10",
		propostas: "9",
		urlImagem:
			"https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/2023_logo_of_the_Liberal_Party_%28Brazil%2C_2006%29.svg/1200px-2023_logo_of_the_Liberal_Party_%28Brazil%2C_2006%29.svg.png",
	},
	{
		nome: "Partido Progressista",
		sigla: "PP",
		parlamentares: "15",
		propostas: "12",
		urlImagem:
			"https://amigosdepelotas.com.br/wp-content/uploads/2019/05/PP.png",
	},
	{
		nome: "União Brasil",
		sigla: "UB",
		parlamentares: "20",
		propostas: "18",
		urlImagem:
			"https://s2-oglobo.glbimg.com/spWSXaxi1WhIbbeOAj0O38unXrI=/1200x/smart/filters:cover():strip_icc()/i.s3.glbimg.com/v1/AUTH_da025474c0c44edd99332dddb09cabe8/internal_photos/bs/2024/T/Q/ddIKCrSAuk686zXBpeoA/uniao.png",
	},
	{
		nome: "Democratas",
		sigla: "DEM",
		parlamentares: "8",
		propostas: "7",
		urlImagem:
			"https://static.poder360.com.br/2020/11/logo-dem_Prancheta-1.jpg",
	},

	{
		nome: "Partido Social Cristão",
		sigla: "PSC",
		parlamentares: "5",
		propostas: "4",
		urlImagem:
			"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShokk0wx76h4rATLJDY7ERLpeJptsWWJx0OA&s",
	},
	{
		nome: "Partido Renovador Trabalhista Brasileiro",
		sigla: "PRTB",
		parlamentares: "3",
		propostas: "2",
		urlImagem:
			"https://neamp.pucsp.br/images/logos/partido-renovador-trabalhista-brasileiro-prtb.png",
	},
	{
		nome: "Partido Trabalhista Brasileiro",
		sigla: "PTB",
		parlamentares: "7",
		propostas: "6",
		urlImagem:
			"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYRW_WKqEG8YkBOPxxo7xz-OEoCu1yYjGsbg&s",
	},
	{
		nome: "Partido Republicano da Ordem Social",
		sigla: "PROS",
		parlamentares: "6",
		propostas: "5",
		urlImagem:
			"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrbPqUzX3zp6pnSIddFufdZaXNw-Kr6eNA3A&s",
	},
	{
		nome: "Partido Novo",
		sigla: "NOVO",
		parlamentares: "12",
		propostas: "10",
		urlImagem:
			"https://www.curitiba.pr.leg.br/vereadores/imagens/logos-partidos/LogopartidoNovo.png/image",
	},
	{
		nome: "Avante",
		sigla: "AVANTE",
		parlamentares: "4",
		propostas: "3",
		urlImagem:
			"https://http2.mlstatic.com/D_NQ_NP_898952-MLB73111613612_122023-O.webp",
	},

	{
		nome: "Patriota",
		sigla: "PATRI",
		parlamentares: "5",
		propostas: "4",
		urlImagem:
			"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBz59t0ghrmPQNe8BnbNKqjVZBhmS1NYr4_4lI5COQKuNRehTRApgLKhzVv1taEHc9aBk&usqp=CAU",
	},
	{
		nome: "Solidariedade",
		sigla: "SD",
		parlamentares: "6",
		propostas: "5",
		urlImagem:
			"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRhWe0kYkWQDiqeTCjZsLMEJbwep9-dPxYOA&s",
	},
];

const legendas = [
	{
		titulo: "PL's",
		cor: "text-[#93F996]",
		resumo: `
      Os Projetos de Lei (PLs) são propostas oficiais para criar, alterar ou revogar leis. No ObservaDH, focamos em monitorar aqueles que impactam diretamente a população LGBTI+.
    `,
		texto: `
      Um Projeto de Lei (PL) é o instrumento formal utilizado por parlamentares para propor novas regras que regerão a sociedade. Eles podem abranger desde mudanças simples no cotidiano até alterações profundas nas garantias individuais e coletivas.
      
      Monitorar os PLs é fundamental porque muitos retrocessos em direitos humanos são propostos por meio de textos técnicos e jargões jurídicos complexos, que dificultam a compreensão da sociedade civil. Se não acompanhados de perto, podem se tornar leis e legitimar violações de direitos.
      
      No contexto do ObservaDH, nossa equipe filtra e classifica essas propostas. Traduzimos os dados desses projetos para que você possa entender claramente quem são os autores, quais são as reais intenções dos textos e como eles afetam as conquistas da comunidade LGBTI+.
    `,
	},
	{
		titulo: "Pautas",
		cor: "text-[#F693F9]",
		resumo: `
      As pautas são as categorias temáticas centrais discutidas nos projetos. Elas nos ajudam a organizar, classificar e entender o foco principal das movimentações legislativas.
    `,
		texto: `
      As pautas representam os assuntos fundamentais que estruturam um Projeto de Lei. Elas indicam qual área da vida em sociedade está sendo alvo de discussão legislativa, englobando temas como saúde, educação inclusiva, segurança pública, família ou identidade de gênero.
      
      Analisar os projetos através de suas pautas permite identificar tendências e padrões no discurso político. Por exemplo, através dessa classificação, podemos mapear de forma precisa se há uma onda de iniciativas parlamentares tentando restringir o acesso à saúde ou banir debates sobre diversidade nas escolas.
      
      O ObservaDH utiliza métodos específicos para classificar os PLs nessas pautas temáticas. Essa organização alimenta nossos gráficos dinâmicos, permitindo que a população filtre as informações e compreenda visualmente quais áreas dos direitos humanos estão sob maior ataque no Legislativo.
    `,
	},
];

export { apresentacao, legendas, mockStatus, partidosMock, projetosMock };
