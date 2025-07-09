'use client';

import { Bar, BarChart, XAxis, YAxis } from 'recharts';
import { inventoryStatusData } from '@/lib/data';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart';

const chartConfig = {
  inStock: {
    label: 'In Stock',
    color: 'hsl(var(--primary))',
  },
  lowStock: {
    label: 'Low Stock',
    color: 'hsl(var(--chart-4))',
  },
  outOfStock: {
    label: 'Out of Stock',
    color: 'hsl(var(--destructive))',
  },
} satisfies ChartConfig;

export function InventoryStatusChart() {
  return (
    <ChartContainer config={chartConfig} className="min-h-[350px] w-full">
      <BarChart accessibilityLayer data={inventoryStatusData}>
        <XAxis
          dataKey="name"
          stroke="hsl(var(--muted-foreground))"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="hsl(var(--muted-foreground))"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          allowDecimals={false}
        />
        <ChartTooltip
          cursor={{ fill: 'hsl(var(--accent))' }}
          content={<ChartTooltipContent />}
        />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="inStock" stackId="a" fill="var(--color-inStock)" radius={[4, 4, 0, 0]} />
        <Bar dataKey="lowStock" stackId="a" fill="var(--color-lowStock)" />
        <Bar dataKey="outOfStock" stackId="a" fill="var(--color-outOfStock)" radius={[0, 0, 0, 0]} />
      </BarChart>
    </ChartContainer>
  );
}
