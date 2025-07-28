import { useMemo } from "react";
import type { USDAUTransactions } from "@/types/usdau-request.types";
import { TrendingUp, TrendingDown, TimerReset, RefreshCcw } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Stat = {
  title: string;
  value: number;
  percentageChange: string;
  description: string;
  bars: number[];
  icon?: LucideIcon;
  color: "blue" | "green" | "red" | "orange" | "yellow" | "purple";
};

export default function useUsdauStats(data: USDAUTransactions[] = []): Stat[] {
  return useMemo(() => {
    if (!data.length) return [];

    const approved = data.filter((d) => d.requestStatus === "Approved");
    const declined = data.filter((d) => d.requestStatus === "Declined");
    const pending = data.filter((d) => d.requestStatus === "Pending");

    const getBars = (list: USDAUTransactions[]) =>
      Array.from({ length: 7 }, (_, i) =>
        list.filter((r) => {
          const date = new Date(r.dateRequest);
          const today = new Date();
          const daysAgo = new Date(today);
          daysAgo.setDate(today.getDate() - (6 - i));
          return (
            date.toDateString() === daysAgo.toDateString()
          );
        }).length
      );

    const total = data.length;
    const percent = (count: number) =>
      total === 0 ? "0%" : `${Math.round((count / total) * 100)}%`;

    const stats: Stat[] = [
      {
        title: "Approved Requests",
        value: approved.length,
        percentageChange: `+${percent(approved.length)}`,
        description: "of total requests",
        bars: getBars(approved),
        icon: TrendingUp,
        color: "green",
      },
      {
        title: "Declined Requests",
        value: declined.length,
        percentageChange: `-${percent(declined.length)}`,
        description: "were declined",
        bars: getBars(declined),
        icon: TrendingDown,
        color: "red",
      },
      {
        title: "Pending Requests",
        value: pending.length,
        percentageChange: `${percent(pending.length)}`,
        description: "awaiting approval",
        bars: getBars(pending),
        icon: TimerReset,
        color: "yellow",
      },
      {
        title: "Total Requests",
        value: total,
        percentageChange: "+100%",
        description: "All USDAU requests",
        bars: getBars(data),
        icon: RefreshCcw,
        color: "blue",
      },
    ];

    return stats;
  }, [data]);
}
