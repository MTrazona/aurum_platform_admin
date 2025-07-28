import { Card, CardContent } from "@/components/ui/card";
import { ChartPie, type LucideIcon } from "lucide-react";

export const StatCard = ({
  value,
  label,
  description,
  icon: Icon = ChartPie,
}: {
  value: string | number;
  label: string;
  description: string;
  icon?: LucideIcon;
}) => {
  return (
    <Card className="rounded-xl relative text-center stat-color">
      <CardContent>
        <div className="text-3xl font-bold text-golden">{value}</div>
        <div className="text-sm text-white/70">{label}</div>
        <div className="text-xs text-white/40 mt-1">{description}</div>
        {Icon && (
          <Icon
            className="absolute -right-6 top-8 "
            color="#8f8f91"
            size={60}
          />
        )}
      </CardContent>
    </Card>
  );
};
