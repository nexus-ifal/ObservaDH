"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import { Card, CardContent } from "@/components/external/ui-shacnui/card";
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/external/ui-shacnui/chart";

import { DadosGraficoBarrasVertical } from "@/core/domain/types/barras-vertical";

const chartConfig = {
	pauta: {
		label: "Pls",
	},
	anti_mino: {
		label: "Anti_Mino",
		color: "#F693F9",
	},
	coam: {
		label: "COAM",
		color: "#FDFF78",
	},
	dbr: {
		label: "DBR",
		color: "#D974FD",
	},
	pmgf: {
		label: "PMGF",
		color: "#93F996",
	},
	hps: {
		label: "HPS",
		color: "#87D9FF",
	},
	anti_socio: {
		label: "Anti_Socio",
		color: "#FF977A",
	},
	imuta_socio: {
		label: "Imuta_Socio",
		color: "#E1EAFF",
	},
} satisfies ChartConfig;

interface graficoBarrasVerticalprops {
	dados: DadosGraficoBarrasVertical[];
}

const GraficoBarrasVertical: React.FC<graficoBarrasVerticalprops> = ({
	dados,
}) => {
	return (
		<Card className="flex items-center justify-center w-[21.875rem] h-[16.25rem] tab:w-[45rem] tab:h-[25rem] des:w-[52rem] des:h-[29rem] bg-[#122144] shadow-lg shadow-[#4568BE]">
			<CardContent className="flex justify-center items-center w-full h-full p-1 tab:p-6 text-sm">
				<ChartContainer
					config={chartConfig}
					className="flex justify-center items-center w-full h-full p-0 text-sm"
				>
					<BarChart accessibilityLayer data={dados}>
						<CartesianGrid vertical={false} />
						<XAxis
							dataKey="pauta"
							tickLine={false}
							axisLine={false}
							className="text-[7px] tab:text-sm"
						/>
						<YAxis allowDataOverflow className="text-[9px] tab:text-sm" />
						<ChartTooltip
							cursor={false}
							content={<ChartTooltipContent className="min-w-1" />}
						/>
						<Bar dataKey="pls" activeIndex={2} />
					</BarChart>
				</ChartContainer>
			</CardContent>
		</Card>
	);
};

export default GraficoBarrasVertical;
