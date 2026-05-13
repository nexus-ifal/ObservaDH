// Apresentação do ObservaDH
const apresentacao = {
	subtitulo: "O que é o",
	titulo: "ObservaDH?",
	cor: "text-[#87D9FF]",
	texto: `O Observatório Digital de Discurso e Direitos Humanos (ObservaDH) é uma iniciativa acadêmica e tecnológica que nasce da urgência de monitorar e dar visibilidade ao cenário político brasileiro. Desenvolvido no âmbito dos programas de pesquisa PIBIC e PIBITI, o projeto atua como uma ferramenta essencial de fiscalização cidadã, focada em rastrear proposições parlamentares — como Projetos de Lei (PLs) e Propostas de Emenda à Constituição (PECs) — que ameacem ou tentem restringir os Direitos Humanos, com atenção especial à proteção da população LGBTI+.

A criação da plataforma responde a um contexto histórico e social alarmante. O Brasil não apenas lidera os rankings globais de violência contra a comunidade LGBTI+, como também ocupa posições críticas na letalidade de defensores dos direitos humanos. Apesar de avanços tardios, como a criminalização da homotransfobia alcançada apenas em 2019, pesquisadores apontam que, desde 2013, há uma proliferação de iniciativas dentro do Congresso Nacional que buscam ativamente obstruir ou reverter as conquistas dessa população. Diariamente, um volume massivo de dados e propostas tramita nas Casas Legislativas de forma técnica e opaca, passando despercebido por grande parte da sociedade.

É exatamente nesse vácuo de informação que o ObservaDH atua. A plataforma coleta e analisa essa vasta quantidade de dados burocráticos e os traduz em informações acessíveis. Por meio de métodos de classificação textual e do desenvolvimento de gráficos dinâmicos e interativos, o observatório transforma o jargão legislativo em um panorama visual e claro para qualquer cidadão.

Muito mais do que um repositório de dados, o ObservaDH é um instrumento prático de participação democrática e transparência. Ao expor de maneira didática as movimentações do Poder Legislativo, a plataforma empodera a população para que possa monitorar e cobrar seus representantes eleitos. Além disso, fornece subsídios fundamentais para a criação de novas políticas públicas e atua na educação em direitos humanos, garantindo que as tentativas de retrocesso institucional não aconteçam no escuro`,
};

// Cards de Esfera - HOME
const cardsEsfera = [
	{
		subtitulo: "Visão",
		titulo: "Geral",
		texto:
			"Acesse o panorama completo de todas as proposições mapeadas. Acompanhe e fiscalize de forma unificada os projetos que impactam os direitos da população LGBTI+ em todo o país.",
		rota: "/projetos",
		cor: "text-[#93F996]",
	},
	{
		subtitulo: "Esfera",
		titulo: "Federal",
		texto:
			"Monitore as atividades do Congresso Nacional. Acompanhe os Projetos de Lei (PLs) e Propostas de Emenda à Constituição (PECs) em tramitação na Câmara dos Deputados e no Senado.",
		rota: "/projetos?esfera=federal",
		cor: "text-[#FDFF78]",
	},
	{
		subtitulo: "Esfera",
		titulo: "Estadual",
		texto:
			"Fiscalize a atuação nas Assembleias Legislativas. Explore as iniciativas parlamentares de deputados estaduais que afetam as políticas públicas e os direitos humanos em cada estado.",
		rota: "/projetos?esfera=estadual",
		cor: "text-[#F693F9]",
	},
];

// Cards Informativos - HOME
const cardsInformativos = [
	{
		titulo: "Conheça",
		subtitulo: "os Parlamentares",
		texto:
			"Descubra quem são os autores das propostas legislativas. Monitore a atuação dos representantes eleitos e veja como eles se posicionam em relação aos direitos LGBTI+.",
		rota: "/parlamentares",
		cor: "text-[#F693F9]",
	},
	{
		titulo: "Entenda",
		subtitulo:
			"sobre os <span class='__className_626905 font-normal'>direitos</span>",
		texto:
			"Informe-se sobre as garantias constitucionais e conquistas históricas da comunidade LGBTI+. Acesse materiais educativos para fortalecer a luta pelos direitos humanos.",
		rota: "/direitos",
		cor: "text-[#87D9FF]",
		isSubtitleHTML: true,
	},
	{
		titulo: "Conheça o",
		subtitulo: "projeto",
		texto:
			"Saiba mais sobre a origem do ObservaDH, nossa metodologia e como transformamos dados legislativos complexos em ferramentas de transparência e participação democrática.",
		rota: "/sobre",
		cor: "text-[#93F996]",
	},
];
export { apresentacao, cardsEsfera, cardsInformativos };
