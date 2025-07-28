import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

type LiveUsersChartProps = {
  userCountByCountry: Record<string, number>;
};

const capitalize = (s: string) =>
  s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();

const formatNumber = (value: number) =>
  value.toLocaleString(undefined, { maximumFractionDigits: 0 });

export const LiveUsersChart = ({ userCountByCountry }: LiveUsersChartProps) => {
  const data = Object.entries(userCountByCountry)
    .map(([country, count]) => ({
      name: capitalize(country),
      value: count,
    }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 10);

  return (
    <Card className="w-full stat-color rounded-xl text-white">
      <CardHeader>
        <CardTitle className="text-base font-semibold text-white/80 tracking-wide">
          🌍 Live Users by Country
        </CardTitle>
        <p className="text-sm text-white/50">Top 10 Countries with Active Users</p>
      </CardHeader>

      <CardContent className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 20 }}>
            <defs>
              <linearGradient id="barColor" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0.2} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" stroke="#2e2e38" />
            <XAxis
              dataKey="name"
              tick={{ fontSize: 12, fill: "#ccc" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 12, fill: "#ccc" }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              formatter={(value: number) => formatNumber(value)}
              contentStyle={{
                backgroundColor: "#1e1e2e",
                border: "1px solid #333",
                borderRadius: 10,
              }}
              labelStyle={{ color: "#ccc" }}
              itemStyle={{ color: "#fff" }}
            />
            <Bar
              dataKey="value"
              fill="url(#barColor)"
              radius={[6, 6, 0, 0]}
              stroke="#8b5cf6"
              strokeWidth={1}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
