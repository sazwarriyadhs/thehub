'use client';

import { Pie, PieChart, Cell } from 'recharts';
import { clientDemographicsData } from '@/lib/data';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart';

const chartConfig = {
  '18-25': { label: '18-25', color: 'hsl(var(--primary))' },
  '26-35': { label: '26-35', color: 'hsl(var(--chart-2))' },
  '36-45': { label: '36-45', color: 'hsl(var(--chart-3))' },
  '46plus': { label: '46+', color: 'hsl(var(--chart-4))' },
} satisfies ChartConfig;

export function ClientDemographicsChart() {
  return (
    <ChartContainer config={chartConfig} className="min-h-[350px] w-full">
      <PieChart>
        <ChartTooltip
          cursor={{ fill: 'hsl(var(--accent))' }}
          content={<ChartTooltipContent nameKey="ageGroup" />}
        />
        <Pie
          data={clientDemographicsData}
          dataKey="value"
          nameKey="ageGroup"
          cx="50%"
          cy="50%"
          outerRadius={120}
          label={({ ageGroup, percent }) =>
            `${chartConfig[ageGroup as keyof typeof chartConfig]?.label} (${(
              (percent || 0) * 100
            ).toFixed(0)}%)`
          }
        >
          {clientDemographicsData.map((entry) => (
            <Cell key={`cell-${entry.ageGroup}`} fill={`var(--color-${entry.ageGroup})`} />
          ))}
        </Pie>
        <ChartLegend content={<ChartLegendContent nameKey="ageGroup" />} />
      </PieChart>
    </ChartContainer>
  );
}
