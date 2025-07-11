"use client"

import { LabelList, RadialBar, RadialBarChart } from "recharts"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui-shacnui/chart"

export const description = "A radial chart with a label"

const chartData = [
  { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 187, fill: "var(--color-firefox)" },
  { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
  { browser: "other", visitors: 90, fill: "var(--color-other)" },
]

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Chrome",
    color: "var(--chart-1)",
  },
  safari: {
    label: "Safari",
    color: "var(--chart-2)",
  },
  firefox: {
    label: "Firefox",
    color: "var(--chart-3)",
  },
  edge: {
    label: "Edge",
    color: "var(--chart-4)",
  },
  other: {
    label: "Other",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig

export function Radial() {
  return (
    <div className="flex flex-col items-center justify-center w-1/2 mx-auto py-6 max-w-1/2">
      <ChartContainer
        config={chartConfig}
        className="w-full h-full"
      >
        <RadialBarChart
          data={chartData}
          startAngle={-90}
          endAngle={380}
          innerRadius={60}
          outerRadius={200}
        >
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel nameKey="browser" />}
          />
          <RadialBar dataKey="visitors" background>
            <LabelList
              position="insideStart"
              dataKey="browser"
              className="fill-white capitalize mix-blend-luminosity"
              fontSize={14}
            />
          </RadialBar>
        </RadialBarChart>
      </ChartContainer>
    </div>
  )
}