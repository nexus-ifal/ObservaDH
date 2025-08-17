"use client";

import { LabelList, RadialBar, RadialBarChart } from "recharts";

import {
	ChartConfig,
	ChartContainer,
	ChartLegend,
	ChartLegendContent,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/external/ui-shacnui/chart";

import { DadosRadial } from "@/core/domain/types/radial";

export const description = "A radial chart with a label";

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
} satisfies ChartConfig;

interface DadosEstatisticosProps {
	dados: DadosRadial[];
}

export const Radial: React.FC<DadosEstatisticosProps> = ({ dados }) => {
	return (
		<div className="flex items-center justify-between w-[20rem] h-[25rem] tab:h-[29rem] des:h-[31rem] py-2 tab:w-[29rem]">
			<ChartContainer config={chartConfig} className="w-full h-full">
				<RadialBarChart
					data={dados}
					startAngle={-90}
					endAngle={380}
					innerRadius={"30%"}
					outerRadius={"95%"}
					className="text-white"
				>
					<ChartTooltip
						cursor={false}
						content={
							<ChartTooltipContent
								hideLabel
								nameKey="direito_sigla"
								className="min-w-32"
							/>
						}
					/>

					<RadialBar dataKey="projetos" background>
						<LabelList
							position="insideStart"
							dataKey="direito_sigla"
							className="font-semibold fill-gray-600 capitalize mix-blend-luminosity"
							fontSize={12}
						/>
					</RadialBar>

					<ChartLegend
						content={
							<ChartLegendContent
								className="text-white text-lg justify-around "
								nameKey="direito_sigla"
								key="direito_sigla"
							/>
						}
					/>
				</RadialBarChart>
			</ChartContainer>
		</div>
	);
};
