import type { RankPromotionRequest } from "@/types/promotion-request.types";

type StatColor = "blue" | "green" | "red" | "orange" | "yellow" | "purple";

export const useRankPromotionStats = (data: RankPromotionRequest[] = []) => {
  const total = data.length;
  const pending = data.filter((d) => d.requestStatus === "pending").length;
  const approved = data.filter((d) => d.requestStatus === "approved").length;
  const declined = data.filter((d) => d.requestStatus === "declined").length;

  const calculateBarHeights = (count: number): number[] => {
    return Array.from({ length: 12 }, () =>
      Math.floor(Math.random() * (count || 1))
    );
  };

  const getPercentageChange = (current: number, previous: number): string => {
    if (previous === 0) return "+100%";
    const diff = ((current - previous) / previous) * 100;
    const symbol = diff >= 0 ? "+" : "-";
    return `${symbol}${Math.abs(diff).toFixed(2)}%`;
  };

  const previousTotal = Math.floor(total * 0.8);
  const previousApproved = Math.floor(approved * 0.7);
  const previousPending = Math.floor(pending * 0.9);

  return {
    totalStats: {
      title: "Total Requests",
      value: total,
      percentageChange: getPercentageChange(total, previousTotal),
      description: "This Month",
      bars: calculateBarHeights(total),
      color: "blue" as StatColor,
    },
    approvedStats: {
      title: "Approved Requests",
      value: approved,
      percentageChange: getPercentageChange(approved, previousApproved),
      description: "Approved Growth",
      bars: calculateBarHeights(approved),
      color: "green" as StatColor,
    },
    pendingStats: {
      title: "Pending Requests",
      value: pending,
      percentageChange: getPercentageChange(pending, previousPending),
      description: "Still In Review",
      bars: calculateBarHeights(pending),
      color: "orange" as StatColor,
    },
    declinedStats: {
      title: "Declined Requests",
      value: declined,
      percentageChange: "-0.00%",
      description: "No changes",
      bars: calculateBarHeights(declined),
      color: "red" as StatColor,
    },
  };
};
