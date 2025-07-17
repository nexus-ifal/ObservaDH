/* eslint-disable @typescript-eslint/no-explicit-any */
interface ApiDataItem {
    direito_sigla: string;
    direito_nome: string;
    projetos: number;
}

export function mapApiDataToChartData(apiData: ApiDataItem[]) {
	const chartConfig = {
		projetos: {
			label: "projetos",
		},
		lieg: {
			label: "LIEG",
			color: "#87D9FF",
		},
		educacao: {
			label: "Educação",
			color: "#FDFF78",
		},
		saude: {
			label: "Saúde",
			color: "#FF977A",
		},
		lib: {
			label: "LIB",
			color: "#F693F9",
		},
	};

	const siglaToChartKey: Record<string, keyof typeof chartConfig> = {
		DIREITO_LIB: "lib",
		DIREITO_LIEG: "lieg",
		DIREITO_EDUCACAO: "educacao",
		DIREITO_SAUDE: "saude",
	};
	return apiData.map((item) => {
		const chartKey = siglaToChartKey[item.direito_sigla];
		return {
			direito: chartConfig[chartKey]?.label ?? item.direito_nome,
			projetos: item.projetos,
			fill:
				chartConfig[chartKey] && "color" in chartConfig[chartKey]
					? chartConfig[chartKey].color
					: undefined,
			direito_sigla: item.direito_sigla,
		};
	});
}

export function mapIdeologiasToChartData(apiData: any[]) {
	const chartConfig = {
		anti_mino: { label: "Anti_Mino", color: "#F693F9" },
		coam: { label: "COAM", color: "#FDFF78" },
		dbr: { label: "DBR", color: "#D974FD" },
		pmgf: { label: "PMGF", color: "#93F996" },
		hps: { label: "HPS", color: "#87D9FF" },
		anti_socio: { label: "Anti_Socio", color: "#FF977A" },
		imuta_socio: { label: "Imuta_Socio", color: "#E1EAFF" },
	};

	const pautaToChartKey: Record<string, keyof typeof chartConfig> = {
		HPS: "hps",
		COAM: "coam",
		PMGF: "pmgf",
		DBR: "dbr",
		ANT_MINO: "anti_mino",
		AMON_SOCIO: "anti_socio",
		IMUTA_SOC: "imuta_socio",
	};

	return apiData.map((item) => {
		const chartKey = pautaToChartKey[item.pauta];
		return {
			...item,
			label: chartConfig[chartKey]?.label ?? item.pauta,
			fill: chartConfig[chartKey]?.color,
		};
	});
}
