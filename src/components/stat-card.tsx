import React from "react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type StatCardProps = {
  title: string;
  value: number | string;
  percentageChange?: string;
  description: string;
  bars?: number[];
  icon?: LucideIcon;
  color?: "blue" | "green" | "red" | "orange" | "yellow" | "purple" | "gray";
};

const colorMap = {  
  blue: "border-blue-500 text-blue-500 bg-blue-500",
  green: "border-green-500 text-green-500 bg-green-500",
  red: "border-red-500 text-red-500 bg-red-500",
  orange: "border-orange-500 text-orange-500 bg-orange-500",
  yellow: "border-yellow-500 text-yellow-500 bg-yellow-500",
  purple: "border-purple-500 text-purple-500 bg-purple-500",
  gray: "border-gray-500 text-gray-500 bg-gray-500",
};

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  percentageChange = "+0%",
  description,
  bars = [1, 2, 3, 4, 5],
  icon: Icon,
  color = "blue",
}) => {
  const isPositive = percentageChange.startsWith("+");
  const percentageColor = isPositive ? "text-green-500" : "text-red-500";

  const colorClasses = colorMap[color] || colorMap["blue"];
  const [borderColor, iconColor, barColor] = colorClasses.split(" ");

  const maxBar = Math.max(...bars);

  return (
    <div
      className={`stat-color p-4 md:p-5 w-full max-w-xs sm:max-w-sm md:max-w-md ${borderColor} rounded-lg border overflow-hidden`}
    >
      <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center">
        <div className="flex-1">
          <p className="text-sm  mb-1">{title}</p>
          <div className="flex items-center gap-2">
            {Icon && <Icon className={`w-5 h-5 ${iconColor}`} />}
            <span className="text-2xl font-semibold text-nowrap text-white-800">
              {value}
            </span>
          </div>
        </div>
        <div className="flex items-end justify-between mb-1 md:mb-0 w-full md:w-1/4 overflow-hidden">
          <div className="flex items-end gap-[2px] h-16 w-full overflow-hidden px-1">
            {bars.map((bar, idx) => (
              <div
                key={idx}
                className={`rounded-sm ${barColor}`}
                style={{
                  height: `${(bar / maxBar) * 100}%`,
                  flex: 1,
                  maxWidth: "12px",
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <div
        className={`border-t border-gray-200 mt-3 pt-2 flex flex-wrap items-center text-sm font-medium ${percentageColor}`}
      >
        {isPositive ? (
          <ArrowUpRight className="w-4 h-4 mr-1" />
        ) : (
          <ArrowDownRight className="w-4 h-4 mr-1" />
        )}
        {percentageChange}
        <span className="ml-2 text-gray-500 font-normal">{description}</span>
      </div>
    </div>
  );
};

export default StatCard;
