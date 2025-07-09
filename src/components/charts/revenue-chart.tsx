'use client';

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { revenueData } from '@/lib/data';
import { ChartTooltipContent } from '@/components/ui/chart';

export function RevenueChart() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={revenueData}>
        <XAxis
          dataKey="month"
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
          tickFormatter={(value) => `$${value}`}
        />
        <Tooltip
            cursor={{ fill: 'hsl(var(--accent))' }}
            content={<ChartTooltipContent />}
        />
        <Bar dataKey="revenue" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
