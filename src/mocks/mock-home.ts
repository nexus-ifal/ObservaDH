const apresentacao = {
	subtitulo: "O que é o",
	titulo: "ObservaDH?",
	cor: "text-[#87D9FF]",
	texto: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed feugiat
  nisi nec orci maximus, eu tempus metus viverra. Pellentesque non
              ante turpis. Mauris venenatis vel purus non gravida. Vestibulum a
              ante semper, efficitur justo sit amet, iaculis enim. Pellentesque
              facilisis ultricies sem. Donec mollis gravida lectus, et aliquet
              felis lobortis vel. Donec accumsan augue vestibulum bibendum
              feugiat. Donec ac auctor ex. Cras tortor ex, pellentesque vel
              condimentum eu, posuere in nulla. Sed metus risus, finibus at erat
              a, porta ullamcorper dolor. Donec cursus vestibulum mattis.
              Vestibulum sodales quam eget sem ullamcorper ultricies consequat in
              nisl. Donec nisl quam, aliquet quis ultricies eget, euismod sit amet
              turpis. Phasellus nulla turpis, consequat consectetur dapibus sit
              amet, viverra ut neque. Cras nec porta dui. Pellentesque ut magna
              ex. Nam felis turpis, imperdiet ac accumsan a, maximus at nibh. In
              non augue maximus, venenatis velit id, varius leo. Suspendisse et
              quam quis ipsum rutrum ullamcorper non eu dui. Nulla condimentum
              nisl ligula, sed rhoncus urna sagittis non. Pellentesque pulvinar
              mattis odio, id egestas nunc rhoncus posuere. Cras malesuada nisl
              dolor. Nullam pulvinar nibh elit, ut dapibus nibh sodales sed. Nam
              ligula nisi, convallis vitae fringilla consectetur, pulvinar ac
              nisi. Maecenas faucibus leo et libero ullamcorper, auctor
              sollicitudin est condimentum. Lorem ipsum dolor sit amet,
              consectetur adipiscing elit. Sed feugiat nisi nec orci maximus, eu
              tempus metus viverra. Pellentesque non ante turpis. Mauris venenatis
              vel purus non gravida. Vestibulum a ante semper, efficitur justo sit
              amet, iaculis enim. Pellentesque facilisis ultricies sem. Donec
              mollis gravida lectus, et aliquet felis lobortis vel. Donec accumsan
              augue vestibulum bibendum feugiat. Donec ac auctor ex. Cras tortor
              ex, pellentesque vel condimentum eu, posuere in nulla. Sed metus
              risus, finibus at erat a, porta ullamcorper dolor. Donec cursus
              vestibulum mattis. Vestibulum sodales quam eget sem ullamcorper
              ultricies consequat in nisl. Donec nisl quam, aliquet quis ultricies
              eget, euismod sit amet turpis. Phasellus nulla turpis, consequat
              consectetur dapibus sit amet, viverra ut neque. Cras nec porta dui.
              Pellentesque ut magna ex. Nam felis turpis, imperdiet ac accumsan a,
              maximus at nibh. In non augue maximus, venenatis velit id, varius
              leo. Suspendisse et quam quis ipsum rutrum ullamcorper non eu dui.
              Nulla condimentum nisl ligula, sed rhoncus urna sagittis non.
              Pellentesque pulvinar mattis odio, id egestas nunc rhoncus posuere.
              Cras malesuada nisl dolor. Nullam pulvinar nibh elit, ut dapibus
              nibh sodales sed. Nam ligula nisi, convallis vitae fringilla
              consectetur, pulvinar ac nisi. Maecenas faucibus leo et libero
              ullamcorper, auctor sollicitudin est condimentum.`,
};
export { apresentacao };

const cardsEsfera = [
	{
		subtitulo: "Visão",
		titulo: "Geral",
		texto:
			"Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam eveniet inventore quo error est natus facilis. Quod odit voluptates libero dignissimos veniam accusamus omnis, autem architecto. Consequatur in error maxime.",
		rota: "/projetos",
		cor: "text-[#93F996]",
	},
	{
		subtitulo: "Esfera",
		titulo: "Federal",
		texto:
			"Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam eveniet inventore quo error est natus facilis. Quod odit voluptates libero dignissimos veniam accusamus omnis, autem architecto. Consequatur in error maxime.",
		rota: "/projetos?esfera=federal",
		cor: "text-[#FDFF78]",
	},
	{
		subtitulo: "Esfera",
		titulo: "Estadual",
		texto:
			"Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam eveniet inventore quo error est natus facilis. Quod odit voluptates libero dignissimos veniam accusamus omnis, autem architecto. Consequatur in error maxime.",
		rota: "/projetos?esfera=estadual",
		cor: "text-[#F693F9]",
	},
];
export { cardsEsfera };

const cardsInformativos = [
	{
		titulo: "Conheça",
		subtitulo: "os Parlamentares",
		texto:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed feugiat nisi nec orci maximus, eu tempus metus vivrra. Pellentesque non ante turpis. Mauris venenatis",
		rota: "/parlamentares",
		cor: "text-[#F693F9]",
	},
	{
		titulo: "Entenda",
		subtitulo:
			"sobre os <span class='__className_626905 font-normal'>direitos</span>",
		texto:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed feugiat nisi nec orci maximus, eu tempus metus vivrra. Pellentesque non ante turpis. Mauris venenatis",
		rota: "/direitos",
		cor: "text-[#87D9FF]",
		isSubtitleHTML: true,
	},
	{
		titulo: "Conheça o",
		subtitulo: "projeto",
		texto:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed feugiat nisi nec orci maximus, eu tempus metus vivrra. Pellentesque non ante turpis. Mauris venenatis",
		rota: "/sobre",
		cor: "text-[#93F996]",
	},
];

export { cardsInformativos };
