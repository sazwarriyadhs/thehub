'use client';

import { Pie, PieChart, ResponsiveContainer, Tooltip, Cell } from 'recharts';
import { clientDemographicsData } from '@/lib/data';
import { ChartTooltipContent } from '@/components/ui/chart';

const COLORS = [
    'hsl(var(--primary))',
    'hsl(var(--chart-2))',
    'hsl(var(--chart-3))',
    'hsl(var(--chart-4))',
];

export function ClientDemographicsChart() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <PieChart>
        <Tooltip
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
          fill="hsl(var(--primary))"
          label={(props) => `${props.ageGroup} (${props.percent.toFixed(0)}%)`}
        >
            {clientDemographicsData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}
