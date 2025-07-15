import React from "react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type StatCardProps = {
  title: string;
  value: number;
  percentageChange: string;
  description: string;
  bars: number[];
  icon?: LucideIcon;
  color?: "blue" | "green" | "red" | "orange" | "yellow" | "purple"; // Add more as needed
};

const colorMap = {
  blue: "border-blue-500 text-blue-500 bg-blue-500",
  green: "border-green-500 text-green-500 bg-green-500",
  red: "border-red-500 text-red-500 bg-red-500",
  orange: "border-orange-500 text-orange-500 bg-orange-500",
  yellow: "border-yellow-500 text-yellow-500 bg-yellow-500",
  purple: "border-purple-500 text-purple-500 bg-purple-500",
};

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  percentageChange,
  description,
  bars,
  icon: Icon,
  color = "blue",
}) => {
  const isPositive = percentageChange.startsWith("+");
  const percentageColor = isPositive ? "text-green-500" : "text-red-500";

  const colorClasses = colorMap[color] || colorMap["blue"];
  const [borderColor, iconColor, barColor] = colorClasses.split(" ");

  return (
    <div className={`bg-white rounded-xl shadow-sm p-5 py-3 w-72 ${borderColor} border`}>
      <div className="flex flex-nowrap gap-2 items-center">
        <div className="flex-1">
          <p className="text-sm text-gray-500 mb-1">{title}</p>
          <div className="flex items-center gap-2">
            {Icon && <Icon className={`w-5 h-5 ${iconColor}`} />}
            <span className="text-2xl font-semibold text-gray-800">
              {value.toLocaleString()}
            </span>
          </div>
        </div>
        <div className="flex items-end justify-between mb-2 flex-1">
          <div className="flex items-end gap-1 h-16 flex-1">
            {bars.map((bar, idx) => (
              <div
                key={idx}
                className={`rounded-sm ${barColor}`}
                style={{
                  height: `${bar}px`,
                  flex: 1,
                }}
              />
            ))}
          </div>
        </div>
      </div>
      <div className={`border-t border-gray-200 mt-3 pt-2 flex items-center text-sm font-medium ${percentageColor}`}>
        {isPositive ? (
          <ArrowUpRight className="w-4 h-4 mr-1" />
        ) : (
          <ArrowDownRight className="w-4 h-4 mr-1" />
        )}
        {percentageChange}
        <span className="ml-2 text-gray-600 font-normal">{description}</span>
      </div>
    </div>
  );
};

export default StatCard;
