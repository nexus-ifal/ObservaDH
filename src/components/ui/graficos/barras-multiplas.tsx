"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import { Card, CardContent } from "@/components/external/ui-shacnui/card";
import {
	ChartConfig,
	ChartContainer,
	ChartLegend,
	ChartLegendContent,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/external/ui-shacnui/chart";

import { DadosGraficoBarrasMultiplas } from "@/core/domain/types/barras-multiplas";

interface GraficoBarraMultiplasProps {
	dados: DadosGraficoBarrasMultiplas[];
}

const chartConfig = {
	homens: {
		label: "Homens",
		color: "#F693F9",
	},
	mulheres: {
		label: "Mulheres",
		color: "#93F996",
	},
} satisfies ChartConfig;

const GraficoBarraMultiplas: React.FC<GraficoBarraMultiplasProps> = ({
	dados,
}) => {
	return (
		<Card className="w-[21.875rem] h-[16.25rem] tab:w-[45rem] tab:h-[25rem] des:w-[52rem] des:h-[29rem] bg-[#121A2B] flex items-center justify-center">
			<CardContent className="flex flex-col justify-center w-full h-full p-1 tab:p-6">
				<ChartContainer config={chartConfig} className="w-full h-full p-0">
					<BarChart accessibilityLayer data={dados}>
						<CartesianGrid vertical={false} />
						<XAxis
							dataKey="ideologia"
							tickLine={false}
							tickMargin={10}
							axisLine={false}
							className="text-sm des:text-lg"
						/>
						<YAxis
							AxisComp
							tickLine
							className="text-sm des:text-lg"
							tickMargin={8}
						/>
						<ChartTooltip
							cursor={false}
							content={<ChartTooltipContent className="min-w-56" />}
						/>
						<ChartLegend
							content={<ChartLegendContent className="text-white text-base" />}
						/>
						<Bar dataKey="homens" fill="#F693F9" radius={4} />
						<Bar dataKey="mulheres" fill="#93F996" radius={4} />
					</BarChart>
				</ChartContainer>
			</CardContent>
		</Card>
	);
};

export default GraficoBarraMultiplas;
