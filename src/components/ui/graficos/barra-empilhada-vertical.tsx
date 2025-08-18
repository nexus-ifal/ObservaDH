"use client";

import React from "react";
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

import { DadosGraficoBarraEmpilhadaVertical } from "@/core/domain/types/barra-empilhada-vertical";

const chartConfig = {
	branco: {
		label: "Branco",
		color: "#93F996",
	},
	preto: {
		label: "Preto",
		color: "#F693F9",
	},
	pardo: {
		label: "Pardo",
		color: "#87D9FF",
	},
	amarelo: {
		label: "Amarelo",
		color: "#4568BE",
	},
	indigena: {
		label: "Indígena",
		color: "#D974FD",
	},
	indefinido: {
		label: "Indefinido",
		color: "#FF977A",
	},
} satisfies ChartConfig;

interface GraficoBarraEmpilhadaVerticalProps {
	dados: DadosGraficoBarraEmpilhadaVertical[];
}

const GraficoBarraEmpilhadaVertical: React.FC<
	GraficoBarraEmpilhadaVerticalProps
> = ({ dados }) => {
	return (
		<Card className="flex flex-col items-center justify-center w-[21.875rem] h-[16.25rem] tab:w-[45rem] tab:h-[25rem] des:w-[52rem] des:h-[29rem] bg-[#121A2B] ">
			<CardContent className="flex flex-col justify-center items-center w-full h-full p-1 tab:p-6">
				<ChartContainer config={chartConfig} className="w-full h-full p-0">
					<BarChart
						accessibilityLayer
						data={dados}
						margin={{ bottom: 20, top: 20, left: 20, right: 20 }}
					>
						<CartesianGrid vertical={false} />
						<XAxis
							dataKey="religiao"
							tickLine={false}
							tickMargin={10}
							axisLine={false}
							className="text-[9px] tab:text-sm des:text-lg"
						/>
						<YAxis
							axisLine={true}
							tickLine={true}
							className="text-[9px] tab:text-sm des:text-lg"
							tickMargin={8}
						/>
						<ChartTooltip
							cursor={false}
							content={<ChartTooltipContent className="min-w-56" />}
						/>
						<ChartLegend
							content={
								<ChartLegendContent className="text-white text-[10px] tab:text-base flex justify-between" />
							}
						/>
						<Bar
							dataKey="branco"
							stackId="a"
							fill="#93F996"
							radius={[0, 0, 0, 0]}
							barSize={50}
						/>
						<Bar
							dataKey="preto"
							stackId="a"
							fill="#F693F9"
							radius={[0, 0, 0, 0]}
						/>
						<Bar
							dataKey="pardo"
							stackId="a"
							fill="#87D9FF"
							radius={[0, 0, 0, 0]}
						/>
						<Bar
							dataKey="amarelo"
							stackId="a"
							fill="#4568BE"
							radius={[0, 0, 0, 0]}
						/>
						<Bar
							dataKey="indigena"
							stackId="a"
							fill="#D974FD"
							radius={[0, 0, 0, 0]}
						/>
						<Bar
							dataKey="indefinido"
							stackId="a"
							fill="#FF977A"
							radius={[0, 0, 0, 0]}
						/>
					</BarChart>
				</ChartContainer>
			</CardContent>
		</Card>
	);
};

export default GraficoBarraEmpilhadaVertical;
