'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart';
import {Bar, BarChart, CartesianGrid, XAxis, YAxis, Pie, PieChart, Cell} from 'recharts';

const placementByDeptData = [
  {department: 'CompSci', placements: 18},
  {department: 'Business', placements: 12},
  {department: 'Economics', placements: 9},
  {department: 'Engineering', placements: 15},
  {department: 'Arts', placements: 5},
];

const outcomesData = [
  {name: 'Full-time', value: 28, fill: 'hsl(var(--chart-1))'},
  {name: 'Internship', value: 12, fill: 'hsl(var(--chart-2))'},
  {name: 'Grad School', value: 5, fill: 'hsl(var(--chart-3))'},
];

const chartConfig = {
  placements: {
    label: 'Placements',
    color: 'hsl(var(--chart-1))',
  },
};

export function PlacementCharts() {
  return (
    <div className="grid gap-4 md:gap-8 lg:grid-cols-5">
      <Card className="lg:col-span-3">
        <CardHeader>
          <CardTitle>Placements by Department</CardTitle>
          <CardDescription>January - May 2024</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
            <BarChart data={placementByDeptData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="department"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={value => value.slice(0, 7)}
              />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="placements" fill="var(--color-placements)" radius={4} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Student Outcomes</CardTitle>
          <CardDescription>Graduating Class of 2024</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center">
          <ChartContainer config={{}} className="min-h-[300px] w-full">
            <PieChart>
              <ChartTooltip content={<ChartTooltipContent />} />
              <Pie data={outcomesData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100}>
                {outcomesData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <ChartLegend content={<ChartLegendContent />} />
            </PieChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
