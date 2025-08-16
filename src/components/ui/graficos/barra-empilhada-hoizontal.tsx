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

import { DadosGraficoBarraEmpilhadaHorizontal } from "@/core/domain/types/barra-empilhada-horizontal";

const chartConfig = {
	linguagensNeutra: {
		label: "Linguagem Neutra",
		color: "#93F996",
	},
	atletasTrans: {
		label: "Atletas Trans",
		color: "#F693F9",
	},
	banheirosMultigenero: {
		label: "Banheiros Multigênero",
		color: "#87D9FF",
	},
	propagandaLGBT: {
		label: "Propaganda LGBT",
		color: "#4568BE",
	},
} satisfies ChartConfig;

interface GraficoBarraEmpilhadaProps {
	dados: DadosGraficoBarraEmpilhadaHorizontal[];
}

const GraficoBarraEmpilhadaHorizontal: React.FC<GraficoBarraEmpilhadaProps> = ({
	dados,
}) => {
	return (
		<Card className="flex flex-col w-[21.875rem] h-[16.25rem] tab:w-[45rem] tab:h-[25rem] des:w-[52rem] des:h-[29rem] bg-[#121A2B] ">
			<CardContent className="flex flex-col justify-center items-center w-full h-full p-2 tab:p-6">
				<ChartContainer
					config={chartConfig}
					className="flex justify-center items-center w-full h-full p-0"
				>
					<BarChart
						className="flex justify-center"
						data={dados}
						layout="vertical"
						width={100}
						height={300}
						margin={{ bottom: 20, top: 20, left: 20, right: 20 }}
					>
						<CartesianGrid horizontal={false} />
						<XAxis type="number" tickLine={false} axisLine={false} />
						<YAxis
							type="category"
							dataKey="ano"
							tickLine={false}
							axisLine={false}
						/>
						<ChartTooltip
							cursor={false}
							content={<ChartTooltipContent className="min-w-56" />}
						/>
						<ChartLegend
							content={
								<ChartLegendContent className="text-white text-[9px] tab:text-sm justify-around" />
							}
						/>
						<Bar
							dataKey="linguagensNeutra"
							stackId="a"
							fill={chartConfig.linguagensNeutra.color}
							radius={[0, 0, 0, 0]}
							isAnimationActive={false}
						/>
						<Bar
							dataKey="atletasTrans"
							stackId="a"
							fill={chartConfig.atletasTrans.color}
							radius={[0, 0, 0, 0]}
							isAnimationActive={false}
						/>
						<Bar
							dataKey="banheirosMultigenero"
							stackId="a"
							fill={chartConfig.banheirosMultigenero.color}
							radius={[0, 0, 0, 0]}
						/>
						<Bar
							dataKey="propagandaLGBT"
							stackId="a"
							fill={chartConfig.propagandaLGBT.color}
							radius={[0, 5, 5, 0]}
						/>
					</BarChart>
				</ChartContainer>
			</CardContent>
		</Card>
	);
};

export default GraficoBarraEmpilhadaHorizontal;
