"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface ChartData {
  name: string;
  spend: number;
  impressions: number;
  clicks: number;
  conversions: number;
}

interface DashboardChartProps {
  data: ChartData[];
}

export default function DashboardChart({ data }: DashboardChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis
          dataKey="name"
          stroke="#6b7280"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#6b7280"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value: number) => `${value}k`}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "white",
            border: "1px solid #e5e7eb",
            borderRadius: "8px",
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
          }}
          labelStyle={{ color: "#374151", fontWeight: "600" }}
        />
        <Line
          type="monotone"
          dataKey="spend"
          stroke="#3b82f6"
          strokeWidth={2}
          dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4 }}
          activeDot={{ r: 6, stroke: "#3b82f6", strokeWidth: 2 }}
        />
        <Line
          type="monotone"
          dataKey="impressions"
          stroke="#10b981"
          strokeWidth={2}
          dot={{ fill: "#10b981", strokeWidth: 2, r: 4 }}
          activeDot={{ r: 6, stroke: "#10b981", strokeWidth: 2 }}
        />
        <Line
          type="monotone"
          dataKey="clicks"
          stroke="#8b5cf6"
          strokeWidth={2}
          dot={{ fill: "#8b5cf6", strokeWidth: 2, r: 4 }}
          activeDot={{ r: 6, stroke: "#8b5cf6", strokeWidth: 2 }}
        />
        <Line
          type="monotone"
          dataKey="conversions"
          stroke="#f59e0b"
          strokeWidth={2}
          dot={{ fill: "#f59e0b", strokeWidth: 2, r: 4 }}
          activeDot={{ r: 6, stroke: "#f59e0b", strokeWidth: 2 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
