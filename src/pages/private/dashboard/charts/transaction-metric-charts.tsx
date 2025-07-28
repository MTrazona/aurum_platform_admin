import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useMemo } from "react";
import type { TransactionsType } from "@/types/buy-request.types";

type Props = {
  buySell: TransactionsType[];
  convert: TransactionsType[];
  gae: TransactionsType[];
};

const months = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

const groupByMonth = (data: TransactionsType[]) => {
  const counts = Array(12).fill(0);
  data.forEach((item) => {
    const date = new Date(item.createdAt);
    const monthIndex = date.getMonth();
    counts[monthIndex]++;
  });
  return counts;
};

export const TransactionsMetricsChart = ({ buySell, convert, gae }: Props) => {
  const chartData = useMemo(() => {
    const buySellCounts = groupByMonth(buySell);
    const convertCounts = groupByMonth(convert);
    const gaeCounts = groupByMonth(gae);

    return months.map((month, index) => ({
      month,
      BuySell: buySellCounts[index],
      Convert: convertCounts[index],
      GAE: gaeCounts[index],
    }));
  }, [buySell, convert, gae]);

  return (
    <Card className="w-full stat-color rounded-xl text-white">
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-base font-semibold text-white/80 tracking-wide">🚀 Transactions Metrics</CardTitle>
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1">
            <span className="h-3 w-3 rounded-full bg-[#8b5cf6] shadow-md" />
            <span className="text-white/60">Buy/Sell</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="h-3 w-3 rounded-full bg-[#a3a3a3] shadow-md" />
            <span className="text-white/60">Convert</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="h-3 w-3 rounded-full bg-[#06b6d4] shadow-md" />
            <span className="text-white/60">GAE</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="colorBuySell" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.7} />
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorConvert" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#a3a3a3" stopOpacity={0.6} />
                <stop offset="95%" stopColor="#a3a3a3" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorGAE" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.7} />
                <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
              </linearGradient>
            </defs>

            <XAxis
              dataKey="month"
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
              contentStyle={{ backgroundColor: "#1e1e2e", border: "1px solid #333", borderRadius: 10 }}
              labelStyle={{ color: "#ccc" }}
              itemStyle={{ color: "#fff" }}
            />
            <CartesianGrid strokeDasharray="3 3" stroke="#2e2e38" />

            <Area
              type="monotone"
              dataKey="BuySell"
              name="Buy/Sell"
              stroke="#8b5cf6"
              fill="url(#colorBuySell)"
              strokeWidth={2}
              dot={{ stroke: "#8b5cf6", strokeWidth: 1, r: 2 }}
            />
            <Area
              type="monotone"
              dataKey="Convert"
              name="Convert"
              stroke="#a3a3a3"
              fill="url(#colorConvert)"
              strokeWidth={2}
              dot={{ stroke: "#a3a3a3", strokeWidth: 1, r: 2 }}
            />
            <Area
              type="monotone"
              dataKey="GAE"
              name="GAE"
              stroke="#06b6d4"
              fill="url(#colorGAE)"
              strokeWidth={2}
              dot={{ stroke: "#06b6d4", strokeWidth: 1, r: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
