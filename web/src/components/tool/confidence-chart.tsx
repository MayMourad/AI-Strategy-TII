import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

interface ConfidenceChartProps {
  high: number
  medium: number
  low: number
}

const COLORS = {
  High: "#34d8a0",
  Medium: "#f2b84b",
  Low: "#ef5b50",
}

export function ConfidenceChart({ high, medium, low }: ConfidenceChartProps) {
  const data = [
    { name: "High", count: high },
    { name: "Medium", count: medium },
    { name: "Low", count: low },
  ]

  return (
    <ResponsiveContainer width="100%" height={160}>
      <BarChart data={data} margin={{ top: 4, right: 8, left: -20, bottom: 0 }} barCategoryGap={28}>
        <CartesianGrid vertical={false} stroke="#1b2536" />
        <XAxis
          dataKey="name"
          tickLine={false}
          axisLine={false}
          tick={{ fill: "#8496a9", fontSize: 12 }}
        />
        <YAxis tickLine={false} axisLine={false} tick={{ fill: "#8496a9", fontSize: 12 }} width={28} allowDecimals={false} />
        <Tooltip
          cursor={{ fill: "rgba(255,255,255,0.03)" }}
          contentStyle={{
            background: "#0c131f",
            border: "1px solid #1b2536",
            borderRadius: 8,
            fontSize: 12.5,
            color: "#e8eef5",
          }}
        />
        <Bar dataKey="count" radius={[6, 6, 0, 0]} maxBarSize={56}>
          {data.map((entry) => (
            <Cell key={entry.name} fill={COLORS[entry.name as keyof typeof COLORS]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}
