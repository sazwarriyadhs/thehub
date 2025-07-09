'use client';

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { inventoryStatusData } from '@/lib/data';
import { ChartTooltipContent } from '@/components/ui/chart';

export function InventoryStatusChart() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={inventoryStatusData}>
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
        <Tooltip
          cursor={{ fill: 'hsl(var(--accent))' }}
          content={<ChartTooltipContent />}
        />
        <Legend wrapperStyle={{fontSize: "12px"}}/>
        <Bar dataKey="In Stock" stackId="a" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
        <Bar dataKey="Low Stock" stackId="a" fill="hsl(var(--chart-4))" />
        <Bar dataKey="Out of Stock" stackId="a" fill="hsl(var(--destructive))" radius={[0, 0, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
