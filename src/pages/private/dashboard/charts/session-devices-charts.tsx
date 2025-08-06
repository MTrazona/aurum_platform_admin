import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Label,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Monitor,
  Smartphone,
  TabletSmartphone,
} from "lucide-react";

const COLORS = ["#3b82f6", "#fbbf24", "#38bdf8"]; // Desktop, Mobile, Tablet

const data = [
  { name: "Desktop", value: 42.1, icon: <Monitor className="w-4 h-4 inline-block mr-1" /> },
  { name: "Mobile", value: 33.7, icon: <Smartphone className="w-4 h-4 inline-block mr-1" /> },
  { name: "Tablet", value: 19.6, icon: <TabletSmartphone className="w-4 h-4 inline-block mr-1" /> },
];

const TOTAL_SESSIONS = 1000; // Optional: simulate actual count

export const SessionDevicesChart = () => {
  return (
    <Card className="w-full rounded-xl stat-color">
      <CardHeader>
        <CardTitle className="text-base font-semibold dark:text-white">
          🖥️ Session Devices
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col items-center justify-center">
        {/* Chart with center label */}
        <div className="w-[200px] h-[200px] relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={3}
                dataKey="value"
                stroke="none"
              >
                {data.map((_entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
                <Label
                  value="100%"
                  position="center"
                  fill="#ccc"
                  fontSize={14}
                  fontWeight={500}
                />
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1e1e2e",
                  border: "1px solid #333",
                  borderRadius: 10,
                }}
                labelStyle={{ color: "#ccc" }}
                itemStyle={{ color: "#fff" }}
                formatter={(value: number, name: string) => {
                  const icon = data.find((d) => d.name === name)?.icon;
                  return [`${value.toFixed(1)}%`, icon ? `${name}` : name];
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Labels / Legend with session count */}
        <div className="grid grid-cols-3 gap-4 mt-6 text-center text-sm w-full">
          {data.map((entry, index) => (
            <div key={index} className="flex flex-col items-center gap-1">
              {entry.icon}
              <span className="text-muted-foreground">{entry.name}</span>
              <span className={`font-semibold ${index === 0 ? "text-blue-500" : index === 1 ? "text-yellow-500" : "text-sky-400"}`}>
                {entry.value}% • {Math.round((entry.value / 100) * TOTAL_SESSIONS)} sessions
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
