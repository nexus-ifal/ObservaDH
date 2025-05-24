"use client";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

import {
	Card,
	CardContent,
	CardDescription,
} from "@/components/ui-shacnui/card";
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui-shacnui/chart";

import { DadosGraficoLinhaPontos } from "@/core/domain/graficos/types/linha-pontos";

const chartConfig = {
	projetos: {
		label: "projetos",
	},
} satisfies ChartConfig;

interface graficoProps {
	dados: DadosGraficoLinhaPontos[];
}

const GraficoLinhaPontos: React.FC<graficoProps> = ({ dados }) => {
	return (
		<Card className="h-[29rem] w-[52rem] bg-[#122144]">
			<CardContent>
				<ChartContainer config={chartConfig} className="p-11">
					<LineChart
						className="w-full h-full p-0 flex justify-between items-center text-white"
						accessibilityLayer
						data={dados}
						margin={{
							left: 0,
							top: 20,
							right: 10,
							bottom: 10,
						}}
					>
						<CartesianGrid vertical={false} />

						<YAxis
							dataKey={chartConfig.projetos.label}
							allowDataOverflow={false}
							tickMargin={5}
						/>

						<XAxis
							allowDataOverflow={false}
							dataKey="ano"
							tickLine={true}
							axisLine={true}
						/>

						<ChartTooltip
							cursor={false}
							content={<ChartTooltipContent hideLabel className={`min-w-32`} />}
						/>

						<Line
							dataKey="projetos"
							type="natural"
							stroke="#F693F9"
							strokeWidth={1.8}
							dot={{
								fill: "#F693F9",
							}}
							activeDot={{
								r: 5,
							}}
						/>
					</LineChart>
				</ChartContainer>
			</CardContent>
			<CardDescription />
		</Card>
	);
};

export default GraficoLinhaPontos;
