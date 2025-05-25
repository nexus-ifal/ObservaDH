"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import { Card, CardContent } from "@/components/ui-shacnui/card";
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui-shacnui/chart";

import { DadosGraficoBarrasVertical } from "@/core/domain/graficos/types/barras-vertical";

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
		<Card className="w-[850px] h-[450px] bg-[#122144] shadow-lg shadow-[#4568BE]">
			<CardContent className="h-full w-full">
				<ChartContainer config={chartConfig} className="py-12 px-10">
					<BarChart accessibilityLayer data={dados}>
						<CartesianGrid vertical={false} />
						<XAxis
							dataKey="pauta"
							tickLine={false}
							tickMargin={10}
							axisLine={false}
						/>
						<YAxis allowDataOverflow />
						<ChartTooltip
							cursor={false}
							content={<ChartTooltipContent hideLabel className="min-w-36" />}
						/>
						<Bar dataKey="pls" activeIndex={2} barSize={35} />
					</BarChart>
				</ChartContainer>
			</CardContent>
		</Card>
	);
};

export default GraficoBarrasVertical;
